$(document).ready(function () {
    visualizzaCarrello();
    aggiornaConteggioCarrello(); // Aggiorna il conteggio del carrello all'avvio
});

function visualizzaCarrello() {
    let carrello = getCarrello();
    let listaCarrello = document.getElementById("cartList");
    listaCarrello.innerHTML = ''; // Pulisce il contenuto precedente

    if (Object.keys(carrello).length === 0) {
        listaCarrello.innerHTML = '<p>Il carrello è vuoto.</p>';
        return;
    }

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://fakestoreapi.com/products';

    fetch(proxyUrl + apiUrl)
        .then(response => response.json()) // Converte la risposta in JSON
        .then(prodotti => {
            let mappaProdotti = {};
            prodotti.forEach(prodotto => {
                mappaProdotti[prodotto.id] = prodotto;
            });

            for (let prodottoId in carrello) {
                let prodotto = mappaProdotti[prodottoId];
                if (prodotto) {
                    let elementoCarrello = `
                        <div class="cart-item">
                            <img src="${prodotto.image}" alt="${prodotto.title}">
                            <h2>${prodotto.title}</h2>
                            <p>${prodotto.description}</p>
                            <p>Prezzo: €${prodotto.price}</p>
                            <p>Quantità: ${carrello[prodottoId]}</p>
                            <button onclick="rimuoviDalCarrello(${prodottoId})">Rimuovi</button>
                        </div>
                    `;
                    listaCarrello.innerHTML += elementoCarrello;
                }
            }
        })
        .catch(error => {
            console.error('Caricamento dei prodotti fallito:', error); // Log in caso di errore
        });
}

function getCarrello() {
    let carrello = document.cookie.split('; ').find(row => row.startsWith('carrello='));
    if (carrello) {
        return JSON.parse(decodeURIComponent(carrello.split('=')[1]));
    }
    return {};
}

function setCarrello(carrello) {
    let expires = new Date();
    expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 giorni
    document.cookie = 'carrello=' + encodeURIComponent(JSON.stringify(carrello)) + '; expires=' + expires.toUTCString() + '; path=/';
}

function rimuoviDalCarrello(prodottoId) {
    let carrello = getCarrello();
    if (carrello[prodottoId]) {
        delete carrello[prodottoId];
        if (Object.keys(carrello).length === 0) {
            // Rimuove il cookie del carrello se è vuoto
            deleteCookie('carrello');
        } else {
            setCarrello(carrello);
        }
        visualizzaCarrello(); // Aggiorna la visualizzazione del carrello
        aggiornaConteggioCarrello(); // Aggiorna il conteggio del carrello
    }
}

function deleteCookie(nomeCookie) {
    let expires = new Date();
    expires.setTime(expires.getTime() - 1); // Imposta la data di scadenza a una data passata
    document.cookie = nomeCookie + '=; expires=' + expires.toUTCString() + '; path=/';
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
