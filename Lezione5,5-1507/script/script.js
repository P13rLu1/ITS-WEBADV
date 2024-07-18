$(document).ready(function () {
    initPage();
});

function initPage() {
    $('#searchForm').submit(function (event) {
        event.preventDefault();
        searchGames();
    });

    $('#searchButton').click(function () {
        searchGames();
    });

    // Gestione del click sul link "Gioca Ora"
    $(document).on('click', '.game-details-link', function (event) {
        event.preventDefault();
        let gameId = $(this).data('game-id');
        showGameDetails(gameId);
    });
}

function searchGames() {
    let query = $('#searchInput').val().toLowerCase();
    if (query === '') {
        alert('Inserisci un termine di ricerca');
        return;
    }

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
                            <div class="details">
                                <p>Genere: ${game.genre}</p>
                                <p>Publisher: ${game.publisher}</p>
                                <p>Rilasciato: ${game.release_date}</p>
                            </div>
                            <a href="gameDetails.html" class="game-details-link" data-game-id="${game.id}" target="_blank">Gioca Ora</a>
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
}

function showGameDetails(gameId) {
    // Riporre l'ID del gioco nella session storage per poterlo recuperare nella pagina gameDetails.html
    window.location.href = `gameDetails.html?id=${gameId}`;
}
