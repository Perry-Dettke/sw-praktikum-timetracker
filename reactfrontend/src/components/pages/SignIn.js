import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Grid, Typography, withStyles, Paper, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';

/**
 * Render eine Seite für nicht eingeloggte Nutzer.
 * Dafür wird eine existierende Google Account Sign in Komponente verwendet.
 * Die Komponente nutzt eine Firebase für einen redirect.
 *
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 *
 */

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            vor_nameValidationFailed: false,
            vor_nameEdited: false,
            
        };
    }


    // rendert die  Komponente SignIn Seite
    render() {
        const {  vor_nameValidationFailed, vor_nameEdited } = this.state;
        const {classes} = this.props;

        return <div>
            <Paper>
                <Card>
                    <Typography  align='center' variant='h6'>Willkommen zum Time Tracker</Typography>
                    <Grid container justify='center'>
                        <Grid item>
                            
                            <form  autoComplete="on">
                                <TextField id="vor_name" label="Vorname" error={vor_nameValidationFailed}
                                           onChange={this.textFieldValueChange}/>
                            </form>
                            
                        </Grid>
                    </Grid>
                    <Typography  align='center'>Für die Nutzung der weiteren Funktionen müssen
                        Sie sich authentifizieren.</Typography>
                    <Grid container justify='center'>
                        <Grid item>
                            <Button style={{marginBottom: "2em"}} variant='contained' color='primary'
                                    onClick={this.handleSignInButtonClicked}
                                    disabled={ vor_nameValidationFailed || !vor_nameEdited }>
                                Anmelden
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Paper>
        </div>
    }
}




export default SignIn;