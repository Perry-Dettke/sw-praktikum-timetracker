import BusinessObject from './BusinessObject';


export default class ZeitintervallBO extends BusinessObject {

    constructor(start, ende, dauer, person_id){
        super();
        this.start = start;
        this.ende = ende;
        this.dauer = dauer;
        this.person_id = person_id;
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

    setDauer(dauer) {
    this.dauer = dauer;
    }

    getDauer() {
    return this.dauer;
    }

    setPerson_id(person_id) {
    this.person_id = person_id;
    }

    getPerson_id() {
    return this.person_id;
    }

    static fromJSON(zeitintervall) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(zeitintervall, ZeitintervallBO.prototype);
    return p;
    }
}
