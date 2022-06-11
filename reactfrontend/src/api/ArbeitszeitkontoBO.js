import BusinessObject from './BusinessObject';


export default class ArbeitszeitkontoBO extends BusinessObject {

    constructor(gesamtstunden){
        super();
        this.gesamtstunden = gesamtstunden;
    }

    // Gesamtstunden setzen 
    setGesamtstunden(gesamtstunden){
        this.gesamtstunden = gesamtstunden
    }
    // Gesamtstunden auslesen
    getGesamtstunden(){
        return this.gesamtstunden
    }
    
    // Objekt anhand einer JSON-Struktur erstellen
    static fromJSON(arbeitszeitkonto) {
        let p = Object.setPrototypeOf(arbeitszeitkonto, ArbeitszeitkontoBO.prototype);
        return p;
    }
}