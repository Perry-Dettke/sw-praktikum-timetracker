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

getVor_name(vor_name) {
    return this.vor_name 
}

setNach_name(nach_name) {
    this.Nnach_name = nach_name;
}

getNach_name(nach_name) {
    return this.Nnach_name
}




}