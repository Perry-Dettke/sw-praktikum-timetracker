import BusinessObject from './BusinessObject';


export default class ProjektBO extends BusinessObject {

    constructor(bezeichnung, auftraggeber){
        super();
        this.bezeichnung = bezeichnung;
        this.auftraggeber = auftraggeber;
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

    static fromJSON(projekt) {
        // Objekt anhand einer JSON-Struktur erstellen
        let p = Object.setPrototypeOf(projekt, ProjektBO.prototype);
        return p;
    }
}
