import BusinessObject from './BusinessObject';


export default class ArbeitszeitkontoBO extends BusinessObject {

    constructor(arbeitsleistung, buchung_id){
        super();
        this.arbeitsleistung = arbeitsleistung;
        this.buchung_id = buchung_id
    }
    // Arbeitsleistung erstellen 
    setArbeitsleistung(arbeitsleistung){
        this.arbeitsleistung = arbeitsleistung
    }

    // Arbeitsleistung auslesen
    getArbeitsleistung(){
        return this.arbeitsleistung
    }

    //Buchung_id setzen
    setBuchung_id(buchung_id){
        this.buchung_id = buchung_id
    }

    // Buchung_id auslesen
    getBuchung_id(){
        return this.buchung_id
    }

    // Objekt anhand einer JSON-Struktur erstellen
    static fromJSON(arbeitszeitkonto) {
        let p = Object.setPrototypeOf(arbeitszeitkonto, ArbeitszeitkontoBO.prototype);
        return p;
    }
}