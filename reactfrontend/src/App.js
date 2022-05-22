import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Home from './components/HomeSeite';
import Buchung from './components/pages/BuchungSeite';
import Projekt from './components/pages/ProjektSeite';
import Person from './components/pages/PersonSeite';
import PersonListe from './components/pages/PersonListe';
import ProjektListe from './components/pages/ProjektListe';
import BuchungListe from './components/pages/BuchungListe';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TimetrackerAPI from './api/TimetrackerAPI';


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
                <Route path={'/projekt'} element={<ProjektListe/>} />
                <Route path={'/person'} element={<PersonListe/>} />
                {/*<Route path={'/aktivitaet'} element={<Aktivitaet/>} />*/}
                <Route path={'/buchung'} element={<BuchungListe/>} />
                {/*<Route path={'/projekt_uebersicht'} element={<Projektuebersicht/>} />*/}
                {/*<Route path={'/personen_uebersicht'} element={<Personenuebersicht/>} />*/}

            </Routes> 
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
