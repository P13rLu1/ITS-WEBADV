function gioca() {
    const turniPartita = 3;
    let turno = 0;
    let punteggioA = 0;
    let punteggioB = 0;
    let estrazioneA = 0;
    let estrazioneB = 0;

    document.getElementById("risultatoA").innerHTML = "";
    document.getElementById("risultatoB").innerHTML = "";

    while (turno < turniPartita) {

        // faccio l'estrazione dei due numeri
        estrazioneA = random();
        estrazioneB = random();

        //estrazioneA = setInterval(random, 1000);
        //estrazioneB = setInterval(random, 1000);
        document.getElementById("risultatoA").innerHTML += stampaSimbolo(estrazioneA) + "<br><br>";
        document.getElementById("risultatoB").innerHTML += stampaSimbolo(estrazioneB) + "<br><br>";

        // confronto le estrazioni per determinare chi vince il turno
        let round = confronta(estrazioneA, estrazioneB);

        if (round === 'A')
            punteggioA++;
        else if (round === 'B')
            punteggioB++;

        turno++;

        if (turno === turniPartita) {
            if (punteggioA > punteggioB)
                document.getElementById("risultato").innerHTML = "Vince A";
            else if (punteggioA < punteggioB)
                document.getElementById("risultato").innerHTML = "Vince B";
            else
                document.getElementById("risultato").innerHTML = "Pareggio";
        }
    }
}

function random() {
    return Math.floor(Math.random() * 3);
}

function confronta(a, b) {
    if (a === b) {
        return "P";
    } else if ((a === 0 && b === 2) || (a === 1 && b === 0) || (a === 2 && b === 1)) {
        return "A";
    } else {
        return "B";
    }
}

function stampaSimbolo(valore) {
    if (valore === 0)
        return "Sasso";
    else if (valore === 1)
        return "Carta";
    else
        return "Forbice";
}
