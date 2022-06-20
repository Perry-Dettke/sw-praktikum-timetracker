import React, { Component } from 'react';

import { Typography, TextField, Button, IconButton, Grid, Tooltip, Accordion, AccordionSummary, AccordionDetails, Table, TableCell, TableHead, TableRow, TableBody, List } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import TimetrackerAPI from '../../api/TimetrackerAPI';



class AuswertungListenEintragPerson extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            personliste: [],
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
        this.getPersonbyAktivitaetID(this.props.start, this.props.ende);
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
        const { start, ende} = this.props;
        const { personliste } = this.state;
        console.log(personliste)

        return (
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={12}>
                    <Typography> Personen, die bereits auf diese Aktivität gebucht haben: </Typography>
                </Grid>
                <Grid item xs={12}>
                    <List >
                        {
                            personliste.map(person =>
                                <TableRow>
                                    <TableCell> <PersonIcon/> </TableCell>
                                    <TableCell>{person.getVor_name()} {person.getNach_name()}  </TableCell>
                                    <TableCell>{person.getStunden()} Stunden</TableCell>
                                </TableRow>
                            )
                        }
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Um die Stunden der einzelnen Personen in dieser Aktivität in dem oben ausgewählten Zeitraum zu suchen bitte den folgenden Button drücken.</Typography>
                </Grid>
                <Grid item xs={4}>
                    <TextField autoFocus disabled type='text' required fullWidth margin='normal' id='start'  value={start} onChange={this.textFieldValueChange} />
                </Grid>
                <Grid item xs={4}>
                    <TextField autoFocus disabled type='text' required fullWidth margin='normal' id='ende' value={ende} onChange={this.textFieldValueChange} />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" aria-label="add" onClick={this.zeitraumClicked} startIcon={<AccessTimeIcon />} 
                        sx={{
                            height: 50,
                            width: 250,
                        }}>
                        Zeitraum suchen
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default AuswertungListenEintragPerson;