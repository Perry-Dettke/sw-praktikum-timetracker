import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import AktivitaetBO from '../../api/AktivitaetBO';
import TimetrackerAPI from '../../api/TimetrackerAPI';


class AktivitaetDialog extends Component {

    constructor(props) {
        super(props);
        
        //gebe einen leeren status
        this.state = {
        bezeichnung: null,
        kapazitaet: null,
        };
    }

    //Aktivität hinzufügen
    addAktivitaet = () => {
        let newAktivitaet = new AktivitaetBO()
        newAktivitaet.setID(0)
        newAktivitaet.setBezeichnung(this.state.bezeichnung)
        newAktivitaet.setKapazitaet(this.state.kapazitaet)
        newAktivitaet.setProjektID(this.props.projekt.getID())
        TimetrackerAPI.getAPI().addAktivitaet(newAktivitaet).then(aktivitaet => {
            this.props.onClose(aktivitaet); 
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
        const { show, projekt } = this.props
        const {bezeichnung, kapazitaet} = this.state

        let title = 'Neue Aktivität';

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
                                <b>{projekt.getBezeichnung()}</b>
                            </DialogContentText>
                            <div>
                                <TextField
                                    id="bezeichnung"
                                    label='Bezeichnung:'
                                    variant="outlined"
                                    size="small"
                                    value={bezeichnung}
                                    onChange={this.textFieldValueChange}
                                    autocomplete='off'

                                ></TextField>
                            </div>
                            <div>
                                {/* Kapazität auswählen */}
                                <TextField
                                    id="kapazitaet"
                                    label='Kapazität in Stunden:'
                                    variant="outlined"
                                    size="small"
                                    value={kapazitaet}
                                    onChange={this.textFieldValueChange}
                                    autocomplete='off'

                                ></TextField>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button color='secondary' onClick={this.handleClose}>
                                Abbrechen
                            </Button>
                            <Button variant='contained' color='primary'  onClick={this.addAktivitaet}>
                                Bestätigen
                            </Button>
                        </DialogActions>
                    </Dialog></div>
                : null
        );
    }
}


export default AktivitaetDialog;