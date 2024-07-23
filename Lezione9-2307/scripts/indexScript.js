$(document).ready(function () {
    caricaProdotti();
    aggiornaConteggioCarrello(); // Aggiorna il conteggio del carrello all'avvio
});

function caricaProdotti() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // URL del proxy
    const apiUrl = 'https://fakestoreapi.com/products'; // URL dell'API Fake Store

    // Effettua una richiesta per ottenere i prodotti tramite il proxy
    fetch(proxyUrl + apiUrl)
        .then(response => response.json()) // Converte la risposta in JSON
        .then(data => {
            visualizzaProdotti(data); // Visualizza i prodotti ottenuti
        })
        .catch(error => {
            console.error('Caricamento dei prodotti fallito:', error); // Log in caso di errore
        });
}

function visualizzaProdotti(prodotti) {
    let listaProdotti = document.getElementById("productList");
    listaProdotti.innerHTML = ''; // Pulisce il contenuto precedente

    prodotti.forEach(prodotto => {
        let elementoProdotto = `
            <div class="product-item">
                <img src="${prodotto.image}" alt="${prodotto.title}">
                <h2>${prodotto.title}</h2>
                <p>${prodotto.description}</p>
                <p>Prezzo: €${prodotto.price}</p>
                <button onclick="aggiungiAlCarrello(${prodotto.id})">Aggiungi al Carrello</button>
            </div>
        `;
        listaProdotti.innerHTML += elementoProdotto;
    });
}

function aggiungiAlCarrello(prodottoId) {
    let carrello = getCookie("carrello");
    carrello = carrello ? JSON.parse(carrello) : {};

    if (carrello[prodottoId]) {
        carrello[prodottoId] += 1;
    } else {
        carrello[prodottoId] = 1;
    }

    setCookie("carrello", JSON.stringify(carrello), 7);
    aggiornaConteggioCarrello(); // Aggiorna il conteggio del carrello
}

function aggiornaConteggioCarrello() {
    let carrello = getCookie("carrello");
    carrello = carrello ? JSON.parse(carrello) : {};
    let conteggio = 0;

    for (let prodottoId in carrello) {
        conteggio += carrello[prodottoId];
    }

    document.getElementById("cartCount").innerText = conteggio;
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

function vaiAlCarrello() {
    window.location.href = "carrello.html";
}
