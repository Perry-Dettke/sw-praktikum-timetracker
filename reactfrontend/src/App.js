import React from 'react';
import './App.css';
import Header from './components/layout/Header';

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
        <header className="App-header">
          <p>
          TEST TIMETRACKER APP
          </p>
        </header>
      </div>
    );
  }
}

export default App;
