const API_BASE_URL = "http://localhost:3000/api/auth";

async function register(event) {
    event.preventDefault();

    const username = document.querySelector("#register-form input[type='text']").value;
    const email = document.querySelector("#register-form input[type='email']").value;
    const password = document.querySelector("#register-form input[type='password']").value;

    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        toggleForm();
    } else {
        const error = await response.json();
        alert(`Erreur : ${error.message || "Inscription échouée"}`);
    }
}

async function login(event) {
    event.preventDefault();

    const username = document.querySelector("#login-form input[type='text']").value;
    const password = document.querySelector("#login-form input[type='password']").value;

    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Connexion réussie !");
        closeLoginForm({ target: { id: "login-popup" } });
    } else {
        const error = await response.json();
        alert(`Erreur : ${error.message || "Connexion échouée"}`);
    }
}

function checkAuth() {
    const token = localStorage.getItem("token");
    if (token) {
        document.querySelector(".login-button").textContent = "Déconnexion";
        document.querySelector(".login-button").onclick = logout;
    }
}

function logout() {
    localStorage.removeItem("token");
    alert("Déconnecté !");
    document.querySelector(".login-button").textContent = "Connexion";
    document.querySelector(".login-button").onclick = openLoginForm;
}

document.addEventListener("DOMContentLoaded", checkAuth);