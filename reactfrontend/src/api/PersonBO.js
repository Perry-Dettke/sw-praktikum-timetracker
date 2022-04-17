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

    setVor_name(vor_name) {
    this.vor_name = vor_name;
    }

    getVor_name() {
    return this.vor_name;
    }

    setNach_name(nach_name) {
    this.Nnach_name = nach_name;
    }  

    getNach_name() {
    return this.Nnach_name;
    }

    setEmail(email) {
    this.email = email;
    }

        getEmail() {
    return this.email;
    }

    setBenutzer_name(benutzer_name) {
    this.benutzer_name = benutzer_name;
    }

    getBenutzer_name() {
    return this.benutzer_name;
    }

    setArbeitszeitkonto_id(arbeitszeitkonto_id) {
    this.arbeitszeitkonto_id = arbeitszeitkonto_id;
    }

    getArbeitszeitkonto_id() {
    return this.arbeitszeitkonto_id;
    }

    static fromJSON(person) {
    // Objekt anhand einer JSON-Struktur erstellen
    let p = Object.setPrototypeOf(person, PersonBO.prototype);
    return p;
    }
}
