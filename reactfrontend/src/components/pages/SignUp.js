import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Button, withStyles } from '@material-ui/core';
import { TimetrackerAPI } from '../api';
import PersonForm from './dialogs/PersonForm';


class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: props.currentUser,
            person: null,
            profile: null,
            showPerson: false,
            showProfile: false,
        };
    }

    // PersonDialog anzeigen
    showPersonDialog = () => {
        this.setState({ showPerson: true });
    }

    // PersonDialog schließen
    closePersonDialog = person => {
        if (person) {
            TimetrackerAPI.getAPI().addPersonFirebase(person.getID(), this.state.currentUser.uid)
            this.setState({
                person: person,
                showPerson: false
            });
        } else {
            this.setState({ showPerson: false });
        }
    }

    // handle ProfileDialog
    showProfileDialog = () => {
        this.setState({ showProfile: true });
    }
    closeProfileDialog = profile => {
        if (profile) {
            this.setState({
                profile: profile,
                showProfile: false
            });
        } else {
            this.setState({ showProfile: false });
        }
    }

     // die Person mit ihrem Profil 'verknüpfen'
     link = () => {
        TimetrackerAPI.getAPI().link_person_profile(this.state.person.getID(), this.state.profile.getID()).then(response => {
            if (response == 'successfull') {
                // dem PersonBO noch die ProfileID zuweisen
                this.state.person.setProfileID(this.state.profile.getID())
                this.props.onClose(this.state.person)
            }
        })
    }

    render() {
        const { classes } = this.props;
        const { person, profile, showPerson, showProfile } = this.state;
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
                                    <Button variant='contained' color='primary' onClick={this.showPersonDialog}>
                                        Account erstellen
                                    </Button></div>
                                : <p>Personendaten erfolgreich gespeichert. (ID: {person.getID()})</p>}
                        </div>
                    </Paper>
                    <Paper variant='outlined' className={classes.root}>
                        <div className={classes.content}>
                            <Typography variant='h6'>
                                Lernprofil
                            </Typography>
                            {person
                                ? !profile
                                    ? <div><p>Du scheinst noch keine Lernvorlieben gespeichert zu haben.</p>
                                        <Button variant='contained' color='primary' onClick={this.showProfileDialog}>
                                            Lernprofil erstellen
                                        </Button></div>
                                    : <div>
                                        <p>Lernprofil erfolgreich gespeichert. (ID: {profile.getID()})</p>
                                    </div>
                                : null}
                        </div>
                    </Paper>
                    {person && profile
                        ? this.link()
                        : null}
                    <PersonForm show={showPerson} person={person} onClose={this.closePersonDialog} />
                    <ProfileForm show={showProfile} profile={profile} interests={interests} onClose={this.closeProfileDialog} />
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
    interests: PropTypes.array.isRequired,
}

export default withStyles(styles)(SignUp);
 
