const login = require('./req.js');

// Récupérer les références des éléments du formulaire
const form = document.getElementById("connexion-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");
const errorMessage = document.getElementById("error-message");

// Écouter l'événement de soumission du formulaire
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les valeurs saisies par l'utilisateur
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const data = {
      email,
      password
    };

    const userData = await login(data);

    if (userData) {
      // Connexion réussie, vous pouvez utiliser les données de l'utilisateur et rediriger vers la page d'accueil
      console.log("Connexion réussie !");
      console.log(userData);

      // Rediriger vers la page d'accueil
      window.location.href = "accueil.html";
    } else {
      // Afficher un message d'erreur si l'e-mail ou le mot de passe est incorrect
      errorMessage.textContent = "L'e-mail ou le mot de passe est incorrect.";
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
  }

  // Réinitialiser le formulaire
  emailInput.value = "";
  passwordInput.value = "";
});
