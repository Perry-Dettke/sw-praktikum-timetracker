import BusinessObject from './BusinessObject';


export default class PersonProjektBO extends BusinessObject {

    constructor(person_id, projekt_id){
        super();
        this.person_id = person_id;
        this.projekt_id = projekt_id;
    }

    setPerson_id(person_id){
        this.person_id = person_id;
    }

    getPerson_id(){
        return this.person_id;
    }

    setProjekt_id(projekt_id){
        this.projekt_id = projekt_id;
    }

    getProjekt_id(){
        return this.projekt_id
    }

    static fromJSON(personprojekt) {
        // Objekt anhand einer JSON-Struktur erstellen
        let p = Object.setPrototypeOf(personprojekt, PersonProjektBO.prototype);
        return p;
    }
}