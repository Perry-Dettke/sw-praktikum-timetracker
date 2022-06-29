import BusinessObject from './BusinessObject';


export default class EreignisBO extends BusinessObject {

    constructor(erstellungs_zeitpunkt) {
        super();
        this.erstellungs_zeitpunkt = erstellungs_zeitpunkt;
    }

    // Erstellungszeitpunkt setzen
    setErstellungs_zeitpunkt(erstellungs_zeitpunkt) {
        this.erstellungs_zeitpunkt = erstellungs_zeitpunkt;
    }
    // Erstellungszeitpunkt setzen
    getErstellungs_zeitpunkt() {
        return this.erstellungs_zeitpunkt;
    }

    static fromJSON(ereignis) {
        // Objekt anhand einer JSON-Struktur erstellen
        let p = Object.setPrototypeOf(ereignis, EreignisBO.prototype);
        return p;
    }
}
