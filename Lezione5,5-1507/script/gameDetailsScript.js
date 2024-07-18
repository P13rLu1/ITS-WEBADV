$(document).ready(function () {
    initPage();

    function initPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('id');

        if (!gameId) {
            $('#gameDetails').html('<p>Game ID non trovato.</p>');
            return;
        }

        fetchGameDetails(gameId)
            .then(function (game) {
                renderGameDetails(game);
            })
            .catch(function () {
                $('#gameDetails').html('<p>Errore nel caricamento dei dettagli del gioco.</p>');
            });
    }

    function fetchGameDetails(gameId) {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const requestUrl = 'https://www.freetogame.com/api/game?id=' + gameId;
        const url = proxyUrl + requestUrl;

        return fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Errore nel caricamento dei dettagli del gioco.');
                }
                return response.json();
            });
    }

    function renderGameDetails(game) {
        const gameDetailsHTML = '<div id="gameInfo">' +
            '<h1>' + game.title + '</h1>' +
            '<img src="' + game.thumbnail + '" alt="' + game.title + '">' +
            '<p>' + game.short_description + '</p>' +
            '<p><strong>Description:</strong> ' + game.description + '</p>' +
            '<p><strong>Genre:</strong> ' + game.genre + '</p>' +
            '<p><strong>Publisher:</strong> ' + game.publisher + '</p>' +
            '<p><strong>Developer:</strong> ' + game.developer + '</p>' +
            '<p><strong>Release Date:</strong> ' + game.release_date + '</p>' +
            '<a href="' + game.game_url + '" target="_blank">Gioca Ora</a>' +
            '</div>' +
            '<div id="screenshots">' +
            '<h2>Screenshots</h2>' +
            game.screenshots.map(function (screenshot) {
                return '<img src="' + screenshot.image + '" alt="Screenshot">';
            }).join('') +
            '</div>';

        console.log(game);
        $('#gameDetails').html(gameDetailsHTML);
    }
});
