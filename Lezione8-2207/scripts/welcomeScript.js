$(document).ready(function () {
    initPage();
});

function initPage() {
    let nome = getCookie("ckNome");
    let cognome = getCookie("ckCognome");

    if (nome && cognome) {
        $("#divWelcome").html("Benvenuto " + nome + " " + cognome);
    } else {
        $("#divWelcome").html("Benvenuto! Non abbiamo trovato i tuoi dati.");
    }
}

function getCookie(nomeCookie) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === nomeCookie) {
            return decodeURIComponent(value);
        }
    }
    return null; // Return null if the cookie is not found
}
