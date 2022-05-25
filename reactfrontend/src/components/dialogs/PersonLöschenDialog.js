import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
//import { withStyles } from '@mui/styles';

import TimetrackerAPI from "../../api/TimetrackerAPI";

class PersonLöschenDialog extends Component {

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
    this.props.onClose(null);
  }

  deletePerson = () => {
    TimetrackerAPI.getAPI().deletePerson(this.state.person.id)
      .then(() => {
        this.props.getPerson();
        this.props.onClose(null);
      }).catch(e => {
        this.setState({
          showSnackbar: true
        })
      })
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
        <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={this.closeSnackbar}>
          <Alert onClose={this.closeSnackbar} severity="error">
            Diese Person kann nicht gelöscht werden
                </Alert>
        </Snackbar>
      </div>
    );
  }

}




export default PersonLöschenDialog;