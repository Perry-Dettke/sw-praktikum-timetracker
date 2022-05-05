import 'date-fns';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { TeachingbeeAPI, PersonBO } from '../../api';


class BuchungDialog extends Component {

  constructor(props) {
    super(props);
  }

  // Dialog schließen
  handleClose = () => {
    this.setState(this.initialState);
    this.props.onClose();
  }

  render() {

    return (
      show ?
        <div>
          {this.props.children}
          <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
            <DialogTitle id='form-dialog-title'>{title}
              <IconButton className={classes.closeButton} onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                    {header}
                </DialogContentText>
              <form className={classes.root} noValidate autoComplete='off'>
                <TextField autoFocus type='text' required fullWidth margin='normal' id='fname' label='Vorname:' value={fname} onChange={this.textFieldValueChange} />
                <TextField type='text' required fullWidth margin='normal' id='lname' label='Nachname:' value={lname} onChange={this.textFieldValueChange} />
                <br />
                <br />
                <InputLabel id='gender-label'>Geschlecht</InputLabel>
                <Select labelId='gender-label' id='gender' value={gender} onChange={this.handleChange}>
                  <MenuItem value='weiblich'>weiblich</MenuItem>
                  <MenuItem value='männlich'>männlich</MenuItem>
                  <MenuItem value='divers'>divers</MenuItem>
                </Select>
                <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker disableToolbar required variant='inline' format='dd.MM.yyyy' margin='normal' id='birthdate' label='Geburtsdatum' value={birthdate} onChange={this.handleDateChange} />
                </MuiPickersUtilsProvider>

                <TextField type='text' required fullWidth margin='normal' id='semester' label='Semester:' value={semester} onChange={this.textFieldValueChange} />
              </form>
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={this.handleClose}>
                Abbrechen
              </Button>
              {person ?
                <Button variant='contained' color='primary' onClick={this.updatePerson}>
                  Speichern
                  </Button>
                : <Button variant='contained' color='primary' onClick={this.addPerson}>
                  Anlegen
                  </Button>
              }
            </DialogActions>
          </Dialog></div>
        : null
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

PersonForm.propTypes = {
  person: PropTypes.object,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default withStyles(styles)(PersonForm);