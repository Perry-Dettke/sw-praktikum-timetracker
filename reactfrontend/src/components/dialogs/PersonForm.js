import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import TimetrackerAPI from "../../api/TimetrackerAPI";
import PersonBO from "../../api/PersonBO";

/**
 * In diesem Dialog wird ein Formular angezeigt, mit dem ein User sein Profil erstellen kann.
*/

class PersonForm extends Component {

    constructor(props) {
        super(props);

        let vn = "", nn = "", em = "", bn = "", ui = "";
        if (props.person) {
            vn = props.person.vor_name;
            nn = props.person.nach_name;
            em = props.person.email;
            bn = props.person.benutzer_name;
            ui = props.person.google_user_id;
        }
        this.state = {
            vor_name: vn,
            nach_name: nn,
            email: em,
            benutzer_name: bn,
            google_user_id: ui,
        };

        this.initialState = this.state;
    }

    //Wird mit dem onClick ausgeführt
    addPerson = () => {
        let newPerson = new PersonBO()
        newPerson.setID(0) // wird im Backend gesetzt
        newPerson.setVor_name(this.state.vor_name)
        newPerson.setNach_name(this.state.nach_name)
        newPerson.setEmail(this.state.email)
        newPerson.setBenutzer_name(this.state.benutzer_name)
        newPerson.setGoogle_user_id(this.props.currentUser.uid)
        TimetrackerAPI.getAPI().addPerson(newPerson).then(person => {
            this.setState(this.initialState);
            this.props.onClose(person); //Aufrufen parent in backend
        })
    }

    //Wird mit dem onClick ausgeführt
    updatePerson = () => {
        let person = this.props.person;
        person.setVor_name(this.state.vor_name)
        person.setNach_name(this.state.nach_name)
        person.setEmail(this.state.email)
        person.setBenutzer_name(this.state.benutzer_name)
        TimetrackerAPI.getAPI().updatePerson(person).then(person => {
            this.props.getPerson()
            this.setState(this.initialState);
            this.props.onClose(person); //Aufrufen parent in backend
        }).catch(e =>
            this.setState({
                updatingInProgress: false,
                updatingError: e
            })
        );
        // Ladeanimation einblenden
        this.setState({
            updatingInProgress: true,
            updatingError: null
        });
        this.props.onClose(person)
    }


    // Textfelder ändern
    textFieldValueChange = (event) => {
        const value = event.target.value;

        let error = false;
        if (value.trim().length === 0) {
            error = true;
        }

        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    //Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose(null);
    }

    render() {
        const { show, person, currentUser } = this.props;
        const { vor_name, nach_name, benutzer_name, email } = this.state;
        let title = '';
        let header = '';

        if (person) {
            // Projekt objekt true, somit ein edit
            title = `Person "${person.vor_name}" bearbeiten`;
            header = ' Person Bearbeiten';
        } else {
            title = 'Erstelle eine neue Person';
            header = 'Person einfügen';
        }

        return (
            show ?
                <Dialog open={show} onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle >{title}
                        <IconButton onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {header}
                        </DialogContentText>
                        <form noValidate autoComplete='off'>
                            <TextField autoFocus type='text' required fullWidth margin='normal' id='vor_name' label='Vorname:' value={vor_name} onChange={this.textFieldValueChange} />
                            <TextField autoFocus type='text' required fullWidth margin='normal' id='nach_name' label='Nachname:' value={nach_name} onChange={this.textFieldValueChange} />
                            <TextField autoFocus type='text' required fullWidth margin='normal' id='email' label='Email:' value={email} onChange={this.textFieldValueChange} />
                            <TextField autoFocus type='text' required fullWidth margin='normal' id='benutzer_name' label='Benutzername:' value={benutzer_name} onChange={this.textFieldValueChange} />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color='secondary' onClick={this.handleClose}>
                            Abbrechen
                        </Button>
                        {person ?
                            <Button variant='contained' color='primary' onClick={this.updatePerson}>
                                Speichern
                            </Button>
                            : <Button variant='contained' color='primary' onClick={this.addPerson}>
                                Anlegen
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
                : null
        );
    }
}


export default PersonForm;