$(document).ready(function () {
    aggiornaConteggioSalvati();

    $('#searchInput').on('keypress', function (e) {
        if (e.which === 13) {
            cercaRicette();
        }
    });
});

function cercaRicette() {
    let query = $('#searchInput').val().trim();
    if (query === '') {
        alert('Inserisci un parametro di ricerca.');
        return;
    }

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                visualizzaRicette(data.meals);
            } else {
                alert('Nessuna ricetta trovata.');
            }
        })
        .catch(error => {
            console.error('Caricamento delle ricette fallito:', error);
        });
}

function visualizzaRicette(ricette) {
    let listaRicette = $('#recipeList');
    listaRicette.empty();

    ricette.forEach(ricetta => {
        let elementoRicetta = `
            <div class="recipe-item">
                <img src="${ricetta.strMealThumb}" alt="${ricetta.strMeal}">
                <h2>${ricetta.strMeal}</h2>
                <p>${ricetta.strInstructions}</p>
                <button onclick="salvaPiatto(${ricetta.idMeal})">Salva Piatto</button>
            </div>
        `;
        listaRicette.append(elementoRicetta);
    });
}

function salvaPiatto(ricettaId) {
    let piattiSalvati = getCookie("piattiSalvati");
    piattiSalvati = piattiSalvati ? JSON.parse(piattiSalvati) : {};

    if (!piattiSalvati[ricettaId]) {
        piattiSalvati[ricettaId] = 1;
        setCookie("piattiSalvati", JSON.stringify(piattiSalvati), 7);
        aggiornaConteggioSalvati();
    }
}

function aggiornaConteggioSalvati() {
    let piattiSalvati = getCookie("piattiSalvati");
    piattiSalvati = piattiSalvati ? JSON.parse(piattiSalvati) : {};
    let conteggio = Object.keys(piattiSalvati).length;

    $('#savedCount').text(conteggio);
}

function getCookie(nome) {
    let cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === nome) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

function setCookie(nome, valore, giorni) {
    let expires = '';
    if (giorni) {
        let data = new Date();
        data.setTime(data.getTime() + (giorni * 24 * 60 * 60 * 1000));
        expires = '; expires=' + data.toUTCString();
    }
    document.cookie = nome + '=' + (valore || '') + expires + '; path=/';
}

function vaiAiPiattiSalvati() {
    window.location.href = "piattiSalvati.html";
}