import BusinessObject from './BusinessObject';


export default class ProjektBO extends BusinessObject {

    constructor(bezeichnung, auftraggeber){
        super();
        this.bezeichnung = bezeichnung;
        this.auftraggeber = auftraggeber;
    }

    setBezeichnung(bezeichnung){
        this.bezeichnung = bezeichnung;
    }

    getBezeichnung(){
        return this.bezeichnung;
    }

    setAuftraggeber(auftraggeber){
        this.auftraggeber = auftraggeber;
    }

    getAuftraggeber(){
        return this.auftraggeber;
    }

    static fromJSON(projekt) {
        // Objekt anhand einer JSON-Struktur erstellen
        let p = Object.setPrototypeOf(projekt, ProjektBO.prototype);
        return p;
    }
}
