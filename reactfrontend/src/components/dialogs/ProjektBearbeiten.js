import React, { Component } from 'react';
import { Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Box, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import ProjektBO from '../../api/AktivitaetBO';
import TimetrackerAPI from '../../api/TimetrackerAPI';


class ProjektBearbeiten extends Component {

    constructor(props) {
        super(props);

        let bz = "", ag = "";
        if (props.projekt) {
            bz = props.projekt.getBezeichnung();
            ag = props.projekt.getAuftraggeber();
        }
        this.state = {
            bezeichnung: bz,
            auftraggeber: ag,
            allePersonen: [],
            selectedPersonen: [],
        };

        this.baseState = this.state;
    }


    // TESTTT 
    
    //Projekt bearbeiten
    updateProjekt = () => {
        let projekt = this.props.projekt;
        projekt.setBezeichnung(this.state.bezeichnung)
        projekt.setAuftraggeber(this.state.auftraggeber)
        TimetrackerAPI.getAPI().updateProjekt(projekt).then(projekt => {
            this.updatePersonInProjekt(projekt);
        })
    }

    getPersonen = () => {
        TimetrackerAPI.getAPI().getPerson().then((personenBOs) => {
            let allePersonen = []
            personenBOs.map(person =>{
                if (person.getID() != 3){
                //if (person.getID() != this.props.person.getID()){
                    allePersonen.push(person)
                }
            })
            this.setState({
                allePersonen: allePersonen,
            });
        });
    }

    // Person in Projekt bearbeiten
    updatePersonInProjekt = (projekt) => {
        TimetrackerAPI.getAPI().updatePersonInProjekt(this.props.projekt.getID(), this.state.selectedPersonen).then(projekt => {
            this.props.onClose(projekt)
        })
    }

    // Textfelder ändern
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

    componentDidMount() {
        this.getPersonen();
    }

    // Multiselect ändern
    handleChange = (event) => {
        this.setState({
            selectedPersonen: event.target.value,
        });
    }

    // Dialog schließen
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    render() {
        const { show, projekt, personen } = this.props
        const { bezeichnung, auftraggeber, allePersonen, selectedPersonen } = this.state
        
        
        
        let title = 'Projekt bearbeiten';
        return (
            show && allePersonen ?
                <div>
                    <Dialog open={show} onClose={this.handleClose} maxWidth='sm' fullWidth>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Projektname"
                                        id="bezeichnung"
                                        variant="outlined"
                                        name="name"
                                        size="small"
                                        value={bezeichnung}
                                        onChange={this.textFieldValueChange}
                                        autocomplete='off'
                                    />
                                </FormControl>
                                <br /><br />
                                <FormControl fullWidth>
                                    <TextField
                                        label="Auftraggeber"
                                        id="auftraggeber"
                                        variant="outlined"
                                        name="name"
                                        size="small"
                                        value={auftraggeber}
                                        onChange={this.textFieldValueChange}
                                        autocomplete='off'
                                    />
                                </FormControl>
                                <br /><br />
                                <Typography>Füge alle Personen hinzu, die in dem Projekt teilnehmen sollen.</Typography>
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel id="person">Personen</InputLabel>
                                            <Select
                                                labelId="Person"
                                                name="person"
                                                multiple
                                                size="medium"
                                                label="Person"
                                                value={selectedPersonen}
                                                autoWidth
                                                onChange={this.handleChange}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value.getID()} label={`${value.getVor_name()} ${value.getNach_name()}`} />
                                                        ))}
                                                    </Box>
                                                )}
                                            >

                                                {allePersonen.map((person) => (
                                                    <MenuItem
                                                        key={person.getID()}
                                                        value={person}
                                                    >
                                                        {person.getVor_name()} {person.getNach_name()}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                
                                <br />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color='secondary' onClick={this.handleClose}>
                                Abbrechen
                            </Button>
                            <Button variant='contained' color='primary' onClick={this.updateProjekt}>
                                Bestätigen
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                : null
        );
    }
}

export default ProjektBearbeiten;