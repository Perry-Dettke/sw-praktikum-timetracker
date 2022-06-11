import BusinessObject from './BusinessObject';


export default class PersonBO extends BusinessObject {

    constructor(vor_name, nach_name, email, benutzer_name, google_user_id, arbeitszeitkonto_id){
        super();
        this.vor_name = vor_name;
        this.nach_name = nach_name;
        this.email = email;
        this.benutzer_name = benutzer_name;
        this.google_user_id = google_user_id;
        this.arbeitszeitkonto_id = arbeitszeitkonto_id;
        this.stunden = 0.0
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
    this.nach_name = nach_name;
    }  
    // Nachname auslesen
    getNach_name() {
    return this.nach_name;
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
    // Google_user_id setzen
    setGoogle_user_id(google_user_id) {
    this.google_user_id = google_user_id;
    }
    // Google_user_id auslesen
    getGoogle_user_id() {
    return this.google_user_id;
    }
    // Arbeitszeitkonto ID setzen
    setArbeitszeiutkonto_id(arbeitszeitkonto_id) {
    this.arbeitszeitkonto_id = arbeitszeitkonto_id;
    }
    // ARbeitszeitkonto ID auslesen
    getArbeitszeitkonto_id() {
    return this.arbeitszeitkonto_id;
    }
    // Stunden  setzen
    setStunden(stunden) {
    this.stunden = stunden;
    }
    // Stunden auslesen 
    getStunden() {
    return this.stunden;
    }

    static fromJSON(person) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(person, PersonBO.prototype);
    return p;
    }
}
