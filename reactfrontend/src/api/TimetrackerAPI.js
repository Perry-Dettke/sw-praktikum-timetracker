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
    #getPersonbyIDURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
    #getPersonURL = () => `${this.#ServerBaseURL}/person`;
    #updatePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
    #deletePersonURL = (id) => `${this.#ServerBaseURL}/person/${id}`;
    #getPersonByGoogleURL = (id) => `${this.#ServerBaseURL}/personbygoogle/${id}`;
    // #addPersonFirebaseURL = (id) => `${this.#ServerBaseURL}/firebase/${id}`;

    #addProjektURL = () => `${this.#ServerBaseURL}/projekt`;
    #getProjektbyIDURL = (id) => `${this.#ServerBaseURL}/projekt/${id}`;
    #getProjektURL = () => `${this.#ServerBaseURL}/projekt`;

    #updateProjektURL = (id) => `${this.#ServerBaseURL}/projekt/${id}`;
    #deleteProjektURL = (id) => `${this.#ServerBaseURL}/projekt/${id}`;

    // #addPersonProjektURL = () => `${this.#ServerBaseURL}/personprojekt`;
    // #getPersonProjektURL = (id) => `${this.#ServerBaseURL}/personprojekt/${id}`;
    // #updatePersonProjektURL = (id) => `${this.#ServerBaseURL}/personprojekt/${id}`;
    // #deletePersonProjektURL = (id) => `${this.#ServerBaseURL}/personprojekt/${id}`;

    // linkPersonProjektURL = () => `${this.#ServerBaseURL}/link`;

    #addAktivitaetURL = () => `${this.#ServerBaseURL}/aktivitaet`;
    #getAktivitaetURL = () => `${this.#ServerBaseURL}/aktivitaet`;
    #getAktivitaetbyIDURL = (id) => `${this.#ServerBaseURL}/aktivitaet/${id}`;
    #getAktivitaetbyProjektIDURL = (projekt_id) => `${this.#ServerBaseURL}/aktivitaet/${projekt_id}`;
    #updateAktivitaetURL = (id) => `${this.#ServerBaseURL}/aktivitaet/${id}`;
    #deleteAktivitaetURL = (id) => `${this.#ServerBaseURL}/aktivitaet/${id}`;

    #addBuchungURL = () => `${this.#ServerBaseURL}/buchung`;
    #getBuchungURL = () => `${this.#ServerBaseURL}/buchung`;
    #getBuchungbyIDURL = (id) => `${this.#ServerBaseURL}/buchung/${id}`;
    
    //#updateBuchungURL = (id) => `${this.#ServerBaseURL}/buchung/${id}`;
    #deleteBuchungURL = (id) => `${this.#ServerBaseURL}/buchung/${id}`;

    #addEreignisURL = () => `${this.#ServerBaseURL}/ereignis`;
    #getEreignisURL = () => `${this.#ServerBaseURL}/ereignis`;
    #getEreignisbyIDURL = (id) => `${this.#ServerBaseURL}/ereignis/${id}`;
    //#updateEreignisURL = (id) => `${this.#ServerBaseURL}/ereignis/${id}`;
    #deleteEreignisURL = (id) => `${this.#ServerBaseURL}/ereignis/${id}`;

    #addZeitintervallURL = () => `${this.#ServerBaseURL}/zeitintervall`;
    #getZeitintervallURL = (id) => `${this.#ServerBaseURL}/zeitintervall/${id}`;
    #updateZeitintervallURL = (id) => `${this.#ServerBaseURL}/zeitintervall/${id}`;
    #deleteZeitintervallURL = (id) => `${this.#ServerBaseURL}/zeitintervall/${id}`;

    #addArbeitszeitkontoURL = () => `${this.#ServerBaseURL}/arbeitszeitkonto`;
    #getArbeitszeitkontoURL = (id) => `${this.#ServerBaseURL}/arbeitszeitkonto/${id}`;
    #updateArbeitszeitkontoURL = (id) => `${this.#ServerBaseURL}/arbeitszeitkonto/${id}`;
    #deleteArbeitszeitkontoURL = (id) => `${this.#ServerBaseURL}/arbeitszeitkonto/${id}`;


    static getAPI() {
        if (this.#api == null) {
          this.#api = new TimetrackerAPI();
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
    


    getPersonbyID(personID) {
        // Person abfragen
        return this.#fetchAdvanced(this.#getPersonbyIDURL(personID)).then((responseJSON) => {
          let person = PersonBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(person)
          })
        })
      }


      getPerson() {
        // Person abfragen
        return this.#fetchAdvanced(this.#getPersonURL()).then((responseJSON) => {
          let person = PersonBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(person)
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
    
   /* addPersonGoogle(personID, googleid) {
        // Person einer GoogleID zuweisen
        return this.#fetchAdvanced(this.#addPersonGoogleURL(googleid), {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ 'personID': personID, 'googleid': googleid })
        })
      }*/
    
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
    
    deletePerson(id) {
        // Person löschen
        return this.#fetchAdvanced(this.#deletePersonURL(id), {
          method: 'DELETE',

        })
      }




    // getProjektbyID(projektID) {
    //     // Projekt abfragen
    //     return this.#fetchAdvanced(this.#getProjektURL()).then((responseJSON) => {
    //       let projekt = ProjektBO.fromJSON(responseJSON);
    //       return new Promise(function (resolve) {
    //         resolve(projekt)
    //       })
    //     })
    //   }

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
        // Projekt löschen
        return this.#fetchAdvanced(this.#deleteProjektURL(projektBO.getID()), {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(projektBO)
        })
      }

    


   /* link_person_profile(personID, projektID) {
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
      }*/

    



    getAktivitaetbyID(aktivitaetID) {
        // Aktivitaet abfragen
        return this.#fetchAdvanced(this.#getAktivitaetbyIDURL(aktivitaetID)).then((responseJSON) => {
          let aktivitaet = AktivitaetBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(aktivitaet)
          })
        })
      }


      getAktivitaetbyProjektID(projekt_id) {
        // Aktivitaet abfragen
        return this.#fetchAdvanced(this.#getAktivitaetbyProjektIDURL(projekt_id)).then((responseJSON) => {
          let aktivitaet = AktivitaetBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(aktivitaet)
          })
        })
      }

      getAktivitaet() {
        // Aktivitaet abfragen
        return this.#fetchAdvanced(this.#getAktivitaetURL()).then((responseJSON) => {
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

      getBuchung() {
        // Projekt abfragen
        console.log("Test")
        return this.#fetchAdvanced(this.#getBuchungURL()).then((responseJSON) => {
          let buchung = BuchungBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(buchung)
            console.log("Test 2", buchung)
          })
        })
      }

    // getBuchungbyID(buchungID) {
    //   // Buchung abfragen
    //   return this.#fetchAdvanced(this.#getBuchungbyIDURL(buchungID)).then((responseJSON) => {
    //     let buchung = BuchungBO.fromJSON(responseJSON);
    //     return new Promise(function (resolve) {
    //       resolve(buchung)
    //     })
    //   })
    // }
    
    addBuchung(buchungBO) {
      // Buchung neu anlegen
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

    
   /* updateBuchung(buchungBO) {
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
      } */

    deleteBuchung(BuchungBO) {
      // Buchung löschen
      return this.#fetchAdvanced(this.#deleteBuchungURL(BuchungBO.getID()), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(BuchungBO)
      })
    }
  
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

    
      /* updateEreignis(ereignisBO) {
        // Ereignis updaten
        return this.#fetchAdvanced(this.#updateEreignisURL(ereignisBO.getID()), {
          method: 'PUT',
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
      } */

    deleteEreignis(EreignisBO) {
      // Ereignis löschen
      return this.#fetchAdvanced(this.#deleteEreignisURL(EreignisBO.getID()), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(EreignisBO)
      })
    }

    getArbeitszeitkonto(arbeitszeitkontoID) {
      // Arbeitszeitkonto abfragen
      return this.#fetchAdvanced(this.#getArbeitszeitkontoURL(arbeitszeitkontoID)).then((responseJSON) => {
        let arbeitszeitkonto = ArbeitszeitkontoBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(arbeitszeitkonto)
        })
      })
    }
  
    addArbeitszeitkonto(arbeitszeitkontoBO) {
      // Arbeitszeitkonto neu anlegen
      return this.#fetchAdvanced(this.#addArbeitszeitkontoURL(), {
        method: 'POST',
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
      // Arbeitszeitkonto löschen
      return this.#fetchAdvanced(this.#deleteArbeitszeitkontoURL(arbeitszeitkontoBO.getID()), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(arbeitszeitkontoBO)
      })
    }

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
        let responseZeitintervallBO = zeitintervallBO.fromJSON(responseJSON);
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
        let responseZeitintervallBO = zeitintervallBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseZeitintervallBO);
        })
      })
    } 

    deleteZeitintervall(zeitintervallBO) {
      // Zeitintervall löschen
      return this.#fetchAdvanced(this.#deleteZeitintervallURL(zeitintervallBO.getID()), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(zeitintervallBO)
      })
    }

    

}