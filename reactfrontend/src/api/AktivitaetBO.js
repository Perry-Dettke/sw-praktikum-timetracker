import BusinessObject from './BusinessObject';


export default class AktivitaetBO extends BusinessObject {

    constructor(letzte_aenderung, bezeichnung, kapazitaet, projekt_id){
        super();
        this.letzte_aenderung = letzte_aenderung;           //muss des nicht raus, da es von dem BO letzte_aenderung erbt?
        this.bezeichnung = bezeichnung;
        this.kapazitaet = kapazitaet;
        this.projekt_id = projekt_id;
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

    // Projekt ID setzen
    setProjektID(projekt_id) {
    this.projekt_id = projekt_id;
    }
    // Projekt ID auslesen 
    getProjektID() {
    return this.projekt_id;
    }

    static fromJSON(aktivitaet) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(aktivitaet, AktivitaetBO.prototype);
    return p;
    }
}
