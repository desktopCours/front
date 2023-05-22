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

async function addAccount(data) {
    try {
        const response = await fetch('http://localhost:3000/account/add', {
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

async function supprimerCompte(idCompte) {
    try {
        const response = await fetch(`http://localhost:3000/account/delete/${idCompte}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        });

        if (response.ok) {

          window.location.reload()
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
        let idCompte = sessionStorage.getItem('idCompte')
        if (idCompte) {
            idCompte = JSON.parse(idCompte);
            const response = await fetch(`http://localhost:3000/account/getDepenses/${idCompte}`, {
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

async function changeValue(idAccount, title, plafond) {
    try {
        const storedUserData = localStorage.getItem("userData");

        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            const response = await fetch(`http://localhost:3000/account/update/${data._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idAccount: idAccount,
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

async function changeValueAccount(total, idAccount) {
    try {

        const response = await fetch(`http://localhost:3000/account/updateCourant`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idAccount: idAccount,
                total: total
            })
        });

        if (response.ok) {
            window.location.reload()
        } else {
            const errorData = await response.json();
            console.error(errorData.message);

        }
    } catch
        (error) {
        console.error(error);
    }
}


async function getCategorieUser() {
    try {
        const storedUserData = localStorage.getItem("userData");

        if (storedUserData) {
            const data = JSON.parse(storedUserData);
            const response = await fetch(`http://localhost:3000/user/categorie/${data._id}`, {
                method: 'GET'
            });

            if (response.ok) {
                return response.json();
            } else {
                const errorData = await response.json();
                console.error(errorData.message);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function updateUser(data) {
    try {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            const dataId = JSON.parse(storedUserData);
            console.log(data);
            const response = await fetch(`http://localhost:3000/user/userUpdate/${dataId._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lastname: data.lastname,
                    firstname: data.firstname,
                    mail: data.mail,
                    city: data.city,
                    region: data.region,
                    pays: data.pays,
                    password: data.password,
                    categorie: data.categorie
                })
            });

            if (response.ok) {
                return await response.json();
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

async function deleteDepenseRow(idDepense) {
    try {
        let idCompte = sessionStorage.getItem("idCompte");
        if (idCompte) {

            idCompte = JSON.parse(idCompte);
            const response = await fetch(`http://localhost:3000/account/deleteDepense`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idDepense: idDepense,
                    idAccount: idCompte
                })
            });

            if (response.ok) {
                await response.json()
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

module.exports = {
    signin,
    login,
    getDepenses,
    getDepensesBySearch,
    changeValueAccount,
    deleteDepenseRow,
    getAccounts,
    addDepense,
    changeValue,
    getCategorieUser,
    updateUser,
    addAccount,
    supprimerCompte
};

