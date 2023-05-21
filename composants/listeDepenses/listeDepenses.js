const {getDepenses, getDepensesBySearch, deleteDepenseRow} = require('../../services/req')
const searchButton = document.getElementById("searchName")
const dd = document.getElementById("valueSearch")

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

async function fetchData() {
    try {
        const data = await getDepenses();

        changeTable(data)

    } catch (e) {
        throw e
    }
}

fetchData();

searchButton.addEventListener('click', function () {
    async function updateTable() {
        const data = await getDepensesBySearch(dd.value)

        changeTable(data)
    }
    updateTable()

})


function changeTable(data) {

    if(data.length > 0) {
        const tableBody = document.getElementById('tBody');

        tableBody.innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            const row = document.createElement('tr');


            const cellTitre = document.createElement('td');
            cellTitre.textContent = data[i].titre;
            row.appendChild(cellTitre);

            const cellCategorie = document.createElement('td');
            cellCategorie.textContent = data[i].categorie;
            row.appendChild(cellCategorie);

            const cellMontant = document.createElement('td');
            cellMontant.textContent = data[i].montant + "€";
            row.appendChild(cellMontant);

            const cellDate = document.createElement('td');
            cellDate.textContent = formatDate(data[i].date);
            row.appendChild(cellDate);

            const cellDate2 = document.createElement('td');
            const button = document.createElement('button');
            button.type = 'button'
            button.classList.add('btn')
            button.classList.add('btn-danger')
            button.setAttribute('data-index',data[i]._id)
            button.setAttribute('onclick','deleteDepense()')
            button.textContent = "Supprimer"
            cellDate2.appendChild(button)
            row.appendChild(cellDate2);

            tableBody.appendChild(row);
        }


    }else{
        const tableBody = document.getElementById('tBody');

        tableBody.innerHTML = '';
    }
}

function sortTable(columnIndex) {
    const table = document.getElementById('tBody');
    const rows = Array.from(table.rows);

    let sortOrder = 1; // 1 pour le tri ascendant, -1 pour le tri descendant

    // Vérifier si la colonne est numérique
    const isNumericColumn = !rows.some((row) =>
        isNaN(Number(row.cells[columnIndex].textContent.trim()))
    );

    // Inverser le sens de tri si la colonne est numérique et déjà triée en ordre ascendant ou descendant
    if (table.lastSortedColumn === columnIndex) {
        if (table.lastSortOrder === 1) {
            sortOrder = -1; // Inverser le sens de tri si précédemment trié en ascendant
        } else {
            sortOrder = 1; // Revenir au tri ascendant si précédemment trié en descendant
        }
    }

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        let comparison = 0;

        if (isNumericColumn) {
            const numA = Number(cellA);
            const numB = Number(cellB);
            comparison = numA - numB;
        } else {
            comparison = cellA.localeCompare(cellB);
        }

        return comparison * sortOrder;
    });

    // Réorganiser les lignes dans l'ordre trié
    rows.forEach((row) => table.appendChild(row));

    // Mettre à jour la colonne triée et l'ordre de tri
    table.lastSortedColumn = columnIndex;
    table.lastSortOrder = sortOrder;
}

function deleteDepense() {
    const id = event.target.getAttribute('data-index')
    deleteDepenseRow(id)
}