$(document).ready(function () {
    caricaPiattoCasuale();
});

function caricaPiattoCasuale() {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                visualizzaPiattoCasuale(data.meals[0]);
            } else {
                alert('Caricamento del piatto casuale fallito.');
            }
        })
        .catch(error => {
            console.error('Caricamento del piatto casuale fallito:', error);
        });
}

function visualizzaPiattoCasuale(piatto) {
    let randomPiattoDiv = $('#randomPiatto');
    randomPiattoDiv.empty();

    let elementoPiatto = `
        <img src="${piatto.strMealThumb}" alt="${piatto.strMeal}">
        <h2>${piatto.strMeal}</h2>
        <p>${piatto.strInstructions}</p>
        <div class="button-container">
            <button class="youtube-button" onclick="vaiAlVideo('${piatto.strYoutube}')">Guarda Video</button>
            <button class="save-button" onclick="salvaPiatto(${piatto.idMeal})">Salva Piatto</button>
        </div>
    `;
    randomPiattoDiv.append(elementoPiatto);
}


function vaiAlVideo(url) {
    window.open(url, '_blank');
}

function salvaPiatto(ricettaId) {
    let piattiSalvati = getCookie("piattiSalvati");
    piattiSalvati = piattiSalvati ? JSON.parse(piattiSalvati) : {};

    if (!piattiSalvati[ricettaId]) {
        piattiSalvati[ricettaId] = 1;
        setCookie("piattiSalvati", JSON.stringify(piattiSalvati), 7);
        alert('Piatto salvato con successo!');
    } else {
        alert('Piatto già salvato.');
    }
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
