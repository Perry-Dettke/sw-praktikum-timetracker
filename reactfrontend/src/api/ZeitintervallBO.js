import BusinessObject from './BusinessObject';


export default class ZeitintervallBO extends BusinessObject {

    constructor(start, ende, dauer, pausen_start, pausen_ende, pausen_dauer, person_id) {
        super();
        this.start = start;
        this.ende = ende;
        this.dauer = dauer;
        this.start = pausen_start;
        this.ende = pausen_ende;
        this.dauer = pausen_dauer;
        this.person_id = person_id;
    }

    //Start setzen
    setStart(start) {
        this.start = start;
    }

    //Start auslesen
    getStart() {
        return this.start;
    }

    //Ende setzen
    setEnde(ende) {
        this.ende = ende;
    }

    //Ende auslesen
    getEnde() {
        return this.ende;
    }

    //Dauer setzen
    setDauer(dauer) {
        this.dauer = dauer;
    }

    //Dauer auslesen
    getDauer() {
        return this.dauer;
    }

    //Pausenstart setzen
    setPausenStart(pausen_start) {
        this.pausen_start = pausen_start;
    }

    //Pausenstart auslesen
    getPausenStart() {
        return this.pausen_start;
    }

    //Pausenende setzen
    setPausenEnde(pausen_ende) {
        this.pausen_ende = pausen_ende;
    }

    //Pausenende auslesen
    getPausenEnde() {
        return this.pausen_ende;
    }

    //Pausendauer setzen
    setPausenDauer(pausen_dauer) {
        this.pausen_dauer = pausen_dauer;
    }

    //Pausendauer auslesen
    getPausenDauer() {
        return this.pausen_dauer;
    }

    //Person ID setzen
    setPerson_id(person_id) {
        this.person_id = person_id;
    }

    //Person ID auslesen
    getPerson_id() {
        return this.person_id;
    }

    static fromJSON(zeitintervall) {
        // Objekt anhand einer JSON-Struktur erstellen
        let p = Object.setPrototypeOf(zeitintervall, ZeitintervallBO.prototype);
        return p;
    }
}
