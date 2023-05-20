// Récupérer les références des éléments du formulaire
const form = document.getElementById("inscription-form");
const mailInput = document.getElementById("mail");
const passwordInput = document.getElementById("password");
const lastNameInput = document.getElementById("lastName");
const firstNameInput = document.getElementById("firstName");
const paysInput = document.getElementById("pays");
const regionInput = document.getElementById("region");
const cityInput = document.getElementById("city");

// Récupérer les données utilisateur depuis le localStorage
const storedUserData = localStorage.getItem("userData");

// Vérifier si les données existent dans le localStorage
if (storedUserData) {
  const userData = JSON.parse(storedUserData);

  // Remplir les champs du formulaire avec les données utilisateur
  mailInput.value = userData.mail;
  lastNameInput.value = userData.lastname;
  firstNameInput.value = userData.firstname;
  paysInput.value = userData.pays;
  regionInput.value = userData.region;
  cityInput.value = userData.city;
  passwordInput.value = userData.password;
}

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