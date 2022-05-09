import 'date-fns';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';



class PersonDialog extends Component {

    constructor(props) {
        super(props);
    }

    // Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose();
    }

    render() {
        const { show } = this.props

        return (
            show ?
                <div>
                    <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
                        <DialogTitle id='form-dialog-title'>Neue Person anlegen
                            <IconButton onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Person erstellen
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color='secondary' onClick={this.handleClose}>
                                Abbrechen
                            </Button>
                            <Button variant='contained' color='primary'>
                                Bestätigen
                            </Button>
                        </DialogActions>
                    </Dialog></div>
                : null
        );
    }
}


export default PersonDialog;