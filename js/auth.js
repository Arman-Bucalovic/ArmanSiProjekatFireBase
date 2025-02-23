import { registerUser, loginUser, logoutUser } from "./firebase.js";

document.getElementById("register-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const message = document.getElementById("register-message");

    const success = await registerUser(email, password);
    if (success) {
        message.textContent = "✅ Uspešno ste registrovani!";
        message.classList.add("alert", "alert-success");
    } else {
        message.textContent = "❌ Greška pri registraciji!";
        message.classList.add("alert", "alert-danger");
    }
});

document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const message = document.getElementById("login-message");

    const success = await loginUser(email, password);
    if (success) {
        message.textContent = "✅ Uspešno ste prijavljeni!";
        message.classList.add("alert", "alert-success");
    } else {
        message.textContent = "❌ Greška pri prijavi!";
        message.classList.add("alert", "alert-danger");
    }
});

document.getElementById("logout-btn").addEventListener("click", async function () {
    await logoutUser();
    alert("✅ Uspešno ste se odjavili!");
});
