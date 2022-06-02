import BusinessObject from './BusinessObject';


export default class ArbeitszeitkontoBO extends BusinessObject {

    constructor(person_id, aktivitaet_id){
        super();
        this.person_id = person_id;
        this.aktivitaet_id = aktivitaet_id;
    }

    // Personen ID erstellen 
    setPerson_id(person_id){
        this.person_id = person_id
    }
    // Personen ID auslesen
    getPerson_id(){
        return this.person_id
    }

    // Aktivitaet ID erstellen 
    setAktivitaet_id(aktivitaet_id){
        this.aktivitaet_id = this.aktivitaet_id
    }
    // Aktivitaet ID auslesen
    getAktivitaet_id(){
        return this.aktivitaet_id
    }

    // Objekt anhand einer JSON-Struktur erstellen
    static fromJSON(arbeitszeitkonto) {
        let p = Object.setPrototypeOf(arbeitszeitkonto, ArbeitszeitkontoBO.prototype);
        return p;
    }
}