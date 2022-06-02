import React, { Component } from 'react';

import { Typography, Button, IconButton, Grid, Tooltip, Accordion, AccordionSummary, AccordionDetails, Table, TableCell, TableHead, TableRow, TableBody } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';



class AuswertungListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            showAuswertungDialog: false,
        };
    }

    //Gibt das aktuelle Projekt zurück
    getProjekt = () => {
        this.props.getProjekt();
    }


    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    auswertungDialogClosed = (projekt) => {
        if (projekt) {
            this.setState({
                projekt: projekt,
                showAuswertungDialog: false
            });
        } else {
            this.setState({
                showAuswertungDialog: false
            });
        }
    }


    //Renders the component
    render() {
        const { projekt } = this.props;
        const { } = this.state;

        return (
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
                                <br />
                                <Table>
                                    <TableHead sx={{
                                        backgroundColor: '#dedede'
                                    }}>
                                        <TableRow>
                                            <TableCell>Person</TableCell>
                                            <TableCell>Aktivität</TableCell>
                                            <TableCell>Arbeitsleistung</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><Typography> Vorname Nachname</Typography></TableCell>
                                            <TableCell><Typography> Aktivitätsbezeichnung</Typography></TableCell>
                                            <TableCell><Typography> Stundenanzahl</Typography></TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <br />
                                <Table>
                                    <TableHead sx={{
                                        backgroundColor: '#dedede'
                                    }}>
                                        <TableRow>
                                            <TableCell>Aktivität</TableCell>
                                            <TableCell>Kapazität</TableCell>
                                            <TableCell>Ist-Stunden</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><Typography> Aktivitätsbezeichnung</Typography></TableCell>
                                            <TableCell><Typography> in Stunden</Typography></TableCell>
                                            <TableCell><Typography> Gesamtstunden aller Personen für die Aktivität</Typography></TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>

                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>

            </div >
        );
    }
}



export default AuswertungListenEintrag;