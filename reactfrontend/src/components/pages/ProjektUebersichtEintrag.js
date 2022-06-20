import React, { Component } from 'react';

import { ListItem, Typography, IconButton, Grid, Tooltip, Divider, Accordion, AccordionSummary, AccordionDetails, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import ProjektBearbeiten from '../dialogs/ProjektBearbeiten';
import AktivitaetDialog from '../dialogs/AktivitaetDialog';
import AktivitaetBearbeiten from '../dialogs/AktivitaetBearbeiten';
import AktivitaetLoeschen from '../dialogs/AktivitaetLoeschen';
import TimetrackerAPI from '../../api/TimetrackerAPI';
import ProjektLoeschen from '../dialogs/ProjektLoeschen';



class ProjektUebersichtEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            aktivitaetliste: [],
            showAktivitaetDialog: false,
            showAktivitaetBearbeiten: false,
            showAktivitaetLoeschen: false,
            showProjektBearbeiten: false,
            showProjektLoeschen: false,
            currentAktivitaet: null,
            ersteller: null,
            personenliste: [],
        };
    }

    //Gibt Aktivitaet pro Projekt zurück
    getAktivitaetbyProjektID = () => {
        TimetrackerAPI.getAPI().getAktivitaetbyProjektID(this.props.projekt.getID()).then((aktivitaetBOs) => {
            this.setState({
                aktivitaetliste: aktivitaetBOs,
            });
        });
    }

    //Gibt Ersteller des Projekt zurück
    getErstellerbyID = () => {
        TimetrackerAPI.getAPI().getPersonbyID(this.props.projekt.getProjekterstellerID()).then((personBOs) => {
            this.setState({
                ersteller: personBOs,
            });
        });
    }

    //Gibt Teilnehmer des Projekt zurück
    getPersonInProjekt = () => {
        TimetrackerAPI.getAPI().getPersonInProjekt(this.props.projekt.getID()).then((personBOs) => {
            this.setState({
                personenliste: personBOs,
            });
        });
    }

    // Aktivitaet Dialog Button geklickt - Oeffnet den Aktivitaet hinzufuegen Dialog
    aktivitaetDialogButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showAktivitaetDialog: true,
        });
    }

    //AktivitaetDialog schließen
    aktivitaetDialogClosed = (aktivitaet) => {
        if (aktivitaet) {
            const newAktivitaetList = [...this.state.aktivitaetliste, aktivitaet];
            this.setState({
                aktivitaetliste: newAktivitaetList,
                showAktivitaetDialog: false
            });
        } else {
            this.setState({
                showAktivitaetDialog: false
            });
        }
    }


    //Wird aufgerufen, wenn der Aktivität Bearbeiten Button geklickt wird
    aktivitaetBearbeitenClicked = (aktivitaet) => {
        console.log(aktivitaet);
        this.setState({
            currentAktivitaet: aktivitaet,
        },
            this.toggleAktivitaetBearbeiten()
        );
    }

    //
    toggleAktivitaetBearbeiten = () => {
        this.setState({
            showAktivitaetBearbeiten: true,
        });
    }

    //Aktivität Bearbeiten Dialog schließen
    aktivitaetBearbeitenClosed = (aktivitaet) => {
        if (aktivitaet) {
            this.getAktivitaetbyProjektID();
            this.setState({
                showAktivitaetBearbeiten: false
            });
        } else {
            this.setState({
                showAktivitaetBearbeiten: false
            });
        }
    }


    //Wird aufgerufen, wenn der Aktivität Löschen Button geklickt wird
    aktivitaetLoeschenClicked = (aktivitaet) => {
        this.setState({
            currentAktivitaet: aktivitaet,
            showAktivitaetLoeschen: true,
        });
    }

    //Aktivität Löschen Dialog schließen
    aktivitaetLoeschenClosed = (aktivitaet) => {
        if (aktivitaet) {
            this.setState({
                showAktivitaetLoeschen: false,
            },
            () => this.getAktivitaetbyProjektID(),
            () => this.getErstellerbyID(),
            () => this.getPersonInProjekt()
            );
            
        } else {
            this.setState({
                showAktivitaetLoeschen: false
            });
        }
    }

    //Wird aufgerufen, wenn der Delete Projekt Button geklickt wird
    projektLoeschenClicked = () => {
        this.setState({
            showProjektLoeschen: !this.state.showProjektLoeschen
        });
    }

    //Projekt Löschen Dialog schließen
    projektLoeschenClosed = (projekt) => {
        if (projekt) {
            this.setState({
                showProjektLoeschen: false,
            },
            this.props.getProjekt()
            );
            
        } else {
            this.setState({
                showProjektLoeschen: false
            });
        }
    }


    //Wird aufgerufen, wenn der Projekt Bearbeiten Button geklickt wird
    projektBearbeitenClicked = (projekt) => {
        this.setState({
            showProjektBearbeiten: true,
        }
        );
    }

    //Projekt Bearbeiten Dialog schließen
    projektBearbeitenClosed = (projekt) => {
        if (projekt) {
            this.setState({
                showProjektBearbeiten: false
            },
            () => this.getPersonInProjekt()
            );
        } else {
            this.setState({
                showProjektBearbeiten: false
            });
        }
    }


    componentDidMount() {
        this.getAktivitaetbyProjektID();
        this.getErstellerbyID();
        this.getPersonInProjekt();
    }


    //Renders the component
    render() {
        const { projekt, person } = this.props;
        const { ersteller, showAktivitaetDialog, showAktivitaetBearbeiten, showAktivitaetLoeschen, showProjektBearbeiten, aktivitaetliste,
            showProjektLoeschen, currentAktivitaet, personenliste } = this.state;

        return (
            aktivitaetliste && personenliste ?
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
                                    <Typography><b>{projekt.getBezeichnung()}</b></Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{
                                    backgroundColor: "#eeeeee",
                                }}>
                                    {/*{person.getID() == projekt.getProjekterstellerID() ?*/}
                                    <div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <Button variant='outlined' startIcon={<EditIcon />} onClick={() => this.projektBearbeitenClicked(projekt)}>
                                                    <Typography>Projekt bearbeiten</Typography>
                                                </Button>
                                            </Grid>
                                            <br />
                                            <Grid item xs={3}>
                                                <Button variant='outlined' startIcon={<DeleteIcon />} onClick={() => this.projektLoeschenClicked(projekt)}>
                                                    <Typography>Projekt löschen</Typography>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    {/*: null}*/}
                                    <br />
                                    <Typography align='left'><b>Auftraggeber: </b>{projekt.getAuftraggeber()}<br /></Typography>
                                    {ersteller ?
                                        <Typography align='left'><b>Ersteller: </b>{ersteller.getVor_name()} {ersteller.getNach_name()}<br /></Typography>
                                        : null}
                                    <Typography align='left'><b>Teilnehmer: </b></Typography>
                                    <ul>
                                        {personenliste.map(person =>
                                            <Typography align='left'><li>{person.getVor_name()} {person.getNach_name()} </li></Typography>
                                        )}
                                    </ul><br />
                                    <Grid item xs={3}>
                                        <Button variant="contained" color="primary" aria-label="add" onClick={this.aktivitaetDialogButtonClicked} startIcon={<AddIcon />}>
                                            Aktivität hinzufügen</Button>
                                    </Grid>
                                    <br />
                                    <Table>
                                        <TableHead sx={{
                                            backgroundColor: '#dedede'
                                        }}>
                                            <TableRow>
                                                <TableCell>Aktivität</TableCell>
                                                <TableCell>Kapazität</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                aktivitaetliste.map(aktivitaet =>
                                                    <TableRow key={aktivitaet.getID()}>
                                                        <TableCell><Typography> {aktivitaet.getBezeichnung()}</Typography></TableCell>
                                                        <TableCell><Typography> {aktivitaet.getKapazitaet()}</Typography></TableCell>
                                                        <TableCell>
                                                            <Grid item>
                                                                <Tooltip title='Bearbeiten' placement="bottom">
                                                                    <IconButton variant='contained' onClick={() => this.aktivitaetBearbeitenClicked(aktivitaet)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title='Löschen' placement="bottom">
                                                                    <IconButton variant="contained" onClick={() => this.aktivitaetLoeschenClicked(aktivitaet)}><DeleteIcon /></IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                        </TableCell>

                                                    </TableRow>
                                                )}
                                        </TableBody>
                                    </Table>


                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                    <ProjektBearbeiten show={showProjektBearbeiten} projekt={projekt} onClose={this.projektBearbeitenClosed} />  {/*person={person}*/}
                    <ProjektLoeschen show={showProjektLoeschen} projekt={projekt} onClose={this.projektLoeschenClicked} />
                    <AktivitaetDialog show={showAktivitaetDialog} projekt={projekt} onClose={this.aktivitaetDialogClosed} />
                    {
                        currentAktivitaet ?
                            <AktivitaetBearbeiten show={showAktivitaetBearbeiten} projekt={projekt} aktivitaet={currentAktivitaet} onClose={this.aktivitaetBearbeitenClosed} />
                            : null
                    }
                    {
                        currentAktivitaet ?
                            <AktivitaetLoeschen show={showAktivitaetLoeschen} projekt={projekt} aktivitaet={currentAktivitaet} onClose={this.aktivitaetLoeschenClosed} />
                            : null
                    }

                </div >
                : null
        );
    }
}



export default ProjektUebersichtEintrag;


