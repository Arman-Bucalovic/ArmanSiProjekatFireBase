
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAD14Y4SV23dB53SXoLVNdBGaBc5Atv6aE",
  authDomain: "blog-4691d.firebaseapp.com",
  projectId: "blog-4691d",
  storageBucket: "blog-4691d.firebasestorage.app",
  messagingSenderId: "626265272572",
  appId: "1:626265272572:web:690007d708d32f9d456779"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("✅ Registrovan korisnik:", userCredential.user.email);
        return true;
    } catch (error) {
        console.error("❌ Greška pri registraciji:", error.message);
        return false;
    }
}


export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ Prijavljen korisnik:", userCredential.user.email);
        return true;
    } catch (error) {
        console.error("❌ Greška pri prijavi:", error.message);
        return false;
    }
}


export async function logoutUser() {
    try {
        await signOut(auth);
        console.log("✅ Korisnik je odjavljen");
    } catch (error) {
        console.error("❌ Greška pri odjavi:", error.message);
    }
}


export function checkAuth(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("🔑 Korisnik je prijavljen:", user.email);
            callback(user);
        } else {
            console.log("🔒 Nema prijavljenog korisnika.");
            callback(null);
        }
    });
}


export async function saveArticle(title, content, author) {
    try {
        await addDoc(collection(db, "blogArticles"), {
            title: title,
            content: content,
            author: author || "Gost",
            date: new Date().toLocaleDateString()
        });
        console.log("✅ Članak dodat sa autorom:", author || "Gost");
        return true;
    } catch (error) {
        console.error("❌ Greška pri dodavanju članka:", error);
        return false;
    }
}


export async function fetchArticles() {
    const querySnapshot = await getDocs(collection(db, "blogArticles"));
    const articles = [];
    querySnapshot.forEach((doc) => {
        articles.push({ id: doc.id, ...doc.data() });
    });
    console.log("📄 Učitani članci:", articles);
    return articles;
}


export async function deleteArticle(articleId) {
    try {
        await deleteDoc(doc(db, "blogArticles", articleId));
        console.log("🗑️ Članak obrisan:", articleId);
    } catch (error) {
        console.error("❌ Greška pri brisanju članka:", error);
    }
}
