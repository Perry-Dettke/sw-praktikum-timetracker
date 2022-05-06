import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Buchung from './components/pages/BuchungSeite';

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
  
  render(){
    return (
      <div className="App">
        <Header />
        <Buchung/>
      </div>
    );
  }
}

export default App;
