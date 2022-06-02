import BusinessObject from './BusinessObject';


export default class BuchungBO extends BusinessObject {

    constructor(datum, stunden, arbeitszeitkonto_id){
        super();
        this.datum = datum;
        this.stunden = stunden;
        this.arbeitszeitkonto_id = arbeitszeitkonto_id;
    }

    // Datum setzen
    setDatum(datum) {
    this.datum = datum;
    }
    // Datum auslesen
    getDatum() {
    return this.datum;
    }
    // Stunden setzen
    setStunden(stunden) {
    this.stunden = stunden;
    }
    // Stunden auslesen 
    getStunden() {
    return this.stunden;
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
