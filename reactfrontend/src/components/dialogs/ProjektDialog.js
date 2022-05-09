import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@material-ui/core/TextField';
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
                    <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
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
                                <FormControl sx={{ m: 0, minWidth: 900 }}>
                                    <InputLabel id="projektleiter">Projektleiter</InputLabel>
                                    <Select
                                    labelId="projektleiter"
                                    name="projektleiter"
                                    // value={this.state.projektleiter}
                                    size="small"
                                    label="projektleiter"
                                    autoWidth
                                    onChange={this.handleChange}
                                    >
                                    <MenuItem value={1}>Person 1</MenuItem>
                                    <MenuItem value={2}>Person 2</MenuItem>
                                    <MenuItem value={3}>Person 3</MenuItem>
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
