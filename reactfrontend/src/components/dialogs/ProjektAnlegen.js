import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, TextField, IconButton, OutlinedInput, Box, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';

import TimetrackerAPI from '../../api/TimetrackerAPI';
import ProjektBO from '../../api/ProjektBO';



class ProjektAnlegen extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            allePersonen: [],
            personen: [],
            projektBezeichnung: null,
            auftraggeber: null,
        };
    }

    // Fetches all PersonBOs from the backend
    getPersonen = () => {
        TimetrackerAPI.getAPI().getPerson().then((personenBOs) => {
            this.setState({
                allePersonen: personenBOs,
            });
        });
    }

    // Projekt hinzufügen
    addProjekt = () => {
        let newProjekt = new ProjektBO()
        newProjekt.setID(0)
        newProjekt.setBezeichnung(this.state.projektBezeichnung)
        newProjekt.setAuftraggeber(this.state.auftraggeber)
        newProjekt.setProjekterstellerID(3)
        //newProjekt.setProjekterstellerID(this.props.person.getID())
        TimetrackerAPI.getAPI().addProjekt(newProjekt).then(projekt => {
            this.addPersonInProjekt(projekt)
        })
    }

    // Person in Projekt hinzufügen
    addPersonInProjekt = (projekt) => {
        TimetrackerAPI.getAPI().addPersonInProjekt(projekt.getID(),this.state.personen).then(projekt => {
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

    // Multiselect ändern
    handleChange = (event) => {
        this.setState({
            personen: event.target.value,
        });
    }


    renderBranch = () => {
        const { values } = this.state
        return (
            <>
                <div>
                    <TextField
                        label="Aktivität"
                        variant="outlined"
                        name="name"
                        size="small" 
                        autocomplete='off'  
                    />
                    &emsp;
                    <TextField
                        label="Kapazität in Stunden"
                        variant="outlined"
                        multiline
                        name="name"
                        size="small"
                        autocomplete='off'
                    />
                    
                </div>
                <br/>
          </>
        )
    }

    renderBranches = () => {
        const { counter } = this.state
        const result = []
        for (let i = 0; i <= counter; i++) {
          result.push(this.renderBranch(i))
        }
        return result
    }  

    appendDiv = () => {
        this.setState({
          counter: this.state.counter + 1,
          values: [
            ...this.state.values,
          ]
        })
    }


    //Dialog schließen
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    componentDidMount() {
        this.getPersonen();
    }

    render() {
        const { show } = this.props
        const { allePersonen, personen, projektBezeichnung, auftraggeber } = this.state

        let title = 'Neues Projekt';

        return (
            show ?
                <div>
                    <Dialog open={show} onClose={this.handleClose} maxWidth='sm' fullWidth>
                        <DialogTitle>
                            {title}
                            <IconButton onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Projektname"
                                        id="projektBezeichnung"
                                        variant="outlined"
                                        name="name"
                                        size="small"
                                        value={projektBezeichnung}
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
                                {/* Personen die im System hinterlegt sind anzeigen lassen und mehrere zum Projekt hinzufügen*/}
                                {allePersonen ?
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel id="person">Personen</InputLabel>
                                            <Select
                                                labelId="Person"
                                                name="person"
                                                multiple
                                                size="medium"
                                                label="Person"
                                                value={personen}
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
                                    : null}
                                <br />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color='secondary' onClick={this.handleClose}>
                                Abbrechen
                            </Button>
                            <Button variant='contained' color='primary' onClick={this.addProjekt}>
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
