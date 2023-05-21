const { addAccount } = require("../../services/req");

// Récupérer les références des éléments du formulaire
const form = document.getElementById("addAccount-form");
const titleInput = document.getElementById("title");
const plafondInput = document.getElementById("plafond");
const successMessage = document.getElementById("success-message");

successMessage.style.display = "none";

// Récupérer les données utilisateur depuis le localStorage
const storedUserData = localStorage.getItem("userData");
const userData = JSON.parse(storedUserData);

// Écouter l'événement de soumission du formulaire
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    // Récupérer les valeurs saisies par l'utilisateur
    const title = titleInput.value;
    const plafond = plafondInput.value;

    // Récupérer la valeur de l'option sélectionnée dans le sélecteur

    try {
        const data = {
            title: title,
            plafond: plafond,
            userId: userData._id
        };
        console.log("Données du compte:", data);

        const success = await addAccount(data);

        if (success) {

            // Réinitialiser le formulaire
            titleInput.value = "";
            plafondInput.value = "";

            // Afficher le message de succès
            successMessage.textContent = "Le compte a été ajoutée avec succès.";
            successMessage.style.display = "flex"; // Afficher l'élément
        } else {
            console.error("La requête d'inscription a échoué");
        }
    }
    catch {
        console.error("error signin");
    }
});
