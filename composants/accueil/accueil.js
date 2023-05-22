const {getAccounts, changeValue, changeValueAccount, supprimerCompte} = require("../../services/req");
const container = document.querySelector('.container');
const mainContainer = document.querySelector('.wrapAll')
const divCompteSolo = document.createElement('div')

fetchData();
let data;
let indexEdit;

async function fetchData() {
    try {
        data = await getAccounts();

        showAccounts(data)

    } catch (e) {
        throw e
    }
}

function showAccounts() {

    for (let i = 0; i < data.length; i++) {
        if (data[i].title !== 'Compte courant') {
            const divTotal = document.createElement('div')
            const accountDiv = document.createElement('div');
            accountDiv.classList.add('account');
            divTotal.classList.add('divAccount')
            accountDiv.setAttribute('data-index', i);


            const edit = document.createElement('button')
            edit.textContent = 'Edit'
            edit.setAttribute('data-index', i);
            edit.setAttribute('onClick', 'openModal()');
            edit.classList.add('editButton')

            divTotal.appendChild(edit)

            accountDiv.setAttribute('onclick', "goToDepenses()")

            const titre = document.createElement('p')
            const spent = document.createElement('p')
            const plafond = document.createElement('p')
            const divider = document.createElement('hr')
            titre.textContent = data[i].title
            spent.textContent = data[i].total + ' €'
            plafond.textContent = data[i].plafond + ' €'

            spent.classList.add('description')
            plafond.classList.add('description')
            divider.classList.add('dividerAccount')

            if (data[i].total > data[i].plafond) {
                accountDiv.classList.add('tooMuch')
            }

            accountDiv.appendChild(titre)
            accountDiv.appendChild(spent)
            accountDiv.appendChild(divider)
            accountDiv.appendChild(plafond)

            divTotal.appendChild(accountDiv)
            container.appendChild(divTotal);
        } else {
            const divCourant = document.createElement('div')
            const divCompte = document.createElement('div')

            divCourant.classList.add('blocCompteDescri')
            divCompteSolo.classList.add('account')

            const description = document.createElement('p')
            description.textContent = 'Votre compte courant :'
            description.classList.add('descriptionCompte')

            divCompte.classList.add('divAccount', 'divCompteCourant')
            const edit = document.createElement('button')
            edit.textContent = 'Edit'
            edit.setAttribute('data-index', i);
            edit.setAttribute('onClick', 'openModalCourant()');
            edit.classList.add('editButton')

            divCompte.appendChild(edit)
            const titre = document.createElement('p')
            const spent = document.createElement('p')

            titre.textContent = data[i].title + ' :'
            spent.textContent = data[i].total + ' €'

            divCompteSolo.appendChild(titre)
            divCompteSolo.appendChild(spent)
            divCompte.appendChild(divCompteSolo)

            divCourant.appendChild(description)
            divCourant.appendChild(divCompte)
            mainContainer.appendChild(divCourant)

        }
    }
    const divTotal = document.createElement('div')
    const accountDiv = document.createElement('div');
    accountDiv.classList.add('account');
    divTotal.classList.add('divAccount')

    const whiteSpace = document.createElement('p')
    divTotal.appendChild(whiteSpace)

    const add = document.createElement('p')
    add.textContent = '+'
    accountDiv.classList.add('addAccount')
    accountDiv.appendChild(add)
    accountDiv.setAttribute('onclick', 'goToAddAccount()')
    divTotal.appendChild(accountDiv)
    container.appendChild(divTotal);

    const separate = document.createElement('hr')
    separate.classList.add('separator')

    const firstDivCompteSolo = document.querySelector('.blocCompteDescri')

    mainContainer.insertBefore(separate, firstDivCompteSolo)


}


function goToDepenses() {
    const accountDiv = event.target.closest('.account');
    const index = accountDiv.getAttribute('data-index');
    console.log(data)
    console.log(index)
    const titre = accountDiv.querySelector('p:first-of-type').textContent;
    if (titre === '+') {
        window.location.href = '../addACCOUNT/addACCOUNT.html'
    } else {
        sessionStorage.setItem("idCompte", JSON.stringify(data[index]._id))
        window.location.href = '../listeDepenses/listeDepenses.html'
    }
}

function goToAddAccount() {
    window.location.href = '../addAccount/addAccount.html'
}

function openModal() {
    const modal = document.getElementById("myModal");
    const titre = document.getElementById('inputTitre')
    const plafond = document.getElementById('inputPlafond')
    const index = event.target.getAttribute('data-index');
    const deleteButton = document.getElementById('supprimerCompte')
    deleteButton.removeAttribute('hidden')
    indexEdit = index
    titre.value = data[index].title
    plafond.value = data[index].plafond
    modal.style.display = "block";
}

function openModalCourant() {
    const modal = document.getElementById("myModal");
    const titre = document.getElementById('inputTitre')
    const plafond = document.getElementById('inputPlafond')
    const total = document.getElementById('inputDef')
    const validerButton = document.getElementById('validerModal')
    const deleteButton = document.getElementById('supprimerCompte')
    deleteButton.setAttribute('hidden',true)
    validerButton.setAttribute('onclick','confifrmModalAccount()')
    total.textContent = 'total'
    titre.setAttribute('disabled',true)
    const index = event.target.getAttribute('data-index');
    indexEdit = index
    titre.value = data[index].title
    plafond.value = data[index].total
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function confirmModal() {
    const titre = document.getElementById('inputTitre')
    const plafond = document.getElementById('inputPlafond')
    console.log(data[indexEdit]._id)
    changeValue(data[indexEdit]._id, titre.value, plafond.value)
}

function confifrmModalAccount() {
    const idCompte = data[indexEdit]._id
    const total = document.getElementById('inputPlafond')

    changeValueAccount(total.value, idCompte)
}

function supprimerAccount(){
    const idCompte = data[indexEdit]._id

    supprimerCompte(idCompte)
}