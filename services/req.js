async function signin(data) {
    try {
    const response = await fetch('http://localhost:3000/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const responseData = await response.json();
    return true;  // Renvoyer true en cas de succès
    } else {
      const errorData = await response.json();
      return false;  // Renvoyer true en cas de succès
    }
  } catch (error) {
    console.error(error);
  }
}

async function login(data) {
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const responseData = await response.json();
        return responseData; // Retourner les données de l'utilisateur connecté
      } else {
        return null; // Retourner null en cas d'échec de la connexion
      }
    } catch (error) {
      console.error(error);
      return null; // Retourner null en cas d'erreur
    }
  }

  async function addDepense(data) {
    try {
      const response = await fetch('http://localhost:3000/account/addDepenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const responseData = await response.json();
        return responseData; 
      } else {
        return null; 
      }
    } catch (error) {
      console.error(error);
      return null; 
    }
  }

  async function getAccounts(userId) {
    try {
      // Effectuer la requête pour récupérer les comptes de l'utilisateur
      const url = `http://localhost:3000/account/getAccountUser/${userId}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("-->", data)
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des comptes :', error);
      return [];
    }
  }
  
  
  

module.exports = { login, signin, addDepense, getAccounts};
