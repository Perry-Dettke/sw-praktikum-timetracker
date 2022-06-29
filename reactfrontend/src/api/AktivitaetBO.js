import BusinessObject from './BusinessObject';


export default class AktivitaetBO extends BusinessObject {

    constructor(bezeichnung, kapazitaet, projekt_id) {
        super();
        this.bezeichnung = bezeichnung;
        this.kapazitaet = kapazitaet;
        this.projekt_id = projekt_id;
        this.stunden = 0.0;
        this.allstunden = 0.0;
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
    // Stunden  setzen
    setStunden(stunden) {
        this.stunden = stunden;
    }
    // Stunden auslesen 
    getStunden() {
        return this.stunden;
    }
    // Stunden  setzen
    setAllStunden(allstunden) {
        this.allstunden = allstunden;
    }
    // Stunden auslesen 
    getAllStunden() {
        return this.allstunden;
    }
    static fromJSON(aktivitaet) {
        // Objekt anhand einer JSON-Struktur erstellen
        let p = Object.setPrototypeOf(aktivitaet, AktivitaetBO.prototype);
        return p;
    }
}
