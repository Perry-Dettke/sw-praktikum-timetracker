import EreignisBO from './EreignisBO';


export default class KommenBO extends EreignisBO {

    constructor( erstellungs_zeitpunkt){
        super();
    }

    static fromJSON(kommen) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(kommen, KommenBO.prototype);
    return p;
    }
}
