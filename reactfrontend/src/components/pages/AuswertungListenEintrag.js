import React, { Component } from 'react';

import { Typography, Button, IconButton, Grid, Tooltip, Accordion, AccordionSummary, AccordionDetails, Table, TableCell, TableHead, TableRow, TableBody } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import TimetrackerAPI from '../../api/TimetrackerAPI';
import { StayCurrentLandscapeTwoTone } from '@mui/icons-material';

class AuswertungListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            aktivitaetliste: [],
            buchungliste: [],
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


    getPersonbyAktivitaetID = () => {
        TimetrackerAPI.getAPI().getPersonbyAktivitaetID(this.props.aktivitaet.getID()).then((aktivitaetBOs) => {
            this.setState({
                aktivitaetliste: aktivitaetBOs,
            });
        });
    }



    

    // getBuchungbyAktivitaetID = () => {

    //     if (this.state.aktivitaetliste) {
    //         for (let i = 0; i < this.state.aktivitaetliste.length; i++) {
    //             let id = this.state.aktivitaetliste[i].getID()
    //             TimetrackerAPI.getAPI().getBuchungbyAktivitaetID(id).then((buchungBOs) => {
    //                 let stunden = 0
    //                 buchungBOs.map(buchungBO => {
    //                     stunden += buchungBO.getStunden()
    //                 })
    //                 this.state.aktivitaetliste[i].setStunden(stunden)
    //             });
    //         };
    //     };
    // }

    // getBuchungbyAktivitaetID = () => {
    //     this.timer = setTimeout(() => {
    //         if (this.state.aktivitaetliste) {
    //             var aktivitaetliste = this.state.aktivitaetliste
    //             for (let i = 0; i < aktivitaetliste.length; i++) {
    //                 let id = aktivitaetliste[i].getID()
    //                 TimetrackerAPI.getAPI().getBuchungbyAktivitaetID(id).then((stundenAPI) => {

    //                     this.setState({
    //                         stundenliste: [...this.state.stundenliste, stundenAPI]

    //                     });
    //                 })
    //             };
    //         };
    //     }
    //         , 1000);
    // }



    componentDidMount() {
        this.getAktivitaetbyProjektID();


    }


    //Renders the component
    render() {
        const { projekt } = this.props;
        const { aktivitaetliste, buchungliste } = this.state;
        // console.log("Akti", aktivitaetliste)
        console.log(buchungliste, "Test")



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
                                                        <TableCell><Typography> {aktivitaet.getStunden()}</Typography></TableCell>
                                                        <TableCell><Typography> {aktivitaet.getKapazitaet() - aktivitaet.getStunden()}</Typography></TableCell>
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