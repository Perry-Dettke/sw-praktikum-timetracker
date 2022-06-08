import React, { Component } from 'react';

import { Typography, Button, IconButton, Grid, Tooltip, Accordion, AccordionSummary, AccordionDetails, Table, TableCell, TableHead, TableRow, TableBody } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import TimetrackerAPI from '../../api/TimetrackerAPI';

class AuswertungListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
          aktivitaetliste: []
        };
    }

    //Gibt das aktuelle Projekt zurück
    getProjekt = () => {
        this.props.getProjekt();
    }

    //Gibt Aktivitaet pro Projekt zurück
    getAktivitaetbyProjektID = () => {
        TimetrackerAPI.getAPI().getAktivitaetbyProjektID(this.props.projekt.getID()).then((aktivitaetBOs) => {
            this.setState({
                aktivitaetliste: aktivitaetBOs,
            });
        });
    }




    componentDidMount () {
        this.getAktivitaetbyProjektID();
    }


    //Renders the component
    render() {
        const { projekt } = this.props;
        const { aktivitaetliste } = this.state;

        return (
            aktivitaetliste ?
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
                                    <Grid item xs={3}>
                                        <Button variant="contained" color="primary" aria-label="add" onClick={this.aktivitaetDialogButtonClicked} startIcon={<AccessTimeIcon />}>
                                            Zeitraum auswählen</Button>
                                    </Grid>
                                </Grid>

                                <Table>
                                    <TableHead sx={{
                                        backgroundColor: '#dedede'
                                    }}>
                                        <TableRow>
                                            <TableCell>Aktivität</TableCell>
                                            <TableCell>Kapazität</TableCell>
                                            <TableCell>Ist-Stunden</TableCell>
                                            <TableCell>Reststunden</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                                aktivitaetliste.map(aktivitaet =>
                                                    <TableRow key={aktivitaet.getID()}>
                                                        <TableCell><Typography> {aktivitaet.getBezeichnung()}</Typography></TableCell>
                                                        <TableCell><Typography> {aktivitaet.getKapazitaet()}</Typography></TableCell>
                                                        <TableCell><Typography> {aktivitaet.getBezeichnung()}</Typography></TableCell>
                                                        <TableCell><Typography> {aktivitaet.getKapazitaet()}</Typography></TableCell>

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



export default AuswertungListenEintrag;