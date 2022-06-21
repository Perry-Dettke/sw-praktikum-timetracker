import React, { Component } from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';


import TimetrackerAPI from "../../api/TimetrackerAPI";

class ZeitintervallLoeschen extends Component {

  constructor(props) {
    super(props);

    // Status initalisieren
    this.state = {
      zeitintervall: props.zeitintervall,
    };
  }

  handleClose = () => {
    this.props.onClose(null);
  }

  deleteZeitintervall = () => {
    TimetrackerAPI.getAPI().deleteZeitintervall(this.state.zeitintervall)
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
          <DialogTitle>{"Sind Sie sich sicher?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Wenn Sie die Buchung wirklich löschen möchten, drücken Sie auf "JA".
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Abbrechen
            </Button>
            <Button onClick={this.deleteZeitintervall} variant="contained" color="primary" autoFocus>
              Ja
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}




export default ZeitintervallLoeschen;