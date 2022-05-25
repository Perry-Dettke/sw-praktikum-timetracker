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
                            <TextField 
                                label='Projekt:'
                                variant="outlined"
                                size="small"
                                 // value={this.state.name}
                                onChange={this.handleChange}
                                autocomplete='off'              
                                        
                                ></TextField>
                            </div>
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
                                <FormControl fullWidth>
                                    <InputLabel id="kapazitaet">Kapazität</InputLabel>
                                    <Select
                                    labelId="kapazitaet"
                                    name="kapazitaet"
                                    // value={this.state.projekt}
                                    size="medium"
                                    label="kapazitaet"
                                    autoWidth
                                    onChange={this.handleChange}
                                    >
                                    <MenuItem value={1}>0,5 Stunden</MenuItem>
                                    <MenuItem value={2}>1,0 Stunde</MenuItem>
                                    <MenuItem value={3}>1,5 Stunden</MenuItem>
                                    <MenuItem value={1}>2,0 Stunden</MenuItem>
                                    <MenuItem value={2}>2,5 Stunde</MenuItem>
                                    <MenuItem value={3}>3,0 Stunden</MenuItem>
                                    <MenuItem value={3}>3,5 Stunden</MenuItem>
                                    <MenuItem value={1}>4,0 Stunden</MenuItem>
                                    <MenuItem value={2}>4,5 Stunde</MenuItem>
                                    <MenuItem value={3}>5,0 Stunden</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                            <TextField type='text' id='aktivitaet' label='Soll-Stunden:' />
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