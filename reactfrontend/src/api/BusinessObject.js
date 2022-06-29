export default class BusinessObject {

  constructor() {
    this.id = 0;
    this.letzte_aenderung = 0;
  }

  // ID setzen
  setID(id) {
    this.id = id;
  }

  // ID auslesen
  getID() {
    return this.id;
  }

  // letzte_aenderung setzen
  setLetzte_aenderung(letzte_aenderung) {
    this.letzte_aenderung = letzte_aenderung
  }
  // letzte_aenderung auslesen
  getLetzte_aenderung() {
    return this.letzte_aenderung
  }


  toString() {
    let result = "";
    for (var prop in this) {
      result += prop + ": " + this[prop] + " ";
    }

    return result;
  }
}