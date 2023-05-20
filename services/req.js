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

async function getDepenses() {
    try {
        const storedUserData = localStorage.getItem("userData");
        let titre = sessionStorage.getItem('titre')
        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            titre = JSON.parse(titre);
            console.log(titre)
            const response = await fetch(`http://localhost:3000/account/getDepenses/${data._id}?titre=${titre}`, {
                method: 'GET'
            });

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


            if (response.ok) {
                return await response.json();
            } else {
                const errorData = await response.json();
                console.error(errorData.message);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function getDepensesBySearch(searchContent) {
    try {
        const storedUserData = localStorage.getItem("userData");

        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            const response = await fetch(`http://localhost:3000/account/getDepensesBy/${data._id}?name=${searchContent}`, {
                method: 'GET'
            });

            if (response.ok) {
                return await response.json();
            } else {
                const errorData = await response.json();
                console.error(errorData.message);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function getAccounts() {
    try {
        const storedUserData = localStorage.getItem("userData");

        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            const response = await fetch(`http://localhost:3000/account/getAccountUser/${data._id}`, {
                method: 'GET'
            });

            if (response.ok) {
                return await response.json();
            } else {
                const errorData = await response.json();
                console.error(errorData.message);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function changeValue(ancienTitre, title, plafond) {
    try {
        const storedUserData = localStorage.getItem("userData");
console.log(ancienTitre)
console.log(title)
console.log(plafond)
        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            const response = await fetch(`http://localhost:3000/account/update/${data._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ancien: ancienTitre,
                    title: title,
                    plafond: plafond
                })
            });

            if (response.ok) {
                window.location.reload()
            } else {
                const errorData = await response.json();
                console.error(errorData.message);
            }
        }
    } catch
        (error) {
        console.error(error);
    }
}

module.exports = {signin, login, getDepenses, getDepensesBySearch, getAccounts, addDepense, changeValue};

