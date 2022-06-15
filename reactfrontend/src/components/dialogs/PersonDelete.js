import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
//import { withStyles } from '@mui/styles';

import TimetrackerAPI from "../../api/TimetrackerAPI";

class PersonDelete extends Component {

  constructor(props) {
    super(props);

    // Status initalisieren
    this.state = {
      person: props.person,
      showSnackbar: false,
    };
  }

  closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      showSnackbar: false
    });
  };


  handleClose = () => {
    console.log("Test")
    this.props.onClose(null);
  }

  deletePerson = () => {
    TimetrackerAPI.getAPI().deletePerson(this.state.person)
      .then(() => {
          console.log("geklickt")

        this.props.onClose(null);
      });
  }

  render() {

    const { show } = this.props;
    const { person, showSnackbar } = this.state;
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
              Wenn Sie die Person löschen möchten, drücken Sie auf "JA".
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