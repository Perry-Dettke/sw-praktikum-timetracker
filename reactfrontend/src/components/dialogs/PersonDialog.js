import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';



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
                    <Dialog open={show} onClose={this.handleClose} maxWidth='xl'>
                        <DialogTitle id='form-dialog-title'>Neue Person anlegen
                            <IconButton onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContent>
                            <div>
                            <TextField 
                                label='Vorname:'
                                variant="outlined"
                                size="medium"
                                 // value={this.state.name}
                                onChange={this.handleChange}
                                autocomplete='off'              
                                        
                                ></TextField>
                                </div>
                                <div>
                            <TextField 
                                label='Nachname:'
                                variant="outlined"
                                size="medium"
                                 // value={this.state.name}
                                onChange={this.handleChange}
                                autocomplete='off'              
                                        
                                ></TextField>
                                </div>
                                <div>
                            <TextField 
                                label='E-Mail:'
                                variant="outlined"
                                size="medium"
                                 // value={this.state.name}
                                onChange={this.handleChange}
                                autocomplete='off'              
                                        
                                ></TextField>
                                </div>
                                <div>
                            <TextField 
                                label='Benutzername:'
                                variant="outlined"
                                size="medium"
                                 // value={this.state.name}
                                onChange={this.handleChange}
                                autocomplete='off'              
                                        
                                ></TextField>
                                </div>
                            </DialogContent>
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