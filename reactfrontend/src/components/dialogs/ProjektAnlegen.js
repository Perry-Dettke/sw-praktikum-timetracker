import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';



class ProjektAnlegen extends Component {

    constructor(props) {
        super(props);

        let pn = "", ag = "";
        if (props.projekt) {
            console.log(props.projekt)
            pn = props.projekt.projektname;
            ag = props.projekt.auftraggeber;
        }
        this.state = {
            projektname : pn,
            auftraggeber : ag,
        };

        this.baseState = this.state;
    }

    //Dialog schließen
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    render() {
        const { show, projekt } = this.props

        console.log(this.handleClose);
        let title = 'Neues Projekt';

        return (
            show ?
                <div>
                    <Dialog open={show}  onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle>{title}
                        <IconButton  onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <TextField
                                    label="Projektname"
                                    variant="outlined"
                                    name="name"
                                    size="small"
                                    // value={this.state.name}
                                    onChange={this.handleChange}
                                    autocomplete='off'
                                />
                                <TextField
                                    label="Auftraggeber"
                                    variant="outlined"
                                    name="name"
                                    size="small"
                                    // value={this.state.name}
                                    onChange={this.handleChange}
                                    autocomplete='off'
                                />
                              
                            {/* Personen die im System hinterlegt sind anzeigen lassen und button (o.ä.) einfügen um weitere Personen einfügen zu können*/}
                            
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
                            {/* Auch hier wenn Aktivität ausgefüllt, dann neues Feld einfügen, um weitere Aktivitäten einzufügen
                                Kapazität pro Aktivität eintragen!*/}                            
                            <TextField
                                label="Aktivität"
                                variant="outlined"
                                name="name"
                                size="small"
                                // value={this.state.name}
                                onChange={this.handleChange}
                                autocomplete='off'
                            />
                            <TextField
                                label="Kapazitaet in Stunden"
                                variant="outlined"
                                name="name"
                                size="small"
                                // value={this.state.name}
                                onChange={this.handleChange}
                                autocomplete='off'
                            />
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
                    </Dialog>
                </div>
            : null
        );
    }
}


export default ProjektAnlegen;

