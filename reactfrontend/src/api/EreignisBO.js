import BusinessObject from './BusinessObject';


export default class EreignisBO extends BusinessObject {

    constructor(letzte_aenderung, erstellungs_zeitpunkt){
        super();
        this.letzte_aenderung = letzte_aenderung;
        this.erstellungs_zeitpunkt = erstellungs_zeitpunkt;
    }

    setLetzte_aenderung(letzte_aenderung) {
    this.letzte_aenderung = letzte_aenderung;
    }

    getLetzte_aenderung() {
    return this.letzte_aenderung;
    }

    setErstellungs_zeitpunkt(erstellungs_zeitpunkt) {
    this.erstellungs_zeitpunkt = erstellungs_zeitpunkt;
    }

    getErstellungs_zeitpunkt() {
    return this.erstellungs_zeitpunkt;
    }

    static fromJSON(ereignis) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(ereignis, EreignisBO.prototype);
    return p;
    }
}
