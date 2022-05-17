import BusinessObject from './BusinessObject';


export default class ProjektBO extends BusinessObject {

    constructor(bezeichnung, auftraggeber, aktivitaet_id){
        super();
        this.bezeichnung = bezeichnung;
        this.auftraggeber = auftraggeber;
        this.aktivitaet_id = aktivitaet_id;
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

    // Aktivitäts ID setzen
    setAktivitaetID(aktivitaet_id){
        this.aktivitaet_id = aktivitaet_id;
    }
    // Aktivitäts ID auslesen
    getAktivitaetID(){
        return this.aktivitaet_id;
    }

    static fromJSON(projekt) {
        // Objekt anhand einer JSON-Struktur erstellen
        let p = Object.setPrototypeOf(projekt, ProjektBO.prototype);
        return p;
    }
}
