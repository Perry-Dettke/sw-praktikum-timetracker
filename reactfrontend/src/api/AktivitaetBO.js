import BusinessObject from './BusinessObject';


export default class ZeitintervallBO extends BusinessObject {

    constructor(letzte_aenderung, bezeichnung, kapazitaet){
        super();
        this.letzte_aenderung = letzte_aenderung;
        this.bezeichnung = bezeichnung;
        this.kapazitaet = kapazitaet;
    }

    setLetzte_aenderung(letzte_aenderung) {
    this.letzte_aenderung = letzte_aenderung;
    }

    getLetzte_aenderung() {
    return this.letzte_aenderung;
    }

    setBezeichnung(bezeichnung) {
    this.bezeichnung = bezeichnung;
    }

    getBezeichnung() {
    return this.bezeichnung;
    }

    setKapazitaet(kapazitaet) {
    this.kapazitaet = kapazitaet;
    }

    getKapazitaet() {
    return this.kapazitaet;
    }

    static fromJSON(aktivitaet) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(aktivitaet, AktivitaetBO.prototype);
    return p;
    }
}
