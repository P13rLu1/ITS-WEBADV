$(document).ready(function () {
    initPage();
});

function initPage() {
    $("#btnSalva").on("click", function () {
        // salvare i valori dei campi Nome e Cognome in due cookie ckNome e ckCognome
        const giorniScadenzaCookie = 60;
        let nome = $("#Nome").val();
        let cognome = $("#Cognome").val();
        setCookie("ckNome", nome, giorniScadenzaCookie);
        setCookie("ckCognome", cognome, giorniScadenzaCookie);
    });

    $("#btnInfo").on("click", function () {
        // leggere il cookie ckNome e visualizzarlo in un alert
        let valoreNome = getCookie("ckNome");
        let valoreCognome = getCookie("ckCognome");

        alert(valoreNome + " " + valoreCognome);
    });

    $("#btnCancella").on("click", function () {
        // cancellare i cookie ckNome e ckCognome
        deleteCookie("ckNome");
        deleteCookie("ckCognome");
    });
}

function getCookie(nomeCookie) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === nomeCookie) {
            return decodeURIComponent(value);
        }
    }
}

function setCookie(nomeCookie, valoreCookie, giorniScadenza) {
    let scadenza = new Date();
    let adesso = new Date();
    scadenza.setTime(adesso.getTime() + parseInt(giorniScadenza) * (24 * 60 * 60 * 1000));
    document.cookie = nomeCookie + "=" + encodeURIComponent(valoreCookie) + "; expires=" + scadenza.toUTCString();
}

function deleteCookie(nomeCookie) {
    setCookie(nomeCookie, "", -1);
}