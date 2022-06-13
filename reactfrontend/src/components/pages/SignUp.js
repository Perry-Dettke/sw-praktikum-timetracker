import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Button, withStyles } from '@material-ui/core';
import TimetrackerAPI from '../../api/TimetrackerAPI';
import PersonForm from './../dialogs/PersonForm';


class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: props.currentUser,
            person: null,
            showPersonForm: false,
        };
    }

    // PersonForm anzeigen
    showPersonForm = () => {
        this.setState({ showPersonForm: true });
    }

    // PersonForm schließen
    closePersonForm = person => {
        if (person) {
            TimetrackerAPI.getAPI().addPersonGoogle(person.getID(), this.state.currentUser.uid)
            this.setState({
                person: person,
                showPersonForm: false
            });
        } else {
            this.setState({ showPersonForm: false });
        }
    }

    





    render() {
        const { classes } = this.props;
        const { person, showPersonForm} = this.state;
        return (
            <div>
                { <div>
                    <Paper variant='outlined' className={classes.root}>
                        <div className={classes.content}>
                            <Typography variant='h6'>
                                Personendaten
                            </Typography>
                            {!person
                                ? <div><p>Du scheinst noch keine Informationen über dich angelegt zu haben.</p>
                                    <Button variant='contained' color='primary' onClick={this.showPersonForm}>
                                        Account erstellen
                                    </Button></div>
                                : <p>Personendaten erfolgreich gespeichert. (ID: {person.getID()})</p>}
                        </div>
                    </Paper>
                    <PersonForm show={showPersonForm} person={person} onClose={this.closePersonForm} />   
                </div>}
            </div>
        );
    }
}

const styles = (theme) => ({
    root: {
        width: '100%',
        margin: 10,
    },
    content: {
        width: '100%',
        margin: 10,
    },
});

SignUp.propTypes = {
    currentUser: PropTypes.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignUp);
 
