const { getCategorieUser, updateUser } = require('../../services/req');

const settingForm = document.getElementById("setting-form");
const changePasswordForm = document.getElementById("change-password-form");

// Récupérer les références des éléments du formulaire
const mailInput = document.getElementById("mail");
const passwordInput = document.getElementById("password");
const passwordConfirmeInput = document.getElementById("confirmePassword");
const lastNameInput = document.getElementById("lastName");
const firstNameInput = document.getElementById("firstName");
const paysInput = document.getElementById("pays");
const regionInput = document.getElementById("region");
const cityInput = document.getElementById("city");
const successMessage = document.getElementById("success-message");
const successMdp = document.getElementById("success-mdp");
const errorMessage = document.getElementById("error-message");

successMessage.style.display = "none";
successMdp.style.display = "none";

// Récupérer les données utilisateur depuis le localStorage
const storedUserData = localStorage.getItem("userData");

// Vérifier si les données existent dans le localStorage
if (storedUserData) {
  const userData = JSON.parse(storedUserData);
  console.log(userData)

  // Remplir les champs du formulaire avec les données utilisateur
  mailInput.value = userData.mail;
  lastNameInput.value = userData.lastname;
  firstNameInput.value = userData.firstname;
  paysInput.value = userData.pays;
  regionInput.value = userData.region;
  cityInput.value = userData.city;

  let userCategorie = userData.categorie

  const categoryList = document.querySelector('.category-list');

  // Générer les nouveaux éléments de la liste
  userCategorie.forEach((label, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = label;
    categoryList.appendChild(listItem);
    listItem.addEventListener('click', () => {
      selectCategory(index);
    });
    categoryList.appendChild(listItem);
  });

let selectedLabelIndex = -1;

function selectCategory(index) {
  selectedLabelIndex = index;
  const editCategoryNameInput = document.getElementById("edit-category-input");
  editCategoryNameInput.value = userCategorie[index];
}

function saveEditedCategory() {
  const editCategoryNameInput = document.getElementById("edit-category-input");
  const editedLabel = editCategoryNameInput.value;

  if (selectedLabelIndex !== -1) {
    userCategorie[selectedLabelIndex] = editedLabel;
    updateCategoryList();
    // Réinitialiser la sélection
    selectedLabelIndex = -1;
    editCategoryNameInput.value = "";
  }
}

function deleteCategory() {
  if (selectedLabelIndex !== -1) {
    userCategorie.splice(selectedLabelIndex, 1);
    updateCategoryList();
    // Réinitialiser la sélection
    selectedLabelIndex = -1;
    const editCategoryNameInput = document.getElementById("edit-category-name");
    editCategoryNameInput.value = "";
  }
}

function addCategory() {
  const newCategoryNameInput = document.getElementById("new-category-name");
  const newLabel = newCategoryNameInput.value;

  if (newLabel.trim() !== "") {
    userCategorie.push(newLabel);
    updateCategoryList();
    newCategoryNameInput.value = "";
  }
}

async function updateCategoryList() {
  const categoryList = document.querySelector('.category-list');
  categoryList.innerHTML = ""; // Effacer la liste existante
  console.log("ici")

  userCategorie.forEach((label, index) => {
    const listItem = document.createElement("div");
    listItem.classList.add("category-item");
    listItem.textContent = label;
    listItem.addEventListener('click', () => {
      selectCategory(index);
    });
    categoryList.appendChild(listItem);
  });

  try {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      userData.categorie = userCategorie;
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log(userData)


      await updateUser(userData.categorie); // Mettre à jour en base de données
    }
    // Afficher le message de succès
    // successMessage.textContent = "Vous informations personnelles ont été modifié";
    // successMessage.style.display = "flex";
    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
  }
}


}



settingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("helmlo");
  const mail = mailInput.value;
  const lastName = lastNameInput.value;
  const firstName = firstNameInput.value;
  const pays = paysInput.value;
  const region = regionInput.value;
  const city = cityInput.value;

  try {
    const data = {
      firstname: firstName,
      lastname: lastName,
      mail: mail,
      city: city,
      pays: pays,
      region: region
    };

    const result = await updateUser(data);

    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      userData.firstname = firstName;
      userData.lastname = lastName;
      userData.mail = mail;
      userData.city = city;
      userData.pays = pays;
      userData.region = region;
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    // Afficher le message de succès
    successMessage.textContent = "Vous informations personnelles ont été modifié";
    successMessage.style.display = "flex"; // Afficher l'élément
    console.log("User updated successfully");
  }
  catch {
    console.error("error updateUser");
  }
});

changePasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const password = passwordInput.value;
  const passwordConfirme = passwordConfirmeInput.value;

  if (password !== passwordConfirme) {
    errorMessage.textContent = "Les mots de passe ne correspondent pas";
    return;
  }

  try {
    const data = {
      password
    };

    const result = await updateUser(data);

    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      userData.password = password;
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    // Afficher le message de succès
    successMdp.textContent = "Votre mot de passe a été modifié";
    successMdp.style.display = "flex"; // Afficher l'élément
    console.log("User updated successfully");
  }
  catch {
    console.error("error updateUser");
  }
});