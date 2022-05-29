import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import AktivitaetBO from '../../api/AktivitaetBO';


class AktivitaetDialog extends Component {

    constructor(props) {
        super(props);

        this.baseState = this.state;
    }

    // Dialog schließen
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    render() {
        const { show, projekt } = this.props

        let title = 'Neue Aktivität';

        return (
            show ?
                <div>
                    <Dialog open={show} onClose={this.handleClose} maxWidth='xl'>
                        <DialogTitle id='form-dialog-title'>{title}
                            <IconButton onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            <b>{/*projekt.bezeichnung - wie geht das?*/}</b>
                        </DialogContentText>
                            <div>
                            <TextField 
                                label='Aktivität:'
                                variant="outlined"
                                size="small"
                                 // value={this.state.name}
                                onChange={this.handleChange}
                                autocomplete='off'              
                                        
                                ></TextField>
                            </div>
                            <div>
                                {/* Kapazität auswählen */}
                                <TextField 
                                label='Kapazität in Stunden:'
                                variant="outlined"
                                size="small"
                                 // value={this.state.name}
                                onChange={this.handleChange}
                                autocomplete='off'              
                                        
                                ></TextField>
                            </div>
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


export default AktivitaetDialog;