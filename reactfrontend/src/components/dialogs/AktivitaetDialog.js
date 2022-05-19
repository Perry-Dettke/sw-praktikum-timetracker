import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import AktivitaetBO from '../../api/AktivitaetBO';


class AktivitaetDialog extends Component {

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
                        <DialogTitle id='form-dialog-title'>Neue Aktivität
                            <IconButton onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <div>
                                {/* Projekt auswählen */}
                                <FormControl fullWidth>
                                    <InputLabel id="projekt">Projekt</InputLabel>
                                    <Select
                                    labelId="projekt"
                                    name="projekt"
                                    // value={this.state.projekt}
                                    size="medium"
                                    label="projekt"
                                    autoWidth
                                    onChange={this.handleChange}
                                    >
                                    <MenuItem value={1}>Projekt 1</MenuItem>
                                    <MenuItem value={2}>Projekt 2</MenuItem>
                                    <MenuItem value={3}>Projekt 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                {/* Aktivität auswählen */}
                                <FormControl fullWidth>
                                    <InputLabel id="aktivitaet">Aktivität</InputLabel>
                                    <Select
                                    labelId="aktivitaet"
                                    name="aktivitaet"
                                    // value={this.stateaktivitaet}
                                    size="medium"
                                    label="aktivitaet"
                                    autoWidth
                                    onChange={this.handleChange}
                                    >
                                    <MenuItem value={1}>Aktivität 1</MenuItem>
                                    <MenuItem value={2}>Aktivität 2</MenuItem>
                                    <MenuItem value={3}>Aktivität 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                            <TextField 
                                label='Soll-Stunden:'
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