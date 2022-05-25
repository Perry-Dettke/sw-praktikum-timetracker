import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles, Button, IconButton, Dialog, DialogContent, DialogContentText,
    DialogTitle, DialogActions, TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

import TimetrackerAPI from "../../api/TimetrackerAPI";
import PersonBO from "../../api/PersonBO";


class PersonForm extends Component {

    constructor(props) {
        super(props);

        let vn = "", nn = "", em = "", bn = "";
        if (props.person) {
            console.log(props.person)
            vn = props.person.vor_name;
            nn = props.person.nach_name;
            em = props.person.email;
            bn = props.person.benutzer_name;
        }
        this.state = {
            vor_name : vn,
            nach_name : nn,
            email : em,
            benutzer_name : bn,
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




    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }



    render() {
        const { classes, show, person } = this.props;
        const {vor_name, nach_name, benutzer_name, email } = this.state;

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

        console.log(person)

        return (
            show ?

                <Dialog open={show}  onClose={this.handleClose} maxWidth='xs' fullWidth>
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

                        <TextField autoFocus type='text' required fullWidth margin='normal' id='vor_name' label='Vorname:' value={vor_name} onChange={this.textFieldValueChange} />



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