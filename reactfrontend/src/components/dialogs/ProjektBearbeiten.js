import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Box, Chip } from '@mui/material';
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
            console.log(props.projekt)
            bz = props.projekt.getBezeichnung();
            ag = props.projekt.getAuftraggeber();
        }
        this.state = {
            bezeichnung: bz,
            auftraggeber: ag,
        };

        this.baseState = this.state;
    }

    //Projekt bearbeiten
    updateProjekt = () => {
        let projekt = this.props.projekt;
        projekt.setBezeichnung(this.state.bezeichnung)
        projekt.setKapazitaet(this.state.auftraggeber)
        TimetrackerAPI.getAPI().updateProjekt(projekt).then(projekt => {
            this.props.onClose(projekt);
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

    // Dialog schließen
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    render() {
        const { show, projekt, allePersonen, personen } = this.props
        const { bezeichnung, auftraggeber } = this.state

        let title = 'Projekt bearbeiten';

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