import BusinessObject from './BusinessObject';


export default class ProjektBO extends BusinessObject {

    constructor(bezeichnung, auftraggeber, projektersteller_id){
        super();
        this.bezeichnung = bezeichnung;
        this.auftraggeber = auftraggeber;
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
