const {getAccounts, changeValue} = require("../../services/req");
const container = document.querySelector('.container');

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
        const divTotal = document.createElement('div')
        const accountDiv = document.createElement('div');
        accountDiv.classList.add('account');
        divTotal.classList.add('divAccount')

        const edit = document.createElement('button')
        edit.textContent = 'Edit'
        edit.setAttribute('data-index', i);
        edit.setAttribute('onClick', 'openModal()');
        edit.classList.add('editButton')

        divTotal.appendChild(edit)

        accountDiv.setAttribute( 'onclick',"goToDepenses()")

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
    accountDiv.setAttribute('onclick','goToAddAccount()')
    divTotal.appendChild(accountDiv)
    container.appendChild(divTotal);
}

function goToDepenses() {
    const accountDiv = event.target.closest('.account');
    const titre = accountDiv.querySelector('p:first-of-type').textContent;
    if (titre === '+') {
        window.location.href = '../addACCOUNT/addACCOUNT.html'
    } else {
        sessionStorage.setItem("titre", JSON.stringify(titre))
        window.location.href = '../listeDepenses/listeDepenses.html'
    }
}


function openModal() {
    const modal = document.getElementById("myModal");
    const titre = document.getElementById('inputTitre')
    const plafond = document.getElementById('inputPlafond')
    const index = event.target.getAttribute('data-index');
    indexEdit = index
    titre.value = data[index].title
    plafond.value = data[index].plafond
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function confirmModal() {
    const titre = document.getElementById('inputTitre')
    const plafond = document.getElementById('inputPlafond')
    changeValue(data[indexEdit].title, titre.value, plafond.value)
}

