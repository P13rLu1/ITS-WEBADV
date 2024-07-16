$(document).ready(function () {
    initPage();
});

function initPage() {
    $('#searchButton').click(function () {
        let query = $('#searchInput').val().toLowerCase();
        if (query === '') {
            alert('Inserisci un termine di ricerca');
            return;
        }

        // Usa CORS Anywhere per aggirare il problema CORS
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        let requestUrl = 'https://www.freetogame.com/api/games?platform=pc';
        let url = proxyUrl + requestUrl;

        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.send();

        request.onload = function () {
            let games = request.response;
            let filteredGames = games.filter(function (game) {
                return game.title.toLowerCase().includes(query) ||
                    game.short_description.toLowerCase().includes(query);
            });

            $('#results').empty();

            if (filteredGames.length > 0) {
                filteredGames.forEach(function (game) {
                    $('#results').append(`
                        <div class="game">
                            <img src="${game.thumbnail}" alt="${game.title}">
                            <div class="info">
                                <h2>${game.title}</h2>
                                <p>${game.short_description}</p>
                                <a href="${game.game_url}" target="_blank">Gioca Ora</a>
                            </div>
                        </div>
                    `);
                });
            } else {
                $('#results').append('<p>Nessun gioco trovato</p>');
            }
        };

        request.onerror = function () {
            console.error('Errore nella richiesta');
            $('#results').empty().append('<p>Si è verificato un errore. Riprova più tardi.</p>');
        };
    });
}
