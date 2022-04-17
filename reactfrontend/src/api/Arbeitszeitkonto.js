import BusinessObject from './BusinessObject';


export default class ArbeitszeitkontoBO extends BusinessObject {

    constructor(arbeitsleistung, buchung_id){
        super();
        this.arbeitsleistung = arbeitsleistung;
        this.buchung_id = buchung_id
    }

    setArbeitsleistung(arbeitsleistung){
        this.arbeitsleistung = arbeitsleistung
    }

    getArbeitsleistung(){
        return this.arbeitsleistung
    }

    setBuchung_id(buchung_id){
        this.buchung_id = buchung_id
    }

    getBuchung_id(){
        return this.buchung_id
    }

    static fromJSON(arbeitszeitkonto) {
        // Objekt anhand einer JSON-Struktur erstellen
        let p = Object.setPrototypeOf(arbeitszeitkonto, ArbeitszeitkontoBO.prototype);
        return p;
    }
}