import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import TimetrackerAPI from "../../api/TimetrackerAPI";

class AktivitaetLoeschen extends Component {

    constructor(props) {
        super(props);
    }

    handleClose = () => {
        this.props.onClose(null);
    }

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
                    maxWidth='xs'
                >
                    <DialogTitle>{"Sind Sie sich sicher?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Wenn Sie die Aktivität {aktivitaet.getBezeichnung()} löschen möchten, drücken Sie auf "JA".
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