import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';






class ProjektDialog extends Component {

    constructor(props) {
        super(props);
    }

    // Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose();

    // Projekt hinzufügen
    // addProjekt = () => {



    // }
    }
    render() {
        const { show } = this.props

        return (
            show ?
                <div>
                    <Dialog open={show} onClose={this.handleClose} maxWidth='xl'>
                        <DialogTitle id='form-dialog-title'>Neues Projekt
                            <IconButton onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <div><TextField
                                                label="Projektname"
                                                variant="outlined"
                                                name="name"
                                                size="small"
                                                // value={this.state.name}
                                                onChange={this.handleChange}
                                                autocomplete='off'

                                ></TextField>
                                </div>
                                <div>
                                <FormControl fullWidth>
                                <InputLabel id="projektleiter">Projektleiter</InputLabel>
                                 <Select
                                    labelId="projektleiter"
                                    id="projektleiter"
                                    // value={projektleiter}
                                    label="Projektleiter"
                                    onChange={this.handleChange}
                                 >
                                    <MenuItem value={1}>Projektleiter 1</MenuItem>
                                    <MenuItem value={2}>Projektleiter 2</MenuItem>
                                    <MenuItem value={3}>Projektleiter 3</MenuItem>
                                </Select>
                                </FormControl>
                                </div>
                                <div><TextField
                                                label="Auftraggeber"
                                                variant="outlined"
                                                name="name"
                                                size="small"
                                                // value={this.state.name}
                                                onChange={this.handleChange}
                                                autocomplete='off'

                                ></TextField>
                                </div>
                              
                            <FormControl fullWidth>
                            <InputLabel id="person">Person</InputLabel>
                            <Select
                                labelId="person"
                                id="person"
                                // value={person}
                                label="Person"
                                onChange={this.handleChange}
                            >
                                <MenuItem value={1}>Person 1</MenuItem>
                                <MenuItem value={2}>Person 2</MenuItem>
                                <MenuItem value={3}>Person 3</MenuItem>
                            </Select>
                            </FormControl>

                            <FormControl fullWidth>
                            <InputLabel id="soll_Stunden">Soll Stunden</InputLabel>
                            <Select
                                labelId="soll_stunden"
                                id="soll_stunden"
                                // value={soll_stunden}
                                label="Soll Stunden"
                                onChange={this.handleChange}
                            >
                                <MenuItem value={1}>1 Stunde</MenuItem>
                                <MenuItem value={2}>2 Stunden</MenuItem>
                                <MenuItem value={3}>3 Stunden</MenuItem>
                            </Select>
                            </FormControl>
                            
                            <TextField
                                        label="Aktivität"
                                        variant="outlined"
                                        name="name"
                                        size="small"
                                        // value={this.state.name}
                                        onChange={this.handleChange}
                                        autocomplete='off'
                            ></TextField>

                            <FormControl fullWidth>
                            <InputLabel id="soll_Stunden">Soll Stunden</InputLabel>
                            <Select
                                labelId="soll_stunden"
                                id="soll_stunden"
                                // value={soll_stunden}
                                label="Soll Stunden"
                                onChange={this.handleChange}
                            >
                                <MenuItem value={1}>1 Stunde</MenuItem>
                                <MenuItem value={2}>2 Stunden</MenuItem>
                                <MenuItem value={3}>3 Stunden</MenuItem>
                            </Select>
                            </FormControl>
                        


                  
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


export default ProjektDialog;
