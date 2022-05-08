import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


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
                        <DialogTitle id='form-dialog-title'>Test
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