import BusinessObject from './BusinessObject';


export default class BuchungBO extends BusinessObject {

    constructor(letzte_aenderung, person_id, arbeitszeitkonto_id){
        super();
        this.letzte_aenderung = letzte_aenderung;
        this.person_id = person_id;
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
    // Person_id setzen
    setPerson_id(person_id) {
    this.person_id = person_id;
    }
    // Person_id auslesen
    getPerson_id() {
    return this.person_id;
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
