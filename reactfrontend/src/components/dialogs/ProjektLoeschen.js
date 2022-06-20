import React, { Component } from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';


import TimetrackerAPI from "../../api/TimetrackerAPI";

class ProjektLoeschen extends Component {

  constructor(props) {
    super(props);
  }

  handleClose = () => {
    this.props.onClose(null);
  }

  deleteProjekt = () => {
    TimetrackerAPI.getAPI().deleteProjekt(this.props.projekt)
      .then(() => {
        this.props.onClose(this.props.projekt);
      });
  }

  render() {

    const { show, projekt } = this.props;
    
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
              Das Projekt {projekt.getBezeichnung()} wirklich löschen?
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




export default ProjektLoeschen;