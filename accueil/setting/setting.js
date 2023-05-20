// Récupérer les références des éléments du formulaire
const form = document.getElementById("inscription-form");
const mailInput = document.getElementById("mail");
const passwordInput = document.getElementById("password");
const lastNameInput = document.getElementById("lastName");
const firstNameInput = document.getElementById("firstName");
const paysInput = document.getElementById("pays");
const regionInput = document.getElementById("region");
const cityInput = document.getElementById("city");
const connexionButton = document.getElementById("connexion");

// Écouter l'événement de soumission du formulaire
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    // Récupérer les valeurs saisies par l'utilisateur
    const mail = mailInput.value;
    const password = passwordInput.value;
    const passwordConfirme = passwordConfirmeInput.value;
    const lastName = lastNameInput.value;
    const firstName = firstNameInput.value;
    const pays = paysInput.value;
    const region = regionInput.value;
    const city = cityInput.value;
  
    if (password !== passwordConfirme) {
      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent = "Les mots de passe ne correspondent pas";
      return;
    }
    try {
  
      const data = {
        firstname: firstName,
        lastname: lastName,
        password: password,
        mail: mail,
        city: city,
        pays: pays,
        region: region
      };
  
      const success = await signin(data);
  
      if (success) {
        // Réinitialiser le formulaire
        mailInput.value = "";
        passwordInput.value = "";
        passwordConfirmeInput.value = "";
        firstNameInput.value = "";
        lastNameInput.value = "";
        paysInput.value = "";
        regionInput.value = "";
        cityInput.value = "";
  
        // Rediriger vers la page de connexion
        window.location.href = "../connexion/connexion.html";
      } else {
        console.error("La requête d'inscription a échoué");
      }
    }
    catch {
      console.error("error signin");
    }
  });