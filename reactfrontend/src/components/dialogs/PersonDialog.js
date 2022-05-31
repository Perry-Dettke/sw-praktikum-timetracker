import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import PersonBO from '../../api/PersonBO';
import TimetrackerAPI from '../../api/TimetrackerAPI';


class PersonDialog extends Component {

    constructor(props) {
        super(props);
        
        //gebe einen leeren status
        this.state = {
        vor_name: null,
        nach_name: null,
        email: null,
        benutzer_name: null
        };
    }

    //Aktivität hinzufügen
    addPerson = () => {
        let newPerson = new PersonBO()
        newPerson.setID(0)
        newPerson.setVor_name(this.state.vor_name)
        newPerson.setNach_name(this.state.nach_name)
        newPerson.setEmail(this.state.email)
        newPerson.setBenutzer_name(this.state.benutzer_name)
        TimetrackerAPI.getAPI().addPerson(newPerson).then(person => {
            this.props.onClose(person); 
        })
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

    // Dialog schließen
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    render() {
        const { show } = this.props
        const {vor_name, nach_name, email, benutzer_name} = this.state

        let title = 'Neue Person erstellen';

        return (
            show ?
                <div>
                    <Dialog open={show} onClose={this.handleClose} maxWidth='xl'>
                        <DialogTitle id='form-dialog-title'>{title}
                            <IconButton onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <b>{/*projekt.bezeichnung - wie geht das?*/}</b>
                            </DialogContentText>
                            <div>
                                <TextField
                                    id="vor_name"
                                    label='Vorname:'
                                    variant="outlined"
                                    size="small"
                                    value={vor_name}
                                    onChange={this.textFieldValueChange}
                                    autocomplete='off'

                                ></TextField>
                            </div>
                            <div>
                                {/* Nachname auswählen */}
                                <TextField
                                    id="nach_name"
                                    label='Nachname:'
                                    variant="outlined"
                                    size="small"
                                    value={nach_name}
                                    onChange={this.textFieldValueChange}
                                    autocomplete='off'

                                ></TextField>
                                
                                <TextField
                                    id="email"
                                    label='Email:'
                                    variant="outlined"
                                    size="small"
                                    value={email}
                                    onChange={this.textFieldValueChange}
                                    autocomplete='off'

                                ></TextField>

                                <TextField
                                    id="benutzer_name"
                                    label='Benutzername:'
                                    variant="outlined"
                                    size="small"
                                    value={benutzer_name}
                                    onChange={this.textFieldValueChange}
                                    autocomplete='off'

                                ></TextField>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button color='secondary' onClick={this.handleClose}>
                                Abbrechen
                            </Button>
                            <Button variant='contained' color='primary'  onClick={this.addPerson}>
                                Bestätigen
                            </Button>
                        </DialogActions>
                    </Dialog></div>
                : null
        );
    }
}


export default PersonDialog;