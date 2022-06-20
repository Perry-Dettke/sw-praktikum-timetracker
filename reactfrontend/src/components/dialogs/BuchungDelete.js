import React, { Component } from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';


import TimetrackerAPI from "../../api/TimetrackerAPI";

class BuchungDeleteDialog extends Component {

  constructor(props) {
    super(props);

    // Status initalisieren
    this.state = {
      buchung: props.buchung,
    };
  }

  handleClose = () => {
    this.props.onClose(null);
  }

  deleteBuchung = () => {
    TimetrackerAPI.getAPI().deleteBuchung(this.state.buchung)
      .then(() => {
          console.log("geklickt")
        this.props.onClose(null);
      });
  }

  render() {

    const { show } = this.props;
    
    return (
      <div>
        <Dialog
          open={show}
          onClose={this.handleClose}
          maxWidth='xs'
        >
          <DialogTitle>{"Bist du dir sicher?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Diese Buchung wirklich löschen?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Abbrechen
            </Button>
            <Button onClick={this.deleteBuchung} variant="contained" color="primary" autoFocus>
              Ja
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}


export default BuchungDeleteDialog;