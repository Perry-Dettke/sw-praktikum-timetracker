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

    #addPersonURL = () => `${this.#ServerBaseURL}/person`;
    #getPersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
    #updatePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
    #deletePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
    #getPersonByFirebaseURL = (id) => `${this.#ServerBaseURL}/firebase/${id}`;
    #addPersonFirebaseURL = (id) => `${this.#ServerBaseURL}/firebase/${id}`;

    #addProjektURL = () => `${this.#ServerBaseURL}/projekt`;
    #getProjektURL = (id) => `${this.#ServerBaseURL}/projekt/${id}`;
    #updateProjektURL = (id) => `${this.#ServerBaseURL}/projekt/${id}`;
    #deleteProjektURL = (id) => `${this.#ServerBaseURL}/projekt/${id}`;

    // #addPersonProjektURL = () => `${this.#ServerBaseURL}/personprojekt`;
    // #getPersonProjektURL = (id) => `${this.#ServerBaseURL}/personprojekt/${id}`;
    // #updatePersonProjektURL = (id) => `${this.#ServerBaseURL}/personprojekt/${id}`;
    // #deletePersonProjektURL = (id) => `${this.#ServerBaseURL}/personprojekt/${id}`;

    // linkPersonProjektURL = () => `${this.#ServerBaseURL}/link`;




    #addAktivitaetURL = () => `${this.#ServerBaseURL}/aktivitaet`;
    #getAktivitaetURL = (id) => `${this.#ServerBaseURL}/aktivitaet/${id}`;
    #updateAktivitaetURL = (id) => `${this.#ServerBaseURL}/aktivitaet/${id}`;
    #deleteAktivitaetURL = (id) => `${this.#ServerBaseURL}/aktivitaet/${id}`;



    static getAPI() {
        if (this.#api == null) {
          this.#api = new TeachingbeeAPI();
        }
        return this.#api;
      }
    
      /**
       *  holt sich das JSON von Flask und gibt es als Promise zurück
       */
    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
        // wird auch bei HTTP Error 401 und 500 ausgeführt
        if (!res.ok) {
            throw Error(`${res.status} ${res.statusText}`);
          }
        return res.json();
    })
    


    getPerson(personID) {
        // Person abfragen
        return this.#fetchAdvanced(this.#getPersonURL(personID)).then((responseJSON) => {
          let person = PersonBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(person)
          })
        })
      }

    
    getPersonByFirebase(firebaseID) {
        // Person anhand der FirebaseID auslesen
        return this.#fetchAdvanced(this.#getPersonByFirebaseURL(firebaseID)).then((responseJSON) => {
          let person = PersonBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(person)
          })
        })
      }
    
    addPersonFirebase(personID, firebaseID) {
        // Person einer FirebaseID zuweisen
        return this.#fetchAdvanced(this.#addPersonFirebaseURL(firebaseID), {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ 'personID': personID, 'firebaseID': firebaseID })
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
        // Person löschen
        return this.#fetchAdvanced(this.#deletePersonURL(personBO.getID()), {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(personBO)
        })
      }




    getProjekt(projektID) {
        // Projekt abfragen
        return this.#fetchAdvanced(this.#getProjektURL(projektID)).then((responseJSON) => {
          let projekt = ProjektBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(projekt)
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
        // Projekt löschen
        return this.#fetchAdvanced(this.#deleteProjektURL(projektBO.getID()), {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(projektO)
        })
      }

    


    link_person_profile(personID, projektID) {
        // Person mit einem Projekt verknüpfen
        return this.#fetchAdvanced(this.#LinkURL(), {
          method: 'PUT',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ 'personID': personID, 'projektID': projektID })
        }).then((responseJSON) => {
          return new Promise(function (resolve) {
            resolve(responseJSON);
          })
        })
      }

    



    getAktivitaet(aktivitaetID) {
        // Aktivitaet abfragen
        return this.#fetchAdvanced(this.#getaAtivitaetURL(aktivitaetID)).then((responseJSON) => {
          let aktivitaet = AktivitaetBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(aktivitaet)
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
        // Aktivitaet löschen
        return this.#fetchAdvanced(this.#deleteAktivitaetURL(aktivitaetBO.getID()), {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(aktivitaetBO)
        })
      }

}