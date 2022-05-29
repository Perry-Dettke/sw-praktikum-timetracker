import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



class ProjektAnlegen extends Component {

    constructor(props) {
        super(props);

        this.baseState = this.state;
    }

    //Dialog schließen
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    render() {
        const { show, projekt } = this.props

        let title = 'Neues Projekt';

        return (
            show ?
                <div>
                    <Dialog open={show}  onClose={this.handleClose} maxWidth='sm' fullWidth>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Projektname"
                                        variant="outlined"
                                        name="name"
                                        size="small"
                                        // value={this.state.name}
                                        onChange={this.handleChange}
                                        autocomplete='off'
                                    />
                                </FormControl>
                                <br/><br/>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Auftraggeber"
                                        variant="outlined"
                                        name="name"
                                        size="small"
                                        // value={this.state.name}
                                        onChange={this.handleChange}
                                        autocomplete='off'
                                    />
                                </FormControl>
                                <br/><br/>
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
                            <br/><br/>
                            {/* Auch hier wenn Aktivität ausgefüllt, dann neues Feld einfügen, um weitere Aktivitäten einzufügen
                                Kapazität pro Aktivität eintragen!*/}                            
                            <div>
                                <TextField
                                    label="Aktivität"
                                    variant="outlined"
                                    name="name"
                                    size="small"
                                    // value={this.state.name}
                                    onChange={this.handleChange}
                                    autocomplete='off'
                                />
                                &emsp;
                                <TextField
                                    label="Kapazität in Stunden"
                                    variant="outlined"
                                    multiline
                                    name="name"
                                    size="small"
                                    // value={this.state.name}
                                    onChange={this.handleChange}
                                    autocomplete='off'
                                />
                                <Button
                                sx={{
                                marginLeft: 2,
                                marginTop: 0.5,
                                width: 25,
                                height: 30,
                                alignItems: 'center',
                                }}   variant="contained" /*onClick={}*/>
                                    <AddIcon /> 
                                </Button>
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
                    </Dialog>
                </div>
            : null
        );
    }
}


export default ProjektAnlegen;
