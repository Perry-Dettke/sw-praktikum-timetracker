import React, { Component } from 'react';

import { TextField, Button, IconButton, Grid, Tooltip, Accordion, AccordionSummary, AccordionDetails, Table, TableCell, TableHead, TableRow, TableBody, List } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimetrackerAPI from '../../api/TimetrackerAPI';



class AuswertungListenEintragPerson extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            personliste: [],
            start: null,
            ende: null,
        };
    }

    getPersonbyAktivitaetID = (start = "2000-01-01", ende = "3000-01-01") => {
        console.log(start, ende)
        TimetrackerAPI.getAPI().getPersonbyAktivitaetID(this.props.aktivitaet.getID(), start, ende).then((personBOs) => {
            console.log(start, ende, "START")
            console.log(personBOs)
            this.setState({
                personliste: personBOs
            })
        });
    }

    zeitraumClicked = () => {
        this.getPersonbyAktivitaetID(this.state.start, this.state.ende);
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
        this.getPersonbyAktivitaetID();

    }

    render() {
        const { } = this.props;
        const { personliste, start, ende } = this.state;
        console.log(personliste)


        return (
            <div>
                <Grid container spacing={4} alignItems="left">
 
                    <Grid item xs={12}>
                    <Grid item xs={3}>
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='start' label='Start: (yyyy-mm-dd)' value={start} onChange={this.textFieldValueChange} />
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='ende' label='Ende: (yyyy-mm-dd)' value={ende} onChange={this.textFieldValueChange} />
                            <Button variant="contained" color="primary" aria-label="add" onClick={this.zeitraumClicked} startIcon={<AccessTimeIcon />}>
                                Zeitraum auswählen</Button>
                        </Grid>
                        <List >
                            {
                                personliste.map(person =>
                                    <TableRow>
                                        <TableCell>{person.getVor_name()} {person.getNach_name()}  </TableCell>
                                        <TableCell>{person.getStunden()} Stunden</TableCell>
                                    </TableRow>
                                )
                            }
                        </List>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default AuswertungListenEintragPerson;