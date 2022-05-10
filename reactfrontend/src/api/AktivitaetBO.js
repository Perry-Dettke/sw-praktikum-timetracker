import BusinessObject from './BusinessObject';


export default class AktivitaetBO extends BusinessObject {

    constructor(letzte_aenderung, bezeichnung, kapazitaet){
        super();
        this.letzte_aenderung = letzte_aenderung;
        this.bezeichnung = bezeichnung;
        this.kapazitaet = kapazitaet;
    }
    // Letzte Aenderung erstellen 
    setLetzte_aenderung(letzte_aenderung) {
    this.letzte_aenderung = letzte_aenderung;
    }
    // Letzte Aenderung auslesen
    getLetzte_aenderung() {
    return this.letzte_aenderung;
    }
    // Bezeichnung setzen 
    setBezeichnung(bezeichnung) {
    this.bezeichnung = bezeichnung;
    }
    // Bezeichnung auslesen 
    getBezeichnung() {
    return this.bezeichnung;
    }
    // Kapazitaet setzen
    setKapazitaet(kapazitaet) {
    this.kapazitaet = kapazitaet;
    }
    // Kapazitaet auslesen 
    getKapazitaet() {
    return this.kapazitaet;
    }

    static fromJSON(aktivitaet) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(aktivitaet, AktivitaetBO.prototype);
    return p;
    }
}
