import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import TimetrackerAPI from "../../api/TimetrackerAPI";

/*
* In diesem Dialog wird ein Formular angezeigt, mit dem die angelegten Aktivitäten gelöscht werden können.
*/

class AktivitaetLoeschen extends Component {

    constructor(props) {
        super(props);
    }

    handleClose = () => {
        this.props.onClose(null);
    }

    //Aktivität löschen
    deleteAktivitaet = () => {
        TimetrackerAPI.getAPI().deleteAktivitaet(this.props.aktivitaet)
            .then(() => {
                this.props.onClose(this.props.aktivitaet);
            });
    }

    render() {
        const { show, aktivitaet } = this.props;

        return (
            <div>
                <Dialog
                    open={show}
                    onClose={this.handleClose}
                    maxWidth='s'
                >
                    <DialogTitle>{"Bist du dir sicher?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Die Aktivität {aktivitaet.getBezeichnung()} wirklich löschen?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Abbrechen
                        </Button>
                        <Button onClick={this.deleteAktivitaet} color="primary" autoFocus>
                            Ja
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AktivitaetLoeschen;