function openPokedex() {
    window.location.href = "pokedex.html";
}

function goBack() {
    window.location.href = "index.html";
}

function openLoginForm() {
    document.getElementById("login-popup").classList.add("active");
}

function closeLoginForm(event) {
    // Ferme seulement si on clique en dehors du formulaire
    if (event.target.id === "login-popup") {
        document.getElementById("login-popup").classList.remove("active");
    }
}

function toggleForm() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    loginForm.classList.toggle("hidden");
    registerForm.classList.toggle("hidden");
}