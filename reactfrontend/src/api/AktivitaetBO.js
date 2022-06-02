import BusinessObject from './BusinessObject';


export default class AktivitaetBO extends BusinessObject {

    constructor( bezeichnung, kapazitaet, projekt_id){
        super();
        this.bezeichnung = bezeichnung;
        this.kapazitaet = kapazitaet;
        this.projekt_id = projekt_id;
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
