import { saveArticle, fetchArticles, deleteArticle } from "./firebase.js";
import { auth } from "./firebase.js"; 

const blogContainer = document.getElementById("blog-container");


async function displayArticles() {
    console.log("🔄 Fetching articles from Firestore...");
    const articles = await fetchArticles();
    blogContainer.innerHTML = "";

    if (articles.length === 0) {
        blogContainer.innerHTML = "<p class='text-muted text-center'>Nema objavljenih članaka.</p>";
    }

    articles.forEach((article) => {
        const newArticle = createArticleElement(article.id, article.title, article.content, article.date, article.author);
        blogContainer.appendChild(newArticle);
    });
}

function createArticleElement(id, title, content, date, author) {
    const newArticle = document.createElement("div");
    newArticle.className = "blog-article";
    newArticle.innerHTML = `
        <h2>${title}</h2>
        <p class="text-muted">Autor: ${author ? author : "Gost"} | Datum: ${date}</p>
        <p>${content}</p>
        <button class="btn btn-danger delete-btn" data-id="${id}">Obriši</button>
    `;

   
    newArticle.querySelector(".delete-btn").addEventListener("click", async function () {
        console.log("🗑️ Deleting article ID:", id);
        await deleteArticle(id);
        displayArticles();
    });

    return newArticle;
}


document.getElementById("blog-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    
    
    const user = auth.currentUser;
    const author = user ? user.email : "Gost"; 

    console.log("📝 Adding article:", { title, content, author });

    await saveArticle(title, content, author); 
    displayArticles();

    document.getElementById("blog-form").reset();
});


displayArticles();
