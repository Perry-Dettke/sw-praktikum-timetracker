import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Navigate, Routes, useLocation } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@mui/material';
import Header from './components/layout/Header';
import Home from './components/pages/HomeSeite';
import BuchungListe from './components/pages/BuchungListe';
import Projekt_uebersicht from './components/pages/ProjektÜbersicht';
import Auswertung from './components/pages/AuswertungListe';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from './firebaseconfig';
import Theme from './components/layout/Theme';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import TimetrackerAPI from './api/TimetrackerAPI';


/**
 * The main bank administration app. It uses Googles firebase to log into the bank end. For routing the 
 * user to the respective pages, react-router-dom ist used.
 * 
 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
 * @see [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
 class App extends React.Component {

	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			currentUser: null,
			appError: null,
			authError: null,
			authLoading: false,
			currentPerson: null,
		};
	}

	/** 
	 * Create an error boundary for this app and recieve all errors from below the component tree.
	 * 
	 * @See See Reacts [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
		 */
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { appError: error };
	}

	/** 
	 * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
		 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
		 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
		 */
	handleSignIn = () => {
		this.setState({
			authLoading: true
		});

		const app = initializeApp(firebaseConfig);
		//const auth = getAuth(app);
		const auth = getAuth(app);
		const provider = new GoogleAuthProvider();

		auth.languageCode = 'en';
		signInWithRedirect(auth, provider);
	}

	getPerson = () => {
		this.timer = setTimeout(() => {
		TimetrackerAPI.getAPI().getPersonByGoogle(this.state.currentUser.uid).then((person) =>
			this.setState({
			  currentPerson: person,
			})
		  ).catch((e) =>
			this.setState({
			  person: null,
			})
		  );
		 } , 1000);
	  }; 

	/**
	 * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	 * Initializes the firebase SDK.
	 * 
	 * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
	 */
	componentDidMount() {
		this.getPerson();
		const app = initializeApp(firebaseConfig);
		const auth = getAuth(app);

		auth.languageCode = 'en';
		onAuthStateChanged(auth, (user) => {
			if (user) {
				this.setState({
					authLoading: true
				});
				// The user is signed in
				user.getIdToken().then(token => {
					// Add the token to the browser's cookies. The server will then be
					// able to verify the token against the API.
					// SECURITY NOTE: As cookies can easily be modified, only put the
					// token (which is verified server-side) in a cookie; do not add other
					// user information.
					document.cookie = `token=${token};path=/`;
					// console.log("Token is: " + document.cookie);

					// Set the user not before the token arrived 
					this.setState({
						currentUser: user,
						authError: null,
						authLoading: false
					});
				}).catch(e => {
					this.setState({
						authError: e,
						authLoading: false
					});
				});
			} else {
				// User has logged out, so clear the id token
				document.cookie = 'token=;path=/';

				// Set the logged out user to null
				this.setState({
					currentUser: null,
					authLoading: false
				});
			}
		});
	}

	/** Renders the whole app */
	render() {
		const { currentUser, appError, authError, authLoading, currentPerson } = this.state;
		console.log(currentPerson)
		return (
				<Router>
					<div className='App'>
						<Header currentUser={currentUser} />
						<div className='content'>
							<Routes>
								<Route path={process.env.PUBLIC_URL} >
									<Route path={process.env.PUBLIC_URL + '/'} element={
										// For some special cases we need to handle the root route
										// Redirect if the user is signed in
										currentUser ?
											<Navigate replace to={process.env.PUBLIC_URL + '/home'} />
											:
											<SignIn onSignIn={this.handleSignIn} />
									} />
									<Route path={process.env.PUBLIC_URL + '/*'} element={
										// Firebase redirects to index.html
										// Redirect if the user is signed in
										currentUser ?
											<Navigate replace to={process.env.PUBLIC_URL + '/home'} />
											:
											<SignIn onSignIn={this.handleSignIn} />
											
									} />
									<Route path={process.env.PUBLIC_URL + '/home'} element={<Home  currentUser={currentUser} /> }/>
									<Route path={process.env.PUBLIC_URL + '/projekt_uebersicht'} element={<Projekt_uebersicht  currentPerson={currentPerson} /> }/>
									<Route path={process.env.PUBLIC_URL + '/buchung'} element={<BuchungListe  currentPerson={currentPerson} /> }/>
									<Route path={process.env.PUBLIC_URL + '/auswertung'} element={<Auswertung  currentPerson={currentPerson} /> }/>
								</Route>
							</Routes>
							<LoadingProgress show={authLoading} />
							<ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sign in process.`} onReload={this.handleSignIn} />
							<ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
						</div>
					</div>
					
				</Router>
			);
		}
	}

export default App;


/**
 * Helper Component to wrap other Components, which shall only be accessed by a logged in user.
 * 
 * @param {props} The React props 
 * @returns 
 */
function Secured(props) {
	let location = useLocation();

	if (!props.currentUser) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to={process.env.PUBLIC_URL + '/index.html'} state={{ from: location }} replace />;
	}

	return props.children;
}
