const domande = [
    "Qual è la capitale della Danimarca?",
    "Qual è la capitale della Svezia?",
    "Qual è la capitale della Norvegia?",
    "Qual è la capitale della Finlandia?",
    "Qual è la capitale dell'Islanda?",
    "Qual è la capitale della Groenlandia?",
    "Qual è la capitale Dell'Italia?",
    "Qual è la capitale della Francia?",
    "Qual è la capitale della Spagna?",
    "Qual è la capitale del Portogallo?",
    "Qual è la capitale della Germania?",
    "Qual è la capitale dell'Olanda?",
    "Qual è la capitale del Belgio?",
    "Qual è la capitale della Svizzera?",
    "Qual è la capitale dell'Austria?",
    "Qual è la capitale della Polonia?",
    "Qual è la capitale della Repubblica Ceca?",
    "Qual è la capitale della Slovacchia?",
    "Qual è la capitale dell'Ungheria?",
    "Qual è la capitale della Romania?",
    "Qual è la capitale della Bulgaria?",
    "Qual è la capitale della Grecia?",
    "Qual è la capitale della Turchia?",
    "Qual è la capitale della Russia?",
    "Qual è la capitale dell'Ucraina?",
    "Qual è la capitale della Bielorussia?",
    "Qual è la capitale della Lituania?",
    "Qual è la capitale della Lettonia?",
    "Qual è la capitale dell'Estonia?",
    "Qual è la capitale della Moldavia?",
    "Qual è la capitale della Croazia?",
    "Qual è la capitale della Slovenia?",
    "Qual è la capitale della Bosnia-Erzegovina?",
    "Qual è la capitale del Montenegro?",
    "Qual è la capitale dell'Albania?",
    "Qual è la capitale della Macedonia del Nord?",
    "Qual è la capitale della Serbia"
];
const risposte = [
    ["V|Copenaghen", "F|Oslo", "F|Stoccolma"],
    ["F|Copenaghen", "F|Oslo", "V|Stoccolma"],
    ["F|Copenaghen", "V|Oslo", "F|Stoccolma"],
    ["F|Copenaghen", "F|Oslo", "V|Helsinki"],
    ["V|Reykjavik", "F|Oslo", "F|Stoccolma"],
    ["F|Copenaghen", "F|Oslo", "V|Nuuk"],
    ["F|Copenaghen", "F|Oslo", "V|Roma"],
    ["F|Copenaghen", "F|Oslo", "V|Parigi"],
    ["F|Copenaghen", "F|Oslo", "V|Madrid"],
    ["F|Copenaghen", "F|Oslo", "V|Lisbona"],
    ["F|Copenaghen", "F|Oslo", "V|Berlino"],
    ["F|Copenaghen", "V|Amsterdam", "F|Stoccolma"],
    ["F|Copenaghen", "V|Bruxelles", "F|Stoccolma"],
    ["F|Copenaghen", "F|Oslo", "V|Berna"],
    ["F|Copenaghen", "F|Oslo", "V|Vienna"],
    ["F|Copenaghen", "F|Oslo", "V|Varsavia"],
    ["F|Copenaghen", "F|Oslo", "V|Praga"],
    ["F|Copenaghen", "F|Oslo", "V|Bratislava"],
    ["F|Copenaghen", "F|Oslo", "V|Budapest"],
    ["F|Copenaghen", "F|Oslo", "V|Bucarest"],
    ["F|Copenaghen", "F|Oslo", "V|Sofia"],
    ["F|Copenaghen", "F|Oslo", "V|Atene"],
    ["F|Copenaghen", "F|Oslo", "V|Ankara"],
    ["F|Copenaghen", "F|Oslo", "V|Mosca"],
    ["F|Copenaghen", "F|Oslo", "V|Kiev"],
    ["F|Copenaghen", "F|Oslo", "V|Minsk"],
    ["F|Copenaghen", "F|Oslo", "V|Vilnius"],
    ["F|Copenaghen", "F|Oslo", "V|Riga"],
    ["F|Copenaghen", "F|Oslo", "V|Tallinn"],
    ["F|Copenaghen", "F|Oslo", "V|Chisinau"],
    ["F|Copenaghen", "F|Oslo", "V|Zagabrìa"],
    ["F|Copenaghen", "F|Oslo", "V|Lubiana"],
    ["F|Copenaghen", "F|Oslo", "V|Sarajevo"],
    ["F|Copenaghen", "F|Oslo", "V|Podgorica"],
    ["F|Copenaghen", "F|Oslo", "V|Tirana"],
    ["F|Copenaghen", "F|Oslo", "V|Skopje"],
    ["F|Copenaghen", "F|Oslo", "V|Belgrado"]
];

function creaHTML() {
    let strHTML = "<table>";

    for (let i = 0; i < domande.length; i++) {
        strHTML += "<tr>";
        strHTML += "<td>" + domande[i] + "</td>";
        strHTML += "<td>";
        strHTML += "<select id='risposta" + i + "'>";

        for (let j = 0; j < risposte[i].length; j++) {
            let elemento = risposte[i][j];
            let valElement = elemento.split('|')[0];
            let valText = elemento.split('|')[1];
            strHTML += "<option value='" + valElement + "'>" + valText + "</option>";
        }

        strHTML += "</select>";
        strHTML += "</td>";
        strHTML += "</tr>";
    }

    strHTML += "<tr><td colspan='2'><button id='btnCalcola' onclick='quiz();'>CALCOLA</button></td></tr>";
    strHTML += "</table>";
    document.getElementById("divHTML").innerHTML = strHTML;
}

function quiz() {
    let risposteEsatte = 0;
    for (let i = 0; i < domande.length; i++) {
        if (document.getElementById("risposta" + i).value === "V") {
            risposteEsatte++;
        }
    }

    document.getElementById("risultato").innerHTML = "Risposte esatte: " + risposteEsatte + " su " + domande.length;
}