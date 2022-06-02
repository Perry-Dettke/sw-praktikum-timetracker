import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Home from './components/pages/HomeSeite';
import PersonListe from './components/pages/PersonListe';
import ProjektListe from './components/pages/ProjektListe';
import BuchungListe from './components/pages/BuchungListe';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import TimetrackerAPI from './api/TimetrackerAPI';
//import Personen_uebersicht from './components/pages/PersonenÜbersicht';
import Buchung from './components/pages/xBuchungSeite';
import Projekt_uebersicht from './components/pages/ProjektÜbersicht';
import Auswertung from './components/pages/AuswertungListe';


class App extends React.Component {
  constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			currentUser: null,
			appError: null,
			authError: null,
			authLoading: false
		};
	}
  



  /** Renders the whole app */
  render(){
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Routes>
                <Route path={'/*'} element={<Home/>}/>
                <Route path={'/home'} element={<Home/>} />
                <Route path={'/projekt_uebersicht'} element={<Projekt_uebersicht/>} />
                <Route path={'/buchung'} element={<Buchung/>} />  
                <Route path={'/auswertung'} element={<Auswertung/>} />
                {/* <Route path={'/projekt'} element={<ProjektListe/>} /> */}
                <Route path={'/person'} element={<PersonListe/>} /> 
                {/* <Route path={'/personen_uebersicht'} element={<Personen_uebersicht/>} />            */}
            </Routes> 
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
