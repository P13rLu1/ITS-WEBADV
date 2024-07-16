$(document).ready(function () {
    initPage();
});

function initPage() {
    let superHeroes;

    let requestURL = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        superHeroes = request.response;
        //console.log(superHeroes);

        let schedaTeam = "Nome Squadra: " + superHeroes.squadName;
        schedaTeam += "<br />Cittá di azione: " + superHeroes.homeTown;
        schedaTeam += "<br />Numero supereroi: " + superHeroes.members.length;
        schedaTeam += "<br />Anno Formazione: " + superHeroes.formed;

        let schedaSupereroi = "";
        for (let i = 0; i < superHeroes.members.length; i++) {
            let objSupereroe = superHeroes.members[i];
            schedaSupereroi += "<br />Nome Supereroe: " + objSupereroe.name;
        }

        document.getElementById("divHTML").innerHTML = schedaTeam + "<br /><b>SUPEREROI PRESENTI</b>" + schedaSupereroi;
    }
}