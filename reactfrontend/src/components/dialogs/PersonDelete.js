import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import TimetrackerAPI from "../../api/TimetrackerAPI";

/**
 * In diesem Dialog wird ein Formular angezeigt, mit dem der angemeldete User sein Profil löschen kann.
*/

class PersonDelete extends Component {

  constructor(props) {
    super(props);

    // Status initalisieren
    this.state = {
      person: props.person,
    };
  }

  // Dialog schließen
  handleClose = () => {
    this.props.onClose();
    this.props.getPersonbyID();
  }

  // Person löschen
  deletePerson = () => {
    TimetrackerAPI.getAPI().deletePerson(this.state.person)
      .then(() => {
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
              Wenn du das Profil wirklich löschen möchtest, drücke auf "JA".
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Abbrechen
            </Button>
            <Button onClick={this.deletePerson} color="primary" autoFocus>
              Ja
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default PersonDelete;