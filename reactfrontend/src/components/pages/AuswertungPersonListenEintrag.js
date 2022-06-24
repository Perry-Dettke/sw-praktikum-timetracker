import React, { Component } from 'react';

import { Typography, Button, IconButton, Grid, TextField, Accordion, AccordionSummary, AccordionDetails, Table, TableCell, TableHead, TableRow, TableBody, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimetrackerAPI from '../../api/TimetrackerAPI';
import { StayCurrentLandscapeTwoTone } from '@mui/icons-material';
import AuswertungListenEintragPerson from './AuswertungListenEintragPerson';

class AuswertungPersonListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            buchungliste: [],
            personliste: [],
            start: null,
            ende: null,
        };
    }

    //Gibt das aktuelle Projekt zurück
    getProjekt = () => {
        this.props.getProjekt();
    }

    //Gibt Person pro Projekt zurück 
    getPersonInProjektStunden = (start = "2000-01-01", ende = "3000-01-01") => {
        TimetrackerAPI.getAPI().getPersonInProjektStunden(this.props.projekt.getID(), start, ende).then((personBOs) => {
            this.setState({
                personenliste: personBOs,
            });
        });
    }

    zeitraumClicked = () => {
        this.getPersonInProjektStunden(this.state.start, this.state.ende);
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
        this.getPersonInProjektStunden();

    }


    //Renders the component
    render() {
        const { projekt } = this.props;
        const { personenliste, buchungliste, start, ende } = this.state;
        console.log(personenliste, "Test")



        return (
            personenliste ?
                <div>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} textAlign="center">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{
                                        backgroundColor: "#dedede",
                                    }}
                                >
                                    <Typography><b>{projekt.bezeichnung}</b></Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{
                                    backgroundColor: "#eeeeee",
                                }}>
                                    <Grid container alignItems="center" spacing={2}>
                                    <box item xs={3}>
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='start' label='Start: (yyyy-mm-dd)' value={start} onChange={this.textFieldValueChange} />
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='ende' label='Ende: (yyyy-mm-dd)' value={ende} onChange={this.textFieldValueChange} />
                            <Button variant="contained" color="primary" aria-label="add" onClick={this.zeitraumClicked} startIcon={<AccessTimeIcon />}>
                                Zeitraum auswählen</Button>
                        </box>
                                    </Grid>

                                    <Table>
                                        <TableHead sx={{
                                            backgroundColor: '#dedede'
                                        }}>
                                            <TableRow>
                                                <TableCell>Person</TableCell>
                                                <TableCell>Arbeitsleistung</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                personenliste.map((person, index ) =>
                                                    <TableRow key={`${person.getID() + index}`}>
                                                        <TableCell><Typography> {person.getVor_name()} {person.getNach_name()}</Typography></TableCell>
                                                        <TableCell><Typography> {person.getStunden()} Stunden</Typography></TableCell>
                                                        
                                                    </TableRow>
                                                )}

                                        </TableBody>
                                    </Table>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </div >
                : null
        );
    }
}



export default AuswertungPersonListenEintrag;



