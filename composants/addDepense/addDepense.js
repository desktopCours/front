const { addDepense, getAccounts } = require("../../services/req");

// Récupérer les références des éléments du formulaire
const form = document.getElementById("addDepense-form");
const titreInput = document.getElementById("titre");
const categorieInput = document.getElementById("categorie");
const montantInput = document.getElementById("montant");
const dateInput = document.getElementById("date");
const successMessage = document.getElementById("success-message");

successMessage.style.display = "none";

// Récupérer les données utilisateur depuis le localStorage
const storedUserData = localStorage.getItem("userData");
const userData = JSON.parse(storedUserData);

goToAddDepense();

async function goToAddDepense() {
    try {
        const accounts = await getAccounts(userData._id);

        console.log('Comptes récupérés:', accounts); // Vérifier si les comptes sont correctement récupérés

        const accountInput = document.getElementById('account');
        accountInput.innerHTML = '';

        accounts.forEach((account) => {
            console.log('Compte:', account); // Vérifier les détails de chaque compte

            const option = document.createElement('option');
            option.value = account._id;
            option.text = account.title;
            accountInput.appendChild(option);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des comptes :', error);
    }
}

// Écouter l'événement de soumission du formulaire
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    // Récupérer les valeurs saisies par l'utilisateur
    const titre = titreInput.value;
    const categorie = categorieInput.value;
    const date = dateInput.value;
    const montant = montantInput.value;

    try {
        const data = {
            titre: titre,
            categorie: categorie,
            montant: montant,
            date: date,
            userId: userData._id
        };
        console.log("Données de la dépense:", data);

        const success = await addDepense(data);
        console.log("ici")
        if (success) {
            console.log("reussi")

            // Réinitialiser le formulaire
            titreInput.value = "";
            categorieInput.value = "";
            montantInput.value = "";
            dateInput.value = "";

            // Afficher le message de succès
            successMessage.textContent = "La dépense a été ajoutée avec succès.";
            successMessage.style.display = "block"; // Afficher l'élément
        } else {
            console.error("La requête d'inscription a échoué");
        }
    }
    catch {
        console.error("error signin");
    }
});
