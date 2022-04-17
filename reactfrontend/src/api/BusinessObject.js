export default class BusinessObject {

    constructor() {
      this.id = 0;
      this.letzte_aenderung = 0;
    }
  
    setID(id) {
      // ID setzen
      this.id = id;
    }
  
    getID() {
      // ID auslesen
      return this.id;
    }

    setLetzte_aenderung(letzte_aenderung) {
      // letzte_aenderung setzen
      this.letzte_aenderung = letzte_aenderung
    }
    getLetzte_aenderung() {
      // letzte_aenderung auslesen
      return this.letzte_aenderung
    }
  }