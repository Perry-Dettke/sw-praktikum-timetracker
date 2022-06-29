import BusinessObject from './BusinessObject';


export default class ArbeitszeitkontoBO extends BusinessObject {

    constructor(gesamtstunden, urlaubstage, krankheitstage) {
        super();
        this.gesamtstunden = gesamtstunden;
        this.urlaubstage = urlaubstage;
        this.krankheitstage = krankheitstage;
    }

    // Gesamtstunden setzen 
    setGesamtstunden(gesamtstunden) {
        this.gesamtstunden = gesamtstunden
    }
    // Gesamtstunden auslesen
    getGesamtstunden() {
        return this.gesamtstunden
    }

    // Urlaubstage setzen 
    setUrlaubstage(urlaubstage) {
        this.urlaubstage = urlaubstage
    }
    // Urlaubstage auslesen
    getUrlaubstage() {
        return this.urlaubstage
    }

    // Krankheitstage setzen 
    setKrankheitstage(krankheitstage) {
        this.krankheitstage = krankheitstage
    }
    // Krankheitstage auslesen
    getKrankheitstage() {
        return this.krankheitstage
    }


    // Objekt anhand einer JSON-Struktur erstellen
    static fromJSON(arbeitszeitkonto) {
        let p = Object.setPrototypeOf(arbeitszeitkonto, ArbeitszeitkontoBO.prototype);
        return p;
    }
}