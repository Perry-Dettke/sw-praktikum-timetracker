import AktivitaetBO from './AktivitaetBO'; //K
import ArbeitszeitkontoBO from './ArbeitszeitkontoBO'; //J
import BuchungBO from './BuchungBO'; //J
import EreignisBO from './EreignisBO'; //J
import PersonBO from './PersonBO'; //K
import PersonProjektBO from './PersonProjektBO'; //K
import ProjektBO from './ProjektBO'; //K
import ZeitintervallBO from './ZeitintervallBO'; //J 

export default class TeachingbeeAPI {

    #addBuchungURL = () => `${this.#ServerBaseURL}/buchung`;
    #getBuchungURL = (id) => `${this.#ServerBaseURL}/buchung/${id}`;
    //#updateBuchungURL = (id) => `${this.#ServerBaseURL}/buchung/${id}`;
    #deleteBuchungURL = (id) => `${this.#ServerBaseURL}/buchung/${id}`;

    #addEreignisURL = () => `${this.#ServerBaseURL}/ereignis`;
    #getEreignisURL = (id) => `${this.#ServerBaseURL}/ereignis/${id}`;
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

    getBuchung(buchungID) {
        // Buchung abfragen
        return this.#fetchAdvanced(this.#getBuchungURL(buchungID)).then((responseJSON) => {
          let buchung = BuchungBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(buchung)
          })
        })
      }
    
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
        return this.#fetchAdvanced(this.#deleteBuchungURL(buchungBO.getID()), {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(buchungBO)
        })
      }
    
      getEreignis(ereignisID) {
        // Ereignis abfragen
        return this.#fetchAdvanced(this.#getEreignisURL(ereignisID)).then((responseJSON) => {
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
        return this.#fetchAdvanced(this.#deleteEreignisURL(ereignisBO.getID()), {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(ereignisBO)
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