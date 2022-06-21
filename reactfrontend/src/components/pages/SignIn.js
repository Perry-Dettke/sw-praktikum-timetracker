import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@mui/material';

/** 
 * Renders a landing page for users who are not signed in. Provides a sign in button 
 * for using an existing google account to sign in. The component uses firebase to 
 * do redirect based signin process.
 * 
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 * 
 */
class SignIn extends Component {

	/** 
	 * Handles the click event of the sign in button an calls the prop onSignIn handler
	 */
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}

	/** Renders the sign in page, if user objext is null */
	render() {
		return (
			<div>
				<Typography sx={{margin: 2}} align='center' variant='h6'>Willkommen zum Time Tracker</Typography>
				<Typography sx={{margin: 2}} align='center'>Es sieht so aus als wärs du noch nicht eingeloggt</Typography>
				<Typography sx={{margin: 2}} align='center'>Bitte melde dich mit deiner Email an.</Typography>
				<Grid container justifyContent='center'>
					<Grid item>
						<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Einloggen
						</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

/** PropTypes */
SignIn.propTypes = {
	/** 
	 * Handler function, which is called if the user wants to sign in.
	 */
	onSignIn: PropTypes.func.isRequired,
}

export default SignIn;