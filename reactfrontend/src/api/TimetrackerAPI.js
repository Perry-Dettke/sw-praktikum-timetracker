import AktivitaetBO from './AktivitaetBO'; //K 
import ArbeitszeitkontoBO from './ArbeitszeitkontoBO'; //J
import BuchungBO from './BuchungBO'; //J
import EreignisBO from './EreignisBO'; //J 
import PersonBO from './PersonBO'; //K
import PersonProjektBO from './PersonProjektBO'; //K
import ProjektBO from './ProjektBO'; //K
import ZeitintervallBO from './ZeitintervallBO'; //J 


export default class TimetrackerAPI {

  static #api = null;

  // URL des Flask Servers
  #ServerBaseURL = '/timetracker';

  // *** Aktivitaet related *** // 
  #addAktivitaetURL = () => `${this.#ServerBaseURL}/aktivitaet`;
  #getAktivitaetbyIDURL = (id) => `${this.#ServerBaseURL}/aktivitaet/${id}`;
  #getAktivitaetbyProjektIDURL = (projekt_id, start, ende) => `${this.#ServerBaseURL}/akitvitaetbyprojektid/${projekt_id}/${start}/${ende}`;
  #updateAktivitaetURL = (id) => `${this.#ServerBaseURL}/aktivitaet/${id}`;
  #deleteAktivitaetURL = (id) => `${this.#ServerBaseURL}/aktivitaet/${id}`;

  // *** Arbeitszeitkonto related *** //
  #getArbeitszeitkontoURL = (id) => `${this.#ServerBaseURL}/arbeitszeitkonto/${id}`;
  #updateArbeitszeitkontoURL = (id) => `${this.#ServerBaseURL}/arbeitszeitkonto/${id}`;
  #deleteArbeitszeitkontoURL = (id) => `${this.#ServerBaseURL}/arbeitszeitkonto/${id}`;

  // *** Buchung related *** //
  #addBuchungURL = () => `${this.#ServerBaseURL}/buchung`;
  #getBuchungURL = () => `${this.#ServerBaseURL}/buchung`;
  #getBuchungbyIDURL = (id) => `${this.#ServerBaseURL}/buchung/${id}`;
  #updateBuchungURL = (id) => `${this.#ServerBaseURL}/buchung/${id}`;
  #deleteBuchungURL = (id) => `${this.#ServerBaseURL}/buchung/${id}`;
  #getBuchungbyPersonIDURL = (person_id) => `${this.#ServerBaseURL}/buchungbypersonid/${person_id}`;
  #getBuchungbyAktivitaetIDURL = (aktivitaet_id) => `${this.#ServerBaseURL}/buchungbyaktivitaetid/${aktivitaet_id}`;

  // *** Ereignis related *** //
  #addEreignisURL = () => `${this.#ServerBaseURL}/ereignis`;
  #getEreignisURL = () => `${this.#ServerBaseURL}/ereignis`;
  #getEreignisbyIDURL = (id) => `${this.#ServerBaseURL}/ereignis/${id}`;
  #deleteEreignisURL = (id) => `${this.#ServerBaseURL}/ereignis/${id}`;

  // *** Person related *** //
  #addPersonURL = () => `${this.#ServerBaseURL}/person`;
  #getPersonbyIDURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #getPersonURL = () => `${this.#ServerBaseURL}/person`;
  #updatePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #deletePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
  #getPersonByGoogleURL = (id) => `${this.#ServerBaseURL}/personbygoogle/${id}`;
  #addPersonGoogleURL = (id) => `${this.#ServerBaseURL}/firebase/${id}`;
  #getPersonbyAktivitaetIDURL = (aktivitaet_id, start, ende) => `${this.#ServerBaseURL}/personbyaktivitaet/${aktivitaet_id}/${start}/${ende}`;




  // *** Projekt related *** //
  #addProjektURL = () => `${this.#ServerBaseURL}/projekt`;
  #getProjektbyIDURL = (id) => `${this.#ServerBaseURL}/projekt/${id}`;
  #getProjektbyProjekterstellerIDURL = (projektersteller_id) => `${this.#ServerBaseURL}/projektbyprojekterstellerid/${projektersteller_id}`;
  #getProjektURL = () => `${this.#ServerBaseURL}/projekt`;
  #updateProjektURL = (id) => `${this.#ServerBaseURL}/projekt/${id}`;
  #deleteProjektURL = (id) => `${this.#ServerBaseURL}/projekt/${id}`;

  // *** PersonProjekt related *** //  
  #getPersonInProjektURL = (projekt_id) => `${this.#ServerBaseURL}/projektbypersonid/${projekt_id}`;
  #addPersonInProjektURL = (projekt_id) => `${this.#ServerBaseURL}/projektbypersonid/${projekt_id}`;
  #updatePersonInProjektURL = (projekt_id) => `${this.#ServerBaseURL}/projektbypersonid/${projekt_id}`;
  #getProjektbyPersonIDURL = (person_id) => `${this.#ServerBaseURL}/projekt_person/${person_id}`;
  #getPersonInProjektStundenURL = (projekt_id, start, ende) => `${this.#ServerBaseURL}/projekt_person_datum/${projekt_id}/${start}/${ende}`;
  #getProjektByPersonURL = (person_id) => `${this.#ServerBaseURL}/projektbyperson/${person_id}`;

  // *** Zeitintervall related *** //
  #addZeitintervallURL = () => `${this.#ServerBaseURL}/zeitintervall`;
  #getZeitintervallURL = (id) => `${this.#ServerBaseURL}/zeitintervall/${id}`;
  #updateZeitintervallURL = (id) => `${this.#ServerBaseURL}/zeitintervall/${id}`;
  #deleteZeitintervallURL = (id) => `${this.#ServerBaseURL}/zeitintervall/${id}`;
  #getZeitintervallbyMaxIDandPersonIDURL = (person_id) => `${this.#ServerBaseURL}/zeitintervallbymaxid/${person_id}`;
  #getZeitintervallbyPersonIDURL = (person_id) => `${this.#ServerBaseURL}/zeitintervallbypersonid/${person_id}`;
  #getZeitintervallbyPersonIDbyTimeURL = (person_id, start, ende) => `${this.#ServerBaseURL}/zeitintervallbypersonidbytime/${person_id}/${start}/${ende}`;


  static getAPI() {
    if (this.#api == null) {
      this.#api = new TimetrackerAPI();
    }
    return this.#api;
  }

  /**
   *  holt sich das JSON von Flask und gibt es als Promise zur??ck
   */
  #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
      // wird auch bei HTTP Error 401 und 500 ausgef??hrt
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    })


  // *** Aktivitaet related *** //
  getAktivitaetbyID(id) {
    // Aktivitaet abfragen
    return this.#fetchAdvanced(this.#getAktivitaetbyIDURL(id)).then((responseJSON) => {
      let aktivitaet = AktivitaetBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(aktivitaet)
      })
    })
  }


  getAktivitaetbyProjektID(projekt_id, start, ende) {
    // Aktivitaet abfragen
    return this.#fetchAdvanced(this.#getAktivitaetbyProjektIDURL(projekt_id, start, ende)).then((responseJSON) => {
      let aktivitaetliste = [];
      responseJSON.map(item => {
        let aktivitaet = AktivitaetBO.fromJSON(item);
        aktivitaetliste.push(aktivitaet);

      })

      return new Promise(function (resolve) {
        resolve(aktivitaetliste)
      })
    })
  }


  updateAktivitaet(aktivitaetBO) {
    // Aktivitaet updaten
    return this.#fetchAdvanced(this.#updateAktivitaetURL(aktivitaetBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(aktivitaetBO)
    }).then((responseJSON) => {
      let responseAktivitaetBO = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseAktivitaetBO);
      })
    })
  }


  addAktivitaet(aktivitaetBO) {
    // Aktivitaet neu anlegen
    return this.#fetchAdvanced(this.#addAktivitaetURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(aktivitaetBO)
    }).then((responseJSON) => {
      let responseAktivitaetBO = AktivitaetBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseAktivitaetBO);
      })
    })
  }



  deleteAktivitaet(aktivitaetBO) {
    // Aktivitaet l??schen
    return this.#fetchAdvanced(this.#deleteAktivitaetURL(aktivitaetBO.getID()), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(aktivitaetBO)
    })
  }

  // *** Arbeitszeitkonto related *** //
  getArbeitszeitkonto(arbeitszeitkontoID) {
    // Arbeitszeitkonto abfragen
    return this.#fetchAdvanced(this.#getArbeitszeitkontoURL(arbeitszeitkontoID)).then((responseJSON) => {
      let arbeitszeitkonto = ArbeitszeitkontoBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(arbeitszeitkonto)
      })
    })
  }


  updateArbeitszeitkonto(arbeitszeitkontoBO) {
    // Arbeitszeitkonto updaten
    return this.#fetchAdvanced(this.#updateArbeitszeitkontoURL(arbeitszeitkontoBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(arbeitszeitkontoBO)
    }).then((responseJSON) => {
      let responseArbeitszeitkontoBO = ArbeitszeitkontoBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseArbeitszeitkontoBO);
      })
    })
  }

  deleteArbeitszeitkonto(arbeitszeitkontoBO) {
    // Arbeitszeitkonto l??schen
    return this.#fetchAdvanced(this.#deleteArbeitszeitkontoURL(arbeitszeitkontoBO.getID()), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(arbeitszeitkontoBO)
    })
  }



  // *** Buchung related *** //
  getBuchung() {
    // Buchung abfragen
    return this.#fetchAdvanced(this.#getBuchungURL()).then((responseJSON) => {
      let buchungliste = [];
      responseJSON.map(item => {
        let buchung = BuchungBO.fromJSON(item);
        buchungliste.push(buchung);
      })
      return new Promise(function (resolve) {
        resolve(buchungliste);
      })
    })
  }

  getBuchungbyPersonID(person_id) {
    // Aktivitaet abfragen
    return this.#fetchAdvanced(this.#getBuchungbyPersonIDURL(person_id)).then((responseJSON) => {
      let buchungliste = [];
      responseJSON.map(item => {
        let buchung = BuchungBO.fromJSON(item);
        buchungliste.push(buchung);
      })
      return new Promise(function (resolve) {
        resolve(buchungliste)
      })
    })
  }

  getBuchungbyAktivitaetID(aktivitaet_id) {
    // Aktivitaet abfragen
    return this.#fetchAdvanced(this.#getBuchungbyAktivitaetIDURL(aktivitaet_id)).then((responseJSON) => {
      let buchungliste = [];
      responseJSON.map(item => {
        let buchung = BuchungBO.fromJSON(item);
        buchungliste.push(buchung);
      })
      return new Promise(function (resolve) {
        resolve(buchungliste)
      })
    })

  }

  addBuchung(buchungBO) {
    // Person neu anlegen
    return this.#fetchAdvanced(this.#addBuchungURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(buchungBO)
    }).then((responseJSON) => {
      let responseBuchungBO = BuchungBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseBuchungBO);
      })
    })
  }



  updateBuchung(buchungBO) {
    // Buchung updaten
    return this.#fetchAdvanced(this.#updateBuchungURL(buchungBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(buchungBO)
    }).then((responseJSON) => {
      let responseBuchungBO = BuchungBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseBuchungBO);
      })
    })
  }

  deleteBuchung(BuchungBO) {
    // Buchung l??schen
    return this.#fetchAdvanced(this.#deleteBuchungURL(BuchungBO.getID()), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(BuchungBO)
    })
  }

  // *** Ereignis related *** //
  getEreignisbyID(ereignisID) {
    // Ereignis abfragen
    return this.#fetchAdvanced(this.#getEreignisbyIDURL(ereignisID)).then((responseJSON) => {
      let ereignis = EreignisBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(ereignis)
      })
    })
  }

  getEreignis() {
    // Ereignis abfragen
    return this.#fetchAdvanced(this.#getEreignisURL()).then((responseJSON) => {
      let ereignis = EreignisBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(ereignis)
      })
    })
  }

  addEreignis(ereignisBO) {
    // Ereignis neu anlegen
    return this.#fetchAdvanced(this.#addEreignisURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ereignisBO)
    }).then((responseJSON) => {
      let responseEreignisBO = EreignisBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseEreignisBO);
      })
    })
  }

  deleteEreignis(EreignisBO) {
    // Ereignis l??schen
    return this.#fetchAdvanced(this.#deleteEreignisURL(EreignisBO.getID()), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(EreignisBO)
    })
  }

  // *** Person related *** //
  getPersonbyID(personID) {
    // Person abfragen
    return this.#fetchAdvanced(this.#getPersonbyIDURL(personID)).then((responseJSON) => {
      let person = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(person)
      })
    })
  }

  getPersonbyAktivitaetID(aktivitaet_id, start, ende) {
    // Person abfragen
    return this.#fetchAdvanced(this.#getPersonbyAktivitaetIDURL(aktivitaet_id, start, ende)).then((responseJSON) => {
      let personliste = [];
      responseJSON.map(item => {
        let person = PersonBO.fromJSON(item);
        personliste.push(person);
      })
      return new Promise(function (resolve) {
        resolve(personliste)
      })
    })

  }


  getPerson() {
    // Person abfragen
    return this.#fetchAdvanced(this.#getPersonURL()).then((responseJSON) => {
      let personenliste = [];
      responseJSON.map(item => {
        let person = PersonBO.fromJSON(item);
        personenliste.push(person);
      })
      return new Promise(function (resolve) {
        resolve(personenliste)
      })
    })
  }

  getPersonByGoogle(googleid) {
    // Person anhand der GoogleID auslesen
    return this.#fetchAdvanced(this.#getPersonByGoogleURL(googleid)).then((responseJSON) => {
      let person = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(person)
      })
    })
  }

  addPersonGoogle(personID, googleid) {
    // Person einer GoogleID zuweisen
    return this.#fetchAdvanced(this.#addPersonGoogleURL(googleid), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ 'personID': personID, 'googleid': googleid })
    })
  }

  updatePerson(personBO) {
    // Person updaten
    return this.#fetchAdvanced(this.#updatePersonURL(personBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    }).then((responseJSON) => {
      let responsePersonBO = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }


  addPerson(personBO) {
    // Person neu anlegen
    return this.#fetchAdvanced(this.#addPersonURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    }).then((responseJSON) => {
      let responsePersonBO = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

  deletePerson(personBO) {
    // Projekt l??schen
    return this.#fetchAdvanced(this.#deletePersonURL(personBO.getID()), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    })
  }

  // *** Projekt related *** //
  getProjektbyID(id) {
    // Projekt abfragen
    return this.#fetchAdvanced(this.#getProjektbyIDURL(id)).then((responseJSON) => {
      let projekt = ProjektBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(projekt)
      })
    })
  }

  getProjektbyProjekterstellerID(projektersteller_id) {
    // Aktivitaet abfragen
    return this.#fetchAdvanced(this.#getProjektbyProjekterstellerIDURL(projektersteller_id)).then((responseJSON) => {
      let projektliste = [];
      responseJSON.map(item => {
        let projekt = ProjektBO.fromJSON(item);
        projektliste.push(projekt);
      })
      return new Promise(function (resolve) {
        resolve(projektliste)
      })
    })
  }

  getProjekt() {
    // Projekt abfragen
    return this.#fetchAdvanced(this.#getProjektURL()).then((responseJSON) => {
      let projektList = [];
      responseJSON.map(item => {
        let projekt = ProjektBO.fromJSON(item);
        projektList.push(projekt);
      })
      return new Promise(function (resolve) {
        resolve(projektList);
      })
    })
  }




  updateProjekt(projektBO) {
    // Projekt updaten
    return this.#fetchAdvanced(this.#updateProjektURL(projektBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projektBO)
    }).then((responseJSON) => {
      let responseProjektBO = ProjektBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseProjektBO);
      })
    })
  }


  addProjekt(projektBO) {
    // Projekt neu anlegen
    return this.#fetchAdvanced(this.#addProjektURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projektBO)
    }).then((responseJSON) => {
      let responseProjektBO = ProjektBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseProjektBO);
      })
    })
  }


  deleteProjekt(projektBO) {
    // Projekt l??schen
    return this.#fetchAdvanced(this.#deleteProjektURL(projektBO.getID()), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projektBO)
    })
  }

  getPersonInProjekt(projekt_id) {
    // Teilnehmer eines Projekt abfragen
    return this.#fetchAdvanced(this.#getPersonInProjektURL(projekt_id)).then((responseJSON) => {
      let personenliste = [];
      responseJSON.map(item => {
        let person = PersonBO.fromJSON(item);
        personenliste.push(person);
      })
      return new Promise(function (resolve) {
        resolve(personenliste)
      })
    })
  }


  getProjektByPerson(person_id) {
    // Teilnehmer eines Projekt abfragen
    return this.#fetchAdvanced(this.#getProjektByPersonURL(person_id)).then((responseJSON) => {
      let projektliste = [];
      responseJSON.map(item => {
        let projekt = ProjektBO.fromJSON(item);
        projektliste.push(projekt);
      })
      return new Promise(function (resolve) {
        resolve(projektliste)
      })
    })
  }

  getPersonInProjektStunden(projekt_id, start, ende) {
    // Teilnehmer eines Projekt abfragen
    return this.#fetchAdvanced(this.#getPersonInProjektStundenURL(projekt_id, start, ende)).then((responseJSON) => {
      let personenliste = [];
      responseJSON.map(item => {
        let person = PersonBO.fromJSON(item);
        personenliste.push(person);
      })
      return new Promise(function (resolve) {
        resolve(personenliste)
      })
    })
  }

  addPersonInProjekt(projekt_id, personen) {
    // Person in Projekt neu anlegen
    let person_id_list = [];
    personen.map(person => {
      person_id_list.push(person.getID())
    })
    return this.#fetchAdvanced(this.#addPersonInProjektURL(projekt_id), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ 'projekt_id': projekt_id, 'person_id_list': person_id_list })
    }).then((responseJSON) => {
      let responseProjektBO = ProjektBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseProjektBO);
      })
    })
  }

  updatePersonInProjekt(projekt_id, personen) {
    // Person in Projekt bearbeiten
    let person_id_list = [];
    personen.map(person => {
      person_id_list.push(person.getID())
    })
    return this.#fetchAdvanced(this.#updatePersonInProjektURL(projekt_id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ 'projekt_id': projekt_id, 'person_id_list': person_id_list })
    }).then((responseJSON) => {
      let responseProjektBO = ProjektBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseProjektBO);
      })
    })
  }

  // *** Projekt related *** //
  getProjektbyPersonID(person_id) {
    // alle Projekte der angemeldeten Person abfragen
    return this.#fetchAdvanced(this.#getProjektbyPersonIDURL(person_id)).then((responseJSON) => {
      let projektliste = [];
      responseJSON.map(item => {
        let projekt = ProjektBO.fromJSON(item);
        projektliste.push(projekt);
      })
      return new Promise(function (resolve) {
        resolve(projektliste)
      })
    })
  }

  // Zeitintervall related

  getZeitintervall(zeitintervallID) {
    // Zeitintervall abfragen
    return this.#fetchAdvanced(this.#getZeitintervallURL(zeitintervallID)).then((responseJSON) => {
      let zeitintervall = ZeitintervallBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(zeitintervall)
      })
    })
  }

  addZeitintervall(zeitintervallBO) {
    // Zeitintervall neu anlegen
    return this.#fetchAdvanced(this.#addZeitintervallURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(zeitintervallBO)
    }).then((responseJSON) => {
      let responseZeitintervallBO = ZeitintervallBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseZeitintervallBO);
      })
    })
  }


  updateZeitintervall(zeitintervallBO) {
    // Zeitintervall updaten
    return this.#fetchAdvanced(this.#updateZeitintervallURL(zeitintervallBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(zeitintervallBO)
    }).then((responseJSON) => {
      let responseZeitintervallBO = ZeitintervallBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseZeitintervallBO);
      })
    })
  }

  deleteZeitintervall(zeitintervallBO) {
    // Zeitintervall l??schen
    return this.#fetchAdvanced(this.#deleteZeitintervallURL(zeitintervallBO.getID()), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(zeitintervallBO)
    })
  }

  getZeitintervallbyMaxIDandPersonID(person_id) {
    // Aktivitaet abfragen
    return this.#fetchAdvanced(this.#getZeitintervallbyMaxIDandPersonIDURL(person_id)).then((responseJSON) => {
      let zeitintervall = ZeitintervallBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(zeitintervall)
      })
    })
  }



  getZeitintervallbyPersonID(person_id) {
    // Aktivitaet abfragen
    return this.#fetchAdvanced(this.#getZeitintervallbyPersonIDURL(person_id)).then((responseJSON) => {
      let zeitintervallliste = [];
      responseJSON.map(item => {
        let zeitintervall = ZeitintervallBO.fromJSON(item);
        zeitintervallliste.push(zeitintervall);
      })
      return new Promise(function (resolve) {
        resolve(zeitintervallliste)
      })
    })
  }

  getZeitintervallbyPersonIDbyTime(person_id, start, ende) {
    // Aktivitaet abfragen
    return this.#fetchAdvanced(this.#getZeitintervallbyPersonIDbyTimeURL(person_id, start, ende)).then((responseJSON) => {
      let zeitintervallliste = [];
      responseJSON.map(item => {
        let zeitintervall = ZeitintervallBO.fromJSON(item);
        zeitintervallliste.push(zeitintervall);
      })
      return new Promise(function (resolve) {
        resolve(zeitintervallliste)
      })
    })
  }

}