$(document).ready(function () {
    loadRandomCountry();
    $('#search').on('keypress', function (e) {
        if (e.which === 13) {
            searchCountry();
        }
    });
});

function loadRandomCountry() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://restcountries.com/v3.1/all';

    fetch(proxyUrl + apiUrl)
        .then(response => response.json())
        .then(data => {
            const randomCountry = data[Math.floor(Math.random() * data.length)];
            displayCountry(randomCountry);
        })
        .catch(error => console.error('Error loading random country:', error));
}

function displayCountry(country) {
    const mainContent = $('#mainContent');
    mainContent.empty();

    const countryElement = `
        <div id="singleCountry" onclick="showCountryDetails('${country.name.common}')">
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h2>${country.name.common}</h2>
            <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Region: ${country.region}</p>
        </div>
    `;
    mainContent.append(countryElement);
}

function filterRegion(region) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://restcountries.com/v3.1/region/${region}`;

    fetch(proxyUrl + apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCountries(data);
        })
        .catch(error => console.error('Error loading countries by region:', error));
}

function displayCountries(countries) {
    const mainContent = $('#mainContent');
    mainContent.empty();
    countries.forEach(country => {
        const countryElement = `
            <div class="country-item" onclick="showCountryDetails('${country.name.common}')">
                <img src="${country.flags.svg}" alt="${country.name.common}">
                <h2>${country.name.common}</h2>
                <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p>Region: ${country.region}</p>
            </div>
        `;
        mainContent.append(countryElement);
    });
}

function searchCountry() {
    const query = $('#search').val();
    if (!query) return;

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://restcountries.com/v3.1/name/${query}`;

    fetch(proxyUrl + apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 404) {
                $('#mainContent').html('<p>No results found</p>');
            } else {
                displayCountries(data);
            }
        })
        .catch(error => console.error('Error searching for country:', error));
}

function toggleSubregions(region) {
    const subregionList = $(`#${region}Subregions`);
    if (subregionList.is(':empty')) {
        fetchSubregions(region);
    }
    subregionList.slideToggle();
}

function fetchSubregions(region) {
    $.ajax({
        url: `https://restcountries.com/v3.1/region/${region}`,
        method: 'GET',
        success: function (data) {
            const subregions = {};
            data.forEach(country => {
                if (country.subregion) {
                    if (!subregions[country.subregion]) {
                        subregions[country.subregion] = [];
                    }
                    subregions[country.subregion].push(country);
                }
            });
            displaySubregions(region, subregions);
        },
        error: function (error) {
            console.error('Error fetching subregions:', error);
        }
    });
}

function displaySubregions(region, subregions) {
    const subregionList = $(`#${region}Subregions`);
    subregionList.empty();
    for (const [subregion, countries] of Object.entries(subregions)) {
        const subregionItem = $(`<li><a href="#" onclick="filterSubregion('${subregion}')">${subregion}</a></li>`);
        subregionList.append(subregionItem);
    }
}

function filterSubregion(subregion) {
    $.ajax({
        url: `https://restcountries.com/v3.1/subregion/${subregion}`,
        method: 'GET',
        success: function (data) {
            displayCountries(data);
        },
        error: function (error) {
            console.error('Error fetching countries:', error);
        }
    });
}


function showCountryDetails(countryName) {
    window.location.href = `dettagliNazione.html?name=${countryName}`;
}