import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, IconButton, Dialog, DialogContent, DialogContentText,DialogTitle, DialogActions, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import { withStyles } from '@mui/styles';


import TimetrackerAPI from "../../api/TimetrackerAPI";
import PersonBO from "../../api/PersonBO";


class PersonForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vor_name: '',
            vor_nameValidationFailed: false,
            vor_nameEdited: false,

            nach_name: null,
            nach_nameValidationFailed: false,
            nach_nameEdited: false,

            benutzer_name: null,
            benutzer_nameValidationFailed: false,
            benutzer_nameEdited: false,

            addingError: null,
            addingInProgress: false,

            updatingError: null,
            updatingInProgress: false
        };
        this.baseState = this.state;
    }

    addPerson = () => {
        let newPerson = new PersonBO()
        newPerson.setID(0)
        newPerson.setVor_name(this.state.vor_name)
        newPerson.setNach_name(this.state.nach_name)
        newPerson.setBenutzer_name(this.state.benutzer_name)
        TimetrackerAPI.getAPI().addPerson(newPerson).then(person => {
            this.props.getPerson()
            this.setState(this.baseState);
            this.props.onClose(personalbar); //Aufrufen parent in backend
        }).catch(e =>
            this.setState({
                addingInProgress: false,
                addingError: e
            })
        );
        // Ladeanimation einblenden
        this.setState({
            addingProgress: true,
            addingError: null
        });
    }

    updatePerson = () => {
        let person = this.props.person;
        person.setVor_name(this.state.vor_name)
        person.setNach_name(this.state.nach_name)
        person.setBenutzer_name(this.state.benutzer_name)
        TimetrackerAPI.getAPI().updatePerson(person).then(person => {
            this.props.getPerson()
            this.setState(this.baseState);
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
    }

    // Validierung der Textfeldaenderungen 
    textFieldValueChange = (event) => {
        const value = event.target.value;

        let error = false;
        if (value.trim().length === 0) {
            error = true;
        }
        this.setState({
            [event.target.id]: event.target.value,
            [event.target.id + 'ValidationFailed']: error,
            [event.target.id + 'Edited']: true
        });
    }

    numberValueChange = (event) => {
        const value = event.target.value;
        const re = /^[0-9]{1,10}$/;

        let error = false;
        if (value.trim().length === 0) {
            error = true;
        }
        if (re.test(event.target.value) === false) {
            error = true;
        }

        this.setState({
            [event.target.id]: event.target.value,
            [event.target.id + 'ValidationFailed']: error,
            [event.target.id + 'Edited']: true
        });
    }

    getInfos = () => {
        if (this.props.person) {
            let vor_name = this.props.person.getVor_name();
            let nach_name = this.props.person.getNach_name();
            let benutzer_name = this.props.person.getBenuter_name();
            this.setState({
                vor_name: vor_name,
                nach_name: nach_name,
                benutzer_name: benutzer_name,
            })
        }
    }


    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }



    render() {
        const { classes, show, person } = this.props;
        const {
            vor_name,
            vor_nameValidationFailed,
            vor_nameEdited,

            nach_name,
            nach_nameValidationFailed,
            nach_nameEdited,

            benutzer_name,
            benutzer_nameValidationFailed,
            benutzer_nameEdited,

            addingInProgress,
            addingError,
            updatingInProgress,
            updatingError, } = this.state;

        let title = '';
        let header = '';

        if (person) {
            // Projekt objekt true, somit ein edit
            title = `Person "${person.vor_name}" bearbeiten`;
            header = 'Neue Person Daten einfügen';
        } else {
            title = 'Erstelle eine neue Person';
            header = 'Person Daten einfügen';
        }


        return (
            show ?
                <Dialog open={show} onEnter={this.getInfos} onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle className={classes.dialogtitle}>{title}
                        <IconButton className={classes.closeButton} onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {header}
                        </DialogContentText>

                        <form className={classes.root} noValidate autoComplete='off'>

                            <TextField className={classes.textfield} autoFocus type='text' required fullWidth margin='small' id='vor_name' label='Vorname' variant="outlined" value={vor_name}
                                onChange={this.textFieldValueChange} error={vor_nameValidationFailed} />

                            <TextField className={classes.textfield} type='text' required fullWidth margin='small' id='nach_name' label='Nachname' variant="outlined" value={nach_name}
                                onChange={this.numberValueChange} error={nach_nameValidationFailed} />

                            <TextField className={classes.textfield} type='text' required fullWidth margin='small' id='benutzer_name' label='Benutzername' variant="outlined" value={benutzer_name}
                                onChange={this.numberValueChange} error={benutzer_nameValidationFailed} />

                        </form>
                        <LoadingProgress show={addingInProgress || updatingInProgress} />
                        {
                            // Show error message in dependency of Person prop
                            person ?
                                <ContextErrorMessage error={updatingError} contextErrorMsg={`The Person could not be updated.`} onReload={this.updatePerson} />
                                :
                                <ContextErrorMessage error={addingError} contextErrorMsg={`The Person could not be added.`} onReload={this.addPerson} />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>
                            Abbrechen
                        </Button>
                        {
                            // If a Projekt is given, show an update button, else an add button
                            person ?
                                <Button disabled={vor_nameValidationFailed || nach_nameValidationFailed || benutzer_nameValidationFailed} variant='contained' onClick={this.updatePerson} color='primary'>
                                    Speichern
                        </Button>
                                :
                                <Button disabled={vor_nameValidationFailed || !vor_nameEdited || nach_nameValidationFailed || !nach_nameEdited || benutzer_nameValidationFailed || !benutzer_nameEdited}
                                    variant='contained' onClick={this.addPerson} color='primary'>
                                    Hinzufügen
                        </Button>
                        }
                    </DialogActions>
                </Dialog>
                : null
        );
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    textfield: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
});

/** PropTypes */
PersonForm.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** If true, the form is rendered */
    show: PropTypes.bool.isRequired,
    /**  
     * Handler function which is called, when the dialog is closed.
     * Sends the edited or created projektBO's as parameter or null, if cancel was pressed.
     *  
     * Signature: onClose(ProjektBO's projekt);
     */
    onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(PersonForm);