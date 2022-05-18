import BusinessObject from './BusinessObject';


export default class BuchungBO extends BusinessObject {

    constructor(letzte_aenderung, erstellt_von, arbeitszeitkonto_id){
        super();
        this.letzte_aenderung = letzte_aenderung;
        this.erstellt_von = erstellt_von;
        this.arbeitszeitkonto_id = arbeitszeitkonto_id;
    }
    // letzte Aenderung setzen
    setLetzte_aenderung(letzte_aenderung) {
    this.letzte_aenderung = letzte_aenderung;
    }
    // letzte Aenderung auslesen
    getLetzte_aenderung() {
    return this.letzte_aenderung;
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

    static fromJSON(buchung) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(buchung, BuchungBO.prototype);
    return p;
    }
}
