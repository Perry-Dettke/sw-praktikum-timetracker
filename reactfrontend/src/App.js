import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from './components/layout/Header';
import Home from './components/pages/HomeSeite';
import BuchungListe from './components/pages/BuchungListe';
import Projekt_uebersicht from './components/pages/ProjektÜbersicht';
import Auswertung from './components/pages/AuswertungListe';

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
                <Route path={'/projekt_uebersicht'} element={<Projekt_uebersicht/>} />
                <Route path={'/buchung'} element={<BuchungListe/>} />  
                <Route path={'/auswertung'} element={<Auswertung/>} />
            </Routes> 
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
