class Animale {
    nome: string;
    razza: string;

    constructor(nome: string, razza: string) {
        this.nome = nome;
        this.razza = razza;
    }
}

let cane = new Animale("Fido", "Pastore Tedesco");
console.log(cane);