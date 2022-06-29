import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, TextField, Box, Chip, Stack, InputLabel, FormControl, Select, MenuItem } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import TimetrackerAPI from '../../api/TimetrackerAPI';
import ProjektBO from '../../api/ProjektBO';

/**
 * In diesem Dialog wird ein Formular angezeigt, mit dem der angemeldete User ein neues Projekt anlegen kann.
*/

class ProjektAnlegen extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            allePersonen: [],
            personen: [],
            projektBezeichnung: null,
            auftraggeber: null,
            startzeitraum: null,
            endzeitraum: null,
        };
    }

    // Fetches all PersonBOs from the backend
    getPersonen = () => {
        TimetrackerAPI.getAPI().getPerson().then((personenBOs) => {
            let allePersonen = []
            personenBOs.map(person => {
                if (person.getID() != this.props.currentPerson.getID()){
                    allePersonen.push(person)
                }
            })
            this.setState({
                allePersonen: allePersonen,
            });
        });
    }

    // Projekt hinzufügen
    addProjekt = () => {
        let newProjekt = new ProjektBO()
        newProjekt.setID(0)
        console.log(this.dateSplit(this.state.startzeitraum))
        console.log(this.dateSplit(this.state.endzeitraum))
        newProjekt.setBezeichnung(this.state.projektBezeichnung)
        newProjekt.setAuftraggeber(this.state.auftraggeber)
        newProjekt.setStartzeitraum(this.dateSplit(this.state.startzeitraum))
        newProjekt.setEndzeitraum(this.dateSplit(this.state.endzeitraum))
        newProjekt.setProjekterstellerID(this.props.currentPerson.getID())
        TimetrackerAPI.getAPI().addProjekt(newProjekt).then(projekt => {
            this.addPersonInProjekt(projekt)
        })
    }

    //Datum und Zeit vom Frontend wird das richtige Backend Format umgewandelt
    dateSplit = (date) => {
        if ( date.toLocaleDateString().length === 9){
        let newDate = date.toLocaleDateString() + " " + date.toLocaleTimeString()
        let dateliste = newDate.split('')
        let day = String(dateliste[0] + dateliste[1])
        let month = "0" + String(dateliste[3])
        let year = String(dateliste[5] + dateliste[6] + dateliste[7] + dateliste[8])
        return year + "-" + month + "-" + day
        }
        else{
            let newDate = date.toLocaleDateString() + " " + date.toLocaleTimeString()
            let dateliste = newDate.split('')
            let day = String(dateliste[0])
            let month = "0" + String(dateliste[2])
            let year = String(dateliste[4] + dateliste[5] + dateliste[6] + dateliste[7])
            return year + "-" + month + "-" + "0" + day 
        }
    }

    // Person in Projekt hinzufügen
    addPersonInProjekt = (projekt) => {
        TimetrackerAPI.getAPI().addPersonInProjekt(projekt.getID(), this.state.personen).then(projekt => {
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
                <br />
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

    handleChangeStart = (e) => {
        this.setState({ startzeitraum: e });
      }
    
      handleChangeEnde = (e) => {
        this.setState({ endzeitraum: e });
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
        const { allePersonen, personen, projektBezeichnung, auftraggeber, startzeitraum, endzeitraum } = this.state

        let title = 'Neues Projekt';
        let title2 = "Wähle den Startzeitpunkt und Endzeitpunkt für die Laufzeit deines Projekts."

        return (
            show ?
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
                                                {
                                                allePersonen.map((person) => (
                                                    <MenuItem
                                                        key={person.getID()}
                                                        value={person}
                                                    >
                                                        {person.getVor_name()} {person.getNach_name()}
                                                    </MenuItem>
                                                ))
                                                }
                                            </Select>
                                            <br></br>
                                            <DialogContentText>
                                                {title2}
                                            </DialogContentText>
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
                                            <br></br>
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
                                    : null}
                                <br />
                                <Typography>Die einzelnen Aktivitäten für ein Projekt können in der Projekt Übersicht angelegt werden, nachdem das Projekt erstellt wurde. </Typography>
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
