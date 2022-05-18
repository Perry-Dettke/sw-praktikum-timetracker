import BusinessObject from './BusinessObject';


export default class ArbeitszeitkontoBO extends BusinessObject {

    constructor(arbeitsleistung){
        super();
        this.arbeitsleistung = arbeitsleistung;
    }
    // Arbeitsleistung erstellen 
    setArbeitsleistung(arbeitsleistung){
        this.arbeitsleistung = arbeitsleistung
    }

    // Arbeitsleistung auslesen
    getArbeitsleistung(){
        return this.arbeitsleistung
    }

    // Objekt anhand einer JSON-Struktur erstellen
    static fromJSON(arbeitszeitkonto) {
        let p = Object.setPrototypeOf(arbeitszeitkonto, ArbeitszeitkontoBO.prototype);
        return p;
    }
}