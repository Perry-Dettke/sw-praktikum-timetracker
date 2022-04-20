import BusinessObject from './BusinessObject';


export default class ZeitintervallBO extends BusinessObject {

    constructor(letzte_aenderung, start, ende){
        super();
        this.letzte_aenderung = letzte_aenderung;
        this.start = start;
        this.ende = ende;
    }

    setLetzte_aenderung(letzte_aenderung) {
    this.letzte_aenderung = letzte_aenderung;
    }

    getLetzte_aenderung() {
    return this.letzte_aenderung;
    }

    setStart(start) {
    this.start = start;
    }

    getStart() {
    return this.start;
    }

    setEnde(ende) {
    this.ende = ende;
    }

    getEnde() {
    return this.ende;
    }

    static fromJSON(zeitintervall) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(zeitintervall, ZeitintervallBO.prototype);
    return p;
    }
}
