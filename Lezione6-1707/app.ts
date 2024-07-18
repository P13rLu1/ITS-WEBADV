let numero1: number = 10;
let numero2: string = "20";
console.log(somma(numero1, parseInt(numero2)));

function somma(a: number, b: number): number {
    return a + b;
}

console.log(prodotto(parseInt("10"), 20));

function prodotto(a: number, b: number) {
    return a * b;
}

let corsisti: string[] = ["Simone", "Silvio", "Luca", "Matteo"];
console.log(corsisti);

let corsistiAny: any[] = ["Simone", 10, true, "Matteo", 11.5];
console.log(corsistiAny);

let city: [string, any, number, boolean, string, string] = ["Lecce", "100 a.c.", 100000, true, "Salento", "Puglia"];
city[5] = "Lupiae";
console.log(city);

enum MarcheAuto {
    FIAT,
    FORD,
    BMW,
    AUDI,
    MERCEDES,
    TOYOTA,
    OPEL,
    PEUGEOT,
    CITROEN,
    RENAULT,
    VOLKSWAGEN,
    ALFA_ROMEO,
    LANCIA,
    JEEP,
    LAND_ROVER,
    VOLVO,
    SAAB,
    PORSCHE,
    FERRARI,
    LAMBORGHINI,
    MASERATI,
    BUGATTI,
    ASTON_MARTIN,
    BENTLEY,
    ROLLS_ROYCE,
    JAGUAR,
    LOTUS,
    TESLA,
    TATA,
    MAHINDRA,
    MARUTI,
    HONDA,
    SUZUKI,
    NISSAN,
    MITSUBISHI,
    MAZDA,
    KIA,
    HYUNDAI,
    DAEWOO,
    CHEVROLET,
    CADILLAC,
    BUICK,
    CHRYSLER,
    DODGE,
    RAM,
    GMC,
    LINCOLN,
    MERCURY,
    PONTIAC,
    SATURN,
    OLDSMOBILE
}

let autoPier: MarcheAuto = MarcheAuto.ALFA_ROMEO;
console.log(MarcheAuto);
console.log(autoPier);

enum MarcheMoto {Aprilia = 10, Yamaha = 24, Suzuki = 67, Ducati = 25, Benelli = 99, Augusta = 25, Harley_Davidson = 11}

console.log(MarcheMoto);