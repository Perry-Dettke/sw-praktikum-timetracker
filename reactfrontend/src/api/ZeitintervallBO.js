import BusinessObject from './BusinessObject';


export default class ZeitintervallBO extends BusinessObject {

    constructor(start, ende, dauer, pausen_start, pausen_ende, pausen_dauer, person_id){
        super();
        this.start = start;
        this.ende = ende;
        this.dauer = dauer;
        this.start = pausen_start;
        this.ende = pausen_ende;
        this.dauer = pausen_dauer;
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

    setPausenStart(pausen_start) {
    this.pausen_start = pausen_start;
    }

    getPausenStart() {
    return this.pausen_start;
    }

    setPausenEnde(pausen_ende) {
    this.pausen_ende = pausen_ende;
    }

    getPausenEnde() {
    return this.pausen_ende;
    }

    setPausenDauer(pausen_dauer) {
    this.pausen_dauer = pausen_dauer;
    }

    getPausenDauer() {
    return this.pausen_dauer;
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
