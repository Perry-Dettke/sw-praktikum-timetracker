import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import { TableCell } from '@material-ui/core';
import TimetrackerAPI from "../../api/TimetrackerAPI";
import ProjektBO from '../../api/ProjektBO'


class BuchungDialog extends Component {

    constructor(props) {
        super(props);


        let bezeichnung=''
        if (props.projekt) {
            bezeichnung = props.projekt.getBezeichnung();
        }


        this.state = {
            bezeichnung: bezeichnung,
        }

    }

       

    textFieldValueChange = (event) => {
        const value = event.target.value;
        let error = false;
        if (value.trim().length === 0) {
              error = true;
            }
        
            this.setState({
              [event.target.id]: event.target.value,
            });
          }


        
    handleBezeichnungChange = (event) => {
        this.setState({ bezeichnung: event.target.value });
    }
          

    

    handletest = () => {
        console.log(this.state.bezeichnung)
    }


    // Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose();
    }

    render() {
        const { show, projekt } = this.props
        const { bezeichnung } = this.state
        return (
            show ?
                <div>
                    <Dialog open={show} onClose={this.handleClose} maxWidth='xl'>
                        <DialogTitle id='form-dialog-title'>Neue Buchung
                            <IconButton onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <div>
                                {/* Projekt auswählen */}
                                <FormControl sx={{ m: 0, minWidth: 500 }}>
                                    <InputLabel id="projekt">Projekt</InputLabel>
                                    <Select
                                    labelId="projekt"
                                    name="projekt"
                                    value={bezeichnung}
                                    size="medium"
                                    label="projekt"
                                    autoWidth
                                    onChange={this.handleChange}
                                    >
                                    </Select>
                                    



                                </FormControl>

                            </div>
                            <div>
                                {/* Aktivität auswählen */}
                                <FormControl sx={{ m: 0, minWidth: 500 }}>
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
                                <Button variant="outlined">Ereignis</Button>
                                <Button variant="outlined">Zeitintervall</Button>
                            </div>
                            {/* Buttons für Ereignis & Zeitintervall fehlen jeweils */}
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


export default BuchungDialog;