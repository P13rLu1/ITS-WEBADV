$(document).ready(function () {
    visualizzaPiattiSalvati();
    aggiornaConteggioSalvati();
});

function visualizzaPiattiSalvati() {
    let piattiSalvati = getPiattiSalvati();
    let listaSalvati = $('#savedList');
    listaSalvati.empty();

    if (Object.keys(piattiSalvati).length === 0) {
        listaSalvati.html('<p>Nessun piatto salvato.</p>');
        return;
    }

    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

    for (let piattoId in piattiSalvati) {
        fetch(apiUrl + piattoId)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    let piatto = data.meals[0];
                    let elementoPiatto = `
                        <div class="saved-item">
                            <img src="${piatto.strMealThumb}" alt="${piatto.strMeal}">
                            <h2>${piatto.strMeal}</h2>
                            <p>${piatto.strInstructions}</p>
                            <button onclick="rimuoviPiattoSalvato(${piattoId})">Rimuovi</button>
                            <button class="youtube-button" onclick="vaiAlVideo('${piatto.strYoutube}')">Guarda Video</button>
                        </div>
                    `;
                    listaSalvati.append(elementoPiatto);
                }
            })
            .catch(error => {
                console.error('Caricamento dei piatti salvati fallito:', error);
            });
    }
}

function vaiAlVideo(url) {
    window.open(url, '_blank');
}

function getPiattiSalvati() {
    let piattiSalvati = document.cookie.split('; ').find(row => row.startsWith('piattiSalvati='));
    if (piattiSalvati) {
        return JSON.parse(decodeURIComponent(piattiSalvati.split('=')[1]));
    }
    return {};
}

function setPiattiSalvati(piattiSalvati) {
    let expires = new Date();
    expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 giorni
    document.cookie = 'piattiSalvati=' + encodeURIComponent(JSON.stringify(piattiSalvati)) + '; expires=' + expires.toUTCString() + '; path=/';
}

function rimuoviPiattoSalvato(piattoId) {
    let piattiSalvati = getPiattiSalvati();
    if (piattiSalvati[piattoId]) {
        delete piattiSalvati[piattoId];
        if (Object.keys(piattiSalvati).length === 0) {
            deleteCookie('piattiSalvati');
        } else {
            setPiattiSalvati(piattiSalvati);
        }
        visualizzaPiattiSalvati();
        aggiornaConteggioSalvati();
    }
}

function deleteCookie(nomeCookie) {
    let expires = new Date();
    expires.setTime(expires.getTime() - 1); // Imposta la data di scadenza a una data passata
    document.cookie = nomeCookie + '=; expires=' + expires.toUTCString() + '; path=/';
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