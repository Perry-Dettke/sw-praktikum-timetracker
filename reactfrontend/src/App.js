import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Home from './components/HomeSeite';
import Buchung from './components/pages/BuchungSeite';
import Projekt from './components/pages/ProjektSeite';
import Person from './components/pages/PersonSeite';
import { BrowserRouter as Router, Route, Navigate, Routes, useLocation } from 'react-router-dom';
import TimetrackerAPI from './api/TimetrackerAPI';
import SignIn from './components/pages/SignIn';
import firebaseConfig from './firebaseconfig';
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import { Container, ThemeProvider, CssBaseline } from '@mui/material';
import Theme from './Theme';
import LoadingProgress from './components/dialogs/LoadingProgress';



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

  static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { appError: error };
  }

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


  componentDidMount() {
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
		const { currentUser, appError, authError, authLoading } = this.state;
		// console.log(currentUser)

		return (
			<ThemeProvider theme={Theme}>
				{/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Router>
					<Container maxWidth='md'>
						<Header user={currentUser} />
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
								<Route path={process.env.PUBLIC_URL + '/home'} element={<Secured user={currentUser}><Home /> </Secured>} />
								<Route path={process.env.PUBLIC_URL + '/projekt'} element={<Secured user={currentUser}><Projekt /></Secured>} />
								<Route path={process.env.PUBLIC_URL + '/person'} element={<Secured user={currentUser}> <Person /></Secured>} />
								<Route path={process.env.PUBLIC_URL + '/buchung'} element={<Secured user={currentUser}><Buchung/></Secured>} />
							</Route>
						</Routes>
						<LoadingProgress show={authLoading} />
						<ContextErrorMessage error={authError} contextErrorMsg={`Etwas ist falsch gelaufen.`} onReload={this.handleSignIn} />
						<ContextErrorMessage error={appError} contextErrorMsg={`Bitte laden sie die Seite neu.`} />
					</Container>
				</Router>
			</ThemeProvider>
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

	if (!props.user) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to={process.env.PUBLIC_URL + '/index.html'} state={{ from: location }} replace />;
	}

	return props.children;
}