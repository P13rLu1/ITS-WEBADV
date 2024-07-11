function calcoloCognomeCf(cognome) {
    let cfCognome;
    let arrCognome = cognome.toUpperCase().replace(/[^A-Z]/g, "").split("");
    let arrConsonanti = [];
    let arrVocali = [];

    arrCognome.forEach(lettera => {
        if ("BCDFGHJKLMNPQRSTVWXYZ".includes(lettera)) {
            arrConsonanti.push(lettera);
        } else if ("AEIOU".includes(lettera)) {
            arrVocali.push(lettera);
        }
    });

    cfCognome = arrConsonanti.join("").substring(0, 3);
    if (cfCognome.length < 3) {
        cfCognome += arrVocali.join("").substring(0, 3 - cfCognome.length);
    }
    if (cfCognome.length < 3) {
        cfCognome = (cfCognome + "XXX").substring(0, 3);
    }

    return cfCognome;
}

function calcoloNomeCf(nome) {
    let cfNome;
    let arrNome = nome.toUpperCase().replace(/[^A-Z]/g, "").split("");
    let arrConsonanti = [];
    let arrVocali = [];

    arrNome.forEach(lettera => {
        if ("BCDFGHJKLMNPQRSTVWXYZ".includes(lettera)) {
            arrConsonanti.push(lettera);
        } else if ("AEIOU".includes(lettera)) {
            arrVocali.push(lettera);
        }
    });

    if (arrConsonanti.length > 3) {
        cfNome = arrConsonanti[0] + arrConsonanti[2] + arrConsonanti[3];
    } else {
        cfNome = arrConsonanti.join("").substring(0, 3);
    }

    if (cfNome.length < 3) {
        cfNome += arrVocali.join("").substring(0, 3 - cfNome.length);
    }
    if (cfNome.length < 3) {
        cfNome = (cfNome + "XXX").substring(0, 3);
    }

    return cfNome;
}

async function calcoloCodiceFiscale() {
    let strNome = document.getElementById("nome").value;
    let strCognome = document.getElementById("cognome").value;
    let strDataNascita = document.getElementById("dataNascita").value;
    let strSesso = document.getElementById("sesso").value;
    let strComuneNascita = document.getElementById("comuneNascita").value;

    let cfCognome = calcoloCognomeCf(strCognome);
    let cfNome = calcoloNomeCf(strNome);

    let arrDataNascita = strDataNascita.split("/");
    let cfGiorno = arrDataNascita[0];
    let cfMese = arrDataNascita[1];
    let cfAnno = arrDataNascita[2].substring(2, 4);

    let cfMeseElaborato = calcoloCfMese(cfMese);
    let cfGiornoElaborato = calcoloGiornoCf(cfGiorno, strSesso);

    let pathJson = "codice_catasto.json";
    let cfComuneNascitaElaborato = await calcoloComuneCf(strComuneNascita, pathJson);

    let cfCodiceControllo = "U";

    let strCodiceFiscaleFinale = cfCognome + cfNome + cfAnno + cfMeseElaborato + cfGiornoElaborato + cfComuneNascitaElaborato + cfCodiceControllo;

    alert("Ciao " + strNome + " Il Codice Fiscale è Il Seguente: " + strCodiceFiscaleFinale);
}

async function calcoloComuneCf(comune, jsonFilePath) {
    try {
        const response = await fetch(jsonFilePath);
        const municipalities = await response.json();

        // Search for the municipality name
        for (const [code, details] of Object.entries(municipalities)) {
            if (details[0].toUpperCase() === comune.toUpperCase()) {
                return code;
            }
        }
        return null;
    } catch (error) {
        console.error("Error fetching or parsing the JSON file:", error);
        return null;
    }
}

function calcoloGiornoCf(giorno, sesso) {
    let cfGiorno;
    if (sesso.toUpperCase() === "M") {
        cfGiorno = giorno.padStart(2, '0');
    } else {
        cfGiorno = (parseInt(giorno) + 40).toString();
    }

    return cfGiorno.padStart(2, '0');
}

function calcoloCfMese(mese) {
    const mesi = {
        "01": "A", "02": "B", "03": "C", "04": "D",
        "05": "E", "06": "H", "07": "L", "08": "M",
        "09": "P", "10": "R", "11": "S", "12": "T"
    };
    return mesi[mese];
}