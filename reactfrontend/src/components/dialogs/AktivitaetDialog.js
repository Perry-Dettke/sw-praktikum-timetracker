import React, { Component } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Grid } from '@mui/material';

import AktivitaetBO from '../../api/AktivitaetBO';
import TimetrackerAPI from '../../api/TimetrackerAPI';

/*
* In diesem Dialog wird ein Formular angezeigt, mit dem Aktivitäten für ein Projekt angelegt werden können.
*/

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
        const { bezeichnung, kapazitaet } = this.state

        let title = 'Neue Aktivität';

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
                                        <Typography>
                                            <b>Projektname: </b>
                                            {projekt.getBezeichnung()}
                                        </Typography>
                                    </DialogContentText>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="bezeichnung"
                                        label='Bezeichnung:'
                                        variant="outlined"
                                        size="medium"
                                        value={bezeichnung}
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
                            <Button variant='contained' color='primary' onClick={this.addAktivitaet}>
                                Bestätigen
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                : null
        );
    }
}

export default AktivitaetDialog;