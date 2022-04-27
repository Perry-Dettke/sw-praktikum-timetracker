import BusinessObject from './BusinessObject';


export default class EreignisBO extends BusinessObject {

    constructor(letzte_aenderung, erstellungs_zeitpunkt){
        super();
        this.letzte_aenderung = letzte_aenderung;
        this.erstellungs_zeitpunkt = erstellungs_zeitpunkt;
    }
    // Letzte Aenderung setzen
    setLetzte_aenderung(letzte_aenderung) {
    this.letzte_aenderung = letzte_aenderung;
    }
    // Letzte Aenderung auslesen
    getLetzte_aenderung() {
    return this.letzte_aenderung;
    }
    // Erstellungs_zeitpunkt setzen
    setErstellungs_zeitpunkt(erstellungs_zeitpunkt) {
    this.erstellungs_zeitpunkt = erstellungs_zeitpunkt;
    }
    // Erstellungs_zeitpunkt setzen
    getErstellungs_zeitpunkt() {
    return this.erstellungs_zeitpunkt;
    }

    static fromJSON(ereignis) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(ereignis, EreignisBO.prototype);
    return p;
    }
}
