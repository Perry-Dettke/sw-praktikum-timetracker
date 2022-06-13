import React, { Component } from 'react';

import { Typography, Button, IconButton, Grid, Tooltip, Accordion, AccordionSummary, AccordionDetails, Table, TableCell, TableHead, TableRow, TableBody, List } from '@mui/material';
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
        console.log("Person")
        TimetrackerAPI.getAPI().getPersonbyAktivitaetID(this.props.aktivitaet.getID(), start, ende).then((personBOs) => {
            this.setState({
                personliste: personBOs
            })
        });
    }

    componentDidMount() {
        this.getPersonbyAktivitaetID();
    }

    render() {
        const { } = this.props;
        const { personliste } = this.state;
        console.log(personliste)


        return (
            <div>
                <Grid container spacing={4} alignItems="left">
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
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