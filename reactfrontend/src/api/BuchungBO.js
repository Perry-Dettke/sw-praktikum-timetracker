import BusinessObject from './BusinessObject';


export default class BuchungBO extends BusinessObject {

    constructor(datum, stunden, ereignisbuchung, person_id, aktivitaet_id){
        super();
        this.datum = new Date();
        this.stunden = stunden;
        this.ereignisbuchung = ereignisbuchung;
        this.person_id = person_id;
        this.aktivitaet_id = aktivitaet_id;
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
    // Ereignisbuchung 0/1 setzen
    setEreignisbuchung(ereignisbuchung) {
    this.ereignisbuchung = ereignisbuchung;
    }
    // Ereignnisbuchung 0/1 lesen 
    getEreignisbuchung() {
    return this.ereignisbuchung;
    }
    // Person ID setzen
    setPerson_id(person_id) {
    this.person_id = person_id;
    }
    // Person ID auslesen 
    getPerson_id() {
    return this.person_id;
    }
    // Aktivitaet ID setzen
    setAktivitaet_id(aktivitaet_id) {
    this.aktivitaet_id = aktivitaet_id;
    }
    // Aktivitaet ID auslesen 
    getAktivitaet_id() {
    return this.aktivitaet_id;
    }

    static fromJSON(buchung) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(buchung, BuchungBO.prototype);
    return p;
    }
}
