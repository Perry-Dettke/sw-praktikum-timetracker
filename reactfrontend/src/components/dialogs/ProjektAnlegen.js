import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, TextField, OutlinedInput, Box, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import TimetrackerAPI from '../../api/TimetrackerAPI';



class ProjektAnlegen extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            allePersonen: [],
            personen: [],
            personenCounter: 0,
            aktivitaetenCounter: 0,
            aktivitaeten: [],
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

    // weitere Person hinzufügen
    renderPersonenBranch = () => {
        const { allePersonen } = this.state
        return (
            <>
                <div>
                    <FormControl fullWidth>
                        <InputLabel id="person">Person</InputLabel>
                        <Select
                            labelId="Person"
                            name="person"
                            size="medium"
                            label="Person"
                            autoWidth
                            onChange={this.handleChange}
                        >

                            {allePersonen.map((person) => (
                                <MenuItem
                                    key={person.getID()}
                                    value={person.getVor_name()}
                                >
                                    {person.getVor_name()}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <br />
            </>
        )
    }

    renderPersonenBranches = () => {
        const { personenCounter } = this.state
        const result = []
        for (let i = 0; i <= personenCounter; i++) {
            result.push(this.renderPersonenBranch(i))
        }
        return result
    }

    appendPersonenDiv = () => {
        this.setState({
            personenCounter: this.state.personenCounter + 1,
            personen: [
                ...this.state.personen,
            ]
        })
    }

    // weitere Aktivität hinzufügen
    renderAktivitaetenBranch = () => {
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

    renderAktivitaetenBranches = () => {
        const { aktivitaetenCounter } = this.state
        const result = []
        for (let i = 0; i <= aktivitaetenCounter; i++) {
            result.push(this.renderAktivitaetenBranch(i))
        }
        return result
    }

    appendAktivitaetenDiv = () => {
        this.setState({
            aktivitaetenCounter: this.state.aktivitaetenCounter + 1,
            aktivitaeten: [
                ...this.state.aktivitaeten,
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
        const { show, projekt } = this.props
        const { allePersonen, aktivitaeten } = this.state

        let title = 'Neues Projekt';

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
                                        variant="outlined"
                                        name="name"
                                        size="small"
                                        // value={this.state.name}
                                        onChange={this.handleChange}
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
                                        // value={this.state.name}
                                        onChange={this.handleChange}
                                        autocomplete='off'
                                    />
                                </FormControl>
                                <br /><br />
                                {/* Personen die im System hinterlegt sind anzeigen lassen und button (o.ä.) einfügen um weitere Personen einfügen zu können*/}
                                {allePersonen ?
                                    <div>
                                        {this.renderPersonenBranches()}
                                        <Button
                                            sx={{
                                                marginLeft: 2,
                                                marginTop: 0.5,
                                                width: 500,
                                                height: 30,
                                                alignItems: 'center',
                                            }}
                                            variant="contained"
                                            className="addbranch"
                                            onClick={this.appendPersonenDiv}
                                        >
                                            <AddIcon />
                                            &emsp;
                                            <Typography>Weitere Person hinzufügen</Typography>
                                        </Button>
                                    </div>
                                    : null}
                                <br /><br />
                                {/* Auch hier wenn Aktivität ausgefüllt, dann neues Feld einfügen, um weitere Aktivitäten einzufügen
                                Kapazität pro Aktivität eintragen!*/}
                                <div>
                                    {this.renderAktivitaetenBranches()}
                                    <Button
                                        sx={{
                                            marginLeft: 2,
                                            marginTop: 0.5,
                                            width: 500,
                                            height: 30,
                                            alignItems: 'center',
                                        }}
                                        variant="contained"
                                        className="addbranch"
                                        onClick={this.appendAktivitaetenDiv}
                                    >
                                        <AddIcon />
                                        &emsp;
                                        <Typography>Weitere Aktivität hinzufügen</Typography>
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
