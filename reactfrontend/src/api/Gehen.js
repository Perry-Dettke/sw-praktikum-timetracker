import EreignisBO from './EreignisBO';


export default class GehenBO extends EreignisBO {

    constructor( erstellungs_zeitpunkt){
        super();
    }

    static fromJSON(gehen) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(gehen, GehenBO.prototype);
    return p;
    }
}

