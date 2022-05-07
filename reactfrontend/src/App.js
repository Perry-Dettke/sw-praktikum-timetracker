import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Home from './components/pages/HomeSeite';
import Buchung from './components/pages/BuchungSeite';
import Projekt from './components/pages/ProjektSeite';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


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
                <Route path={'/projekt'} element={<Projekt/>} />
                {/*<Route path={'/personen'} element={<Personen/>} />*/}
                {/*<Route path={'/aktivitaet'} element={<Aktivitaet/>} />*/}
                <Route path={'/buchung'} element={<Buchung/>} />
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
