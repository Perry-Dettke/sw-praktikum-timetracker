import BusinessObject from './BusinessObject';


export default class ZeitintervallBO extends BusinessObject {

    constructor(start, ende){
        super();
        this.start = start;
        this.ende = ende;
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
