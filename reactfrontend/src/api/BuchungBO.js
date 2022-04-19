import BusinessObject from './BusinessObject';


export default class BuchungBO extends BusinessObject {

    constructor(letzte_aenderung, person_id, arbeitszeitkonto_id){
        super();
        this.letzte_aenderung = letzte_aenderung;
        this.person_id = person_id;
        this.arbeitszeitkonto_id = arbeitszeitkonto_id;
    }

    setLetzte_aenderung(letzte_aenderung) {
    this.letzte_aenderung = letzte_aenderung;
    }

    getLetzte_aenderung() {
    return this.letzte_aenderung;
    }

    setPerson_id(person_id) {
    this.person_id = person_id;
    }

    getPerson_id() {
    return this.person_id;
    }

    setArbeitszeitkonto_id(arbeitszeitkonto_id) {
    this.arbeitszeitkonto_id = arbeitszeitkonto_id;
    }

    getArbeitszeitkonto_id() {
    return this.arbeitszeitkonto_id;
    }

    static fromJSON(buchung) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(buchung, BuchungBO.prototype);
    return p;
    }
}
