import BusinessObject from './BusinessObject';


export default class PersonBO extends BusinessObject {

    constructor(vor_name, nach_name, email, benutzer_name, arbeitszeitkonto_id){
        super();
        this.vor_name = vor_name;
        this.nach_name = nach_name;
        this.email = email;
        this.benutzer_name = benutzer_name;
        this.arbeitszeitkonto_id = arbeitszeitkonto_id;
    }
    // Vorname setzen
    setVor_name(vor_name) {
    this.vor_name = vor_name;
    }
    // Vorname auslesen
    getVor_name() {
    return this.vor_name;
    }
    // Nachname setzen
    setNach_name(nach_name) {
    this.Nnach_name = nach_name;
    }  
    // Nachname auslesen
    getNach_name() {
    return this.Nnach_name;
    }
    // Email setzen
    setEmail(email) {
    this.email = email;
    }
    // Email auslesen
    getEmail() {
    return this.email;
    }
    // Benutzername setzen
    setBenutzer_name(benutzer_name) {
    this.benutzer_name = benutzer_name;
    }
    // Benutzername auslesen
    getBenutzer_name() {
    return this.benutzer_name;
    }
    // Arbeitskonto_id setzen
    setArbeitszeitkonto_id(arbeitszeitkonto_id) {
    this.arbeitszeitkonto_id = arbeitszeitkonto_id;
    }
    // Arbeitskonto_id auslesen
    getArbeitszeitkonto_id() {
    return this.arbeitszeitkonto_id;
    }

    static fromJSON(person) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(person, PersonBO.prototype);
    return p;
    }
}
