import BusinessObject from './BusinessObject';


export default class ProjektBO extends BusinessObject {

    constructor(bezeichnung, auftraggeber, startzeitraum, endzeitraum, projektersteller_id){
        super();
        this.bezeichnung = bezeichnung;
        this.auftraggeber = auftraggeber;
        this.startzeitraum = startzeitraum;
        this.endzeitraum = endzeitraum;
        this.projektersteller_id = projektersteller_id;
    }
    // Bezeichnung setzen
    setBezeichnung(bezeichnung){
        this.bezeichnung = bezeichnung;
    }
    // Bezeichnung auslesen
    getBezeichnung(){
        return this.bezeichnung;
    }
    // Auftraggeber setzen
    setAuftraggeber(auftraggeber){
        this.auftraggeber = auftraggeber;
    }
    // Auftraggeber auslesen
    getAuftraggeber(){
        return this.auftraggeber;
    }
    // Startzeitraum  setzen
    setStartzeitraum(startzeitraum){
        this.startzeitraum = startzeitraum;
    }
    // Startzeitraum ID auslesen
    getStartzeitraum(){
        return this.startzeitraum;
    }
    // Endzeitraum  setzen
    setEndzeitraum(endzeitraum){
        this.endzeitraum = endzeitraum;
    }
    // Endzeitraum ID auslesen
    getEndzeitraum(){
        return this.endzeitraum;
    }
    // Projektersteller ID setzen
    setProjekterstellerID(projektersteller_id){
        this.projektersteller_id = projektersteller_id;
    }
    // Projektersteller ID auslesen
    getProjekterstellerID(){
        return this.projektersteller_id;
    }

    static fromJSON(projekt) {
        // Objekt anhand einer JSON-Struktur erstellen
        let p = Object.setPrototypeOf(projekt, ProjektBO.prototype);
        return p;
    }
}
