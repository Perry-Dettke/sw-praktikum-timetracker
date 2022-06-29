import React, { Component } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Box, Chip, Stack, InputLabel, FormControl, Select, MenuItem } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import TimetrackerAPI from '../../api/TimetrackerAPI';

/**
 * In diesem Dialog wird ein Formular angezeigt, mit dem der angemeldete User ein von ihm angelegtes Projekt bearbeiten kann.
*/

class ProjektBearbeiten extends Component {

    constructor(props) {
        super(props);

        let bz = "", ag = "", st = "", en = "";
        if (props.projekt) {
            bz = props.projekt.getBezeichnung();
            ag = props.projekt.getAuftraggeber();
            st = props.projekt.getStartzeitraum();
            en = props.projekt.getEndzeitraum();
        }
        this.state = {
            bezeichnung: bz,
            auftraggeber: ag,
            startzeitraum: st,
            endzeitraum: en,
            allePersonen: [],
            selectedPersonen: [],
        };

        this.baseState = this.state;
    }

    //Projekt bearbeiten
    updateProjekt = () => {
        let projekt = this.props.projekt;
        projekt.setBezeichnung(this.state.bezeichnung)
        projekt.setAuftraggeber(this.state.auftraggeber)
        projekt.setStartzeitraum(this.dateSplit(this.state.startzeitraum))
        projekt.setEndzeitraum(this.dateSplit(this.state.endzeitraum))
        TimetrackerAPI.getAPI().updateProjekt(projekt).then(projekt => {
            this.updatePersonInProjekt(projekt);
        })
    }

    getPersonen = () => {
        TimetrackerAPI.getAPI().getPerson().then((personenBOs) => {
            let allePersonen = []
            personenBOs.map(person => {
                if (person.getID() != this.props.currentPerson.getID()) {
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

    //Datum und Zeit vom Frontend wird das richtige Backend Format umgewandelt
    dateSplit = (date) => {
        let date2 = new Date(date)
        if (date2.toLocaleDateString().length === 9) {
            let newDate = date2.toLocaleDateString() + " " + date2.toLocaleTimeString()
            let dateliste = newDate.split('')
            let day = String(dateliste[0] + dateliste[1])
            let month = "0" + String(dateliste[3])
            let year = String(dateliste[5] + dateliste[6] + dateliste[7] + dateliste[8])
            return year + "-" + month + "-" + day
        }
        else {
            let newDate = date2.toLocaleDateString() + " " + date2.toLocaleTimeString()
            let dateliste = newDate.split('')
            let day = String(dateliste[0])
            let month = "0" + String(dateliste[2])
            let year = String(dateliste[4] + dateliste[5] + dateliste[6] + dateliste[7])
            return year + "-" + month + "-" + "0" + day
        }
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

    handleChangeStart = (e) => {
        this.setState({ startzeitraum: e });
    }

    handleChangeEnde = (e) => {
        this.setState({ endzeitraum: e });
    }

    // Dialog schließen
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    render() {
        const { show } = this.props
        const { bezeichnung, auftraggeber, startzeitraum, endzeitraum, allePersonen, selectedPersonen } = this.state

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
                                        <br />
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Stack spacing={3}>
                                                <DesktopDatePicker
                                                    label="Startzeitraum"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={startzeitraum}
                                                    onChange={this.handleChangeStart}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                        <br />
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Stack spacing={3}>
                                                <DesktopDatePicker
                                                    label="Endzeitraum"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={endzeitraum}
                                                    onChange={this.handleChangeEnde}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
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