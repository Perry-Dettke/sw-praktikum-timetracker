import React, { Component } from 'react';
import { Button, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import AktivitaetBO from '../../api/AktivitaetBO';
import TimetrackerAPI from '../../api/TimetrackerAPI';


class AktivitaetBearbeiten extends Component {

    constructor(props) {
        super(props);

        let bz = "", kap = "";
        if (props.aktivitaet) {
            bz = props.aktivitaet.getBezeichnung();
            kap = props.aktivitaet.getKapazitaet();
        }
        this.state = {
            bezeichnung: bz,
            kapazitaet: kap,
        };

        this.baseState = this.state;
    }

    //Aktivität bearbeiten
    updateAktivitaet = () => {
        let aktivitaet = this.props.aktivitaet;
        aktivitaet.setBezeichnung(this.state.bezeichnung)
        aktivitaet.setKapazitaet(this.state.kapazitaet)
        TimetrackerAPI.getAPI().updateAktivitaet(aktivitaet).then(aktivitaet => {
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
        const { show, projekt, aktivitaet } = this.props
        const { bezeichnung, kapazitaet } = this.state

        let title = 'Aktivität bearbeiten';

        return (
            show ?
                    <div>
                        <Dialog open={show} onClose={this.handleClose} maxWidth='xl'>
                            <DialogTitle id='form-dialog-title'>
                                {title}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <DialogContentText>
                                            <b>{projekt.getBezeichnung()}</b>
                                        </DialogContentText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Bezeichnung auswählen */}
                                        <TextField
                                            id="bezeichnung"
                                            label='Bezeichnung:'
                                            variant="outlined"
                                            size="medium"
                                            value={bezeichnung}
                                            defaultValue={aktivitaet.getBezeichnung()}
                                            onChange={this.textFieldValueChange}
                                            autocomplete='off'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Kapazität auswählen */}
                                        <TextField
                                            id="kapazitaet"
                                            label='Kapazität in Stunden:'
                                            variant="outlined"
                                            size="medium"
                                            value={kapazitaet}
                                            defaultValue={aktivitaet.getKapazitaet()}
                                            onChange={this.textFieldValueChange}
                                            autocomplete='off'
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button color='secondary' onClick={this.handleClose}>
                                    Abbrechen
                                </Button>
                                <Button variant='contained' color='primary' onClick={this.updateAktivitaet}>
                                    Bestätigen
                                </Button>
                            </DialogActions>
                        </Dialog></div>
                : null
        );
    }
}


export default AktivitaetBearbeiten;