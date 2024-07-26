$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('name');
    loadCountryDetails(countryName);
});

function loadCountryDetails(name) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://restcountries.com/v3.1/name/${name}`;

    fetch(proxyUrl + apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCountryDetails(data[0]);
        })
        .catch(error => console.error('Error loading country details:', error));
}

function displayCountryDetails(country) {
    const countryDetails = $('#countryDetails');
    countryDetails.empty();

    const countryElement = `
        <div class="country-details">
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h2>${country.name.common}</h2>
            <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Region: ${country.region}</p>
            <p>Subregion: ${country.subregion}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${Object.values(country.languages).join(', ')}</p>
            <p>Currencies: ${Object.values(country.currencies).map(c => c.name).join(', ')}</p>
            <p>Timezones: ${country.timezones.join(', ')}</p>
            <p>Borders: ${country.borders ? country.borders.join(', ') : 'N/A'}</p>
            <button onclick="saveCountry('${country.name.common}', 'visited')">CI SONO STATO</button>
            <button onclick="saveCountry('${country.name.common}', 'wishlist')">CI VORREI ANDARE</button>
            <br><a href="index.html" class="home-link">Torna alla home</a>
        </div>
    `;
    countryDetails.append(countryElement);
}

function saveCountry(countryName, type) {
    let favourites = getCookie('favourites');
    favourites = favourites ? JSON.parse(favourites) : {visited: [], wishlist: []};

    if (type === 'visited' && !favourites.visited.includes(countryName)) {
        favourites.visited.push(countryName);
        alert(`"${countryName}" aggiunto a "Ci sono stato"`);
    } else if (type === 'wishlist' && !favourites.wishlist.includes(countryName)) {
        favourites.wishlist.push(countryName);
        alert(`"${countryName}" aggiunto a "Ci vorrei andare"`);
    }

    setCookie('favourites', JSON.stringify(favourites), 7);
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}