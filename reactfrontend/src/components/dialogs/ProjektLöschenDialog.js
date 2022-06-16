import React, { Component } from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';


import TimetrackerAPI from "../../api/TimetrackerAPI";

class ProjektLöschenDialog extends Component {

  constructor(props) {
    super(props);

    // Status initalisieren
    this.state = {
      projekt: props.projekt,
    };
  }

  handleClose = () => {
    this.props.onClose(null);
  }

  deleteProjekt = () => {
    TimetrackerAPI.getAPI().deleteProjekt(this.state.projekt.id)
      .then(() => {
        this.props.getProjekt();
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
              Wenn Sie das Projekt wirklich löschen möchten, drücken Sie auf "JA".
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Abbrechen
            </Button>
            <Button onClick={this.deleteProjekt} variant="contained" color="primary" autoFocus>
              Ja
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}




export default ProjektLöschenDialog;