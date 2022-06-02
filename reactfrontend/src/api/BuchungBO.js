import BusinessObject from './BusinessObject';


export default class BuchungBO extends BusinessObject {

    constructor(erstellt_von, arbeitszeitkonto_id, aktivitaet_id){
        super();
        this.erstellt_von = erstellt_von;
        this.arbeitszeitkonto_id = arbeitszeitkonto_id;
        this.aktivitaet_id = aktivitaet_id;
    }

    // erstellt_von setzen
    setErstellt_von(erstellt_von) {
    this.erstellt_von = erstellt_von;
    }
    // erstellt_von auslesen
    getErstellt_von() {
    return this.erstellt_von;
    }
    // Arbeitszeitkonto_id setzen
    setArbeitszeitkonto_id(arbeitszeitkonto_id) {
    this.arbeitszeitkonto_id = arbeitszeitkonto_id;
    }
    // Arbeitszeitkonto_id auslesen 
    getArbeitszeitkonto_id() {
    return this.arbeitszeitkonto_id;
    }
    // Aktivitaet_id setzen
    setAktivitaet_id(aktivitaet_id) {
    this.aktivitaet_id = aktivitaet_id;
    }
    // Aktivitaet_id auslesen 
    getAktivitaet_id() {
    return this.aktivitaet_id;
    }

    static fromJSON(buchung) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(buchung, BuchungBO.prototype);
    return p;
    }
}
