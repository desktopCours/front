const { login } = require('../../services/req');

// Récupérer les références des éléments du formulaire
const form = document.getElementById("connexion-form");
const mailInput = document.getElementById("mail");
const passwordInput = document.getElementById("password");
const inscriptionButton = document.getElementById("inscription");
const errorMessage = document.getElementById("error-message");

inscriptionButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "../inscription/inscription.html";
});

// Écouter l'événement de soumission du formulaire
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les valeurs saisies par l'utilisateur
  const mail = mailInput.value;
  const password = passwordInput.value;

  try {
    const data = {
      mail,
      password
    };

    const userData = await login(data);

    if (userData) {
      // Connexion réussie, vous pouvez utiliser les données de l'utilisateur et rediriger vers la page d'accueil
      console.log("Connexion réussie !");
      console.log(userData);
    
      // Stocker les données utilisateur dans le localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
    
      // Rediriger vers la page d'accueil
      window.location.href = "../accueil/accueil.html";
    } else {
      // Afficher un message d'erreur si l'e-mail ou le mot de passe est incorrect
      errorMessage.textContent = "L'e-mail ou le mot de passe est incorrect.";
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
  }

  // Réinitialiser le formulaire
  mailInput.value = "";
  passwordInput.value = "";
});
