$(document).ready(function () {
    loadFavourites();
    $('body').append('<a href="index.html">Torna alla Home</a>');
});

function loadFavourites() {
    const favourites = JSON.parse(getCookie('favourites') || '{"visited":[], "wishlist":[]}');
    const visited = favourites.visited || [];
    const wishlist = favourites.wishlist || [];

    const favouritesContent = $('#favouritesContent');
    favouritesContent.empty();

    if (visited.length > 0) {
        favouritesContent.append('<h2>Posti Dove Sono Stato</h2>');
        visited.forEach(country => {
            favouritesContent.append(`<div class="country-item">
                <h3>${country}</h3>
                <button onclick="removeVisited('${country}')">Rimuovi</button>
            </div>`);
        });
    } else {
        favouritesContent.append('<h2>Ancora non ci sono posti dove sono stato 😢.</h2>');
    }

    if (wishlist.length > 0) {
        favouritesContent.append('<h2>Posti Dove Voglio Andare</h2>');
        wishlist.forEach(country => {
            favouritesContent.append(`<div class="country-item">
                <h3>${country}</h3>
                <button onclick="removeWishlist('${country}')">Rimuovi</button>
            </div>`);
        });
    } else {
        favouritesContent.append('<h2>Ancora non ci sono posti dove voglio andare 😢.</h2>');
    }
}

function removeVisited(country) {
    let favourites = JSON.parse(getCookie('favourites') || '{"visited":[], "wishlist":[]}');
    favourites.visited = favourites.visited.filter(c => c !== country);
    setCookie('favourites', JSON.stringify(favourites), 7);
    loadFavourites();
}

function removeWishlist(country) {
    let favourites = JSON.parse(getCookie('favourites') || '{"visited":[], "wishlist":[]}');
    favourites.wishlist = favourites.wishlist.filter(c => c !== country);
    setCookie('favourites', JSON.stringify(favourites), 7);
    loadFavourites();
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}