import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputLabel, FormControl, Select, MenuItem } from '@mui/material';

import TimetrackerAPI from "../../api/TimetrackerAPI";

/*
* In diesem Dialog wird ein Formular angezeigt, mit dem man die angelegten Projekt-Buchungen bearbeiten kann.
*/

class BuchungBearbeiten extends Component {

    constructor(props) {
        super(props);

        let st = "", ak = "", ai;
        if (props.aktivitaet) {
            ak = props.aktivitaet.bezeichnung
        }
        if (props.buchung) {
            st = props.buchung.stunden
        }
        if (props.aktivitaet) {
            ai = props.buchung.aktivitaet_id
        }
        this.state = {
            stunden: st,
            bezeichnung: ak,
            aktivitaet_id: ai,
        };

        this.initialState = this.state;
    }

    updateBuchung = () => {
        let buchung = this.props.buchung;
        buchung.setStunden(this.state.stunden)
        buchung.setAktivitaet_id(this.state.aktivitaet_id)
        TimetrackerAPI.getAPI().updateBuchung(buchung).then(buchung => {
            this.props.getBuchung()
            this.setState(this.initialState);
            this.props.onClose(buchung); //Aufrufen parent in backend
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
        this.props.onClose(buchung)
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

    handleChange = (e) => {
        this.setState({ aktivitaet_id: e.target.value });
    }


    // Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose();
    }

    render() {
        const { show, aktivitaet, aktivitaetliste } = this.props;
        const { stunden, aktivitaet_id } = this.state;

        return (
            show ?
                <Dialog open={show} onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle >
                        {"Buchung Bearbeiten"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Hier kannst du eine neue Stundenanzahl oder Aktivität angeben.
                        </DialogContentText>
                        <form noValidate autoComplete='off'>
                            <br />
                            {/* Textfeld für die Stunden */}
                            <TextField autoFocus type='text' required fullWidth size="large" margin='normal' id='stunden' label='Stunden:' value={stunden} onChange={this.textFieldValueChange} />
                            <br /><br />
                            {/* Dropdown für Aktivitaet */}
                            <FormControl fullWidth>
                                <InputLabel id='aktivitaet-label'>Aktivität</InputLabel>
                                <Select labelId='aktivitaet-label' id='aktivitaet' size="large" value={aktivitaet_id} defaultValue={aktivitaet.bezeichnung} onChange={this.handleChange}>
                                    {
                                        aktivitaetliste.map((aktivitaet) => {
                                            return (
                                                <MenuItem
                                                    value={aktivitaet.getID()}>
                                                    {aktivitaet.getBezeichnung()}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color='secondary' onClick={this.handleClose}>
                            Abbrechen
                        </Button>
                        <Button variant='contained' color='primary' onClick={this.updateBuchung}>
                            Speichern
                        </Button>
                    </DialogActions>
                </Dialog>
                : null
        );
    }
}


export default BuchungBearbeiten;