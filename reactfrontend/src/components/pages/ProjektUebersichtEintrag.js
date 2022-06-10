import React, { Component } from 'react';

import { ListItem, Typography, IconButton, Grid, Tooltip, Divider, Accordion, AccordionSummary, AccordionDetails, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import ProjektAnlegen from '../dialogs/ProjektAnlegen';
import AktivitaetDialog from '../dialogs/AktivitaetDialog';
import AktivitaetBearbeiten from '../dialogs/AktivitaetBearbeiten';
import TimetrackerAPI from '../../api/TimetrackerAPI';
import ProjektLöschenDialog from '../dialogs/ProjektLöschenDialog';



class ProjektUebersichtEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            aktivitaetliste: null,
            showAktivitaetDialog: false,
            showAktivitaetBearbeiten: false,
            showProjektAnlegen: false,
            showProjektLöschenDialog: false,
            currentAktivitaet: null,
            ersteller: null,
            mitglieder: [],
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


    //Wird aufgerufen, wenn der Delete Projekt Button geklickt wird
    deleteProjektButtonClicked = () => {
        this.setState({
            showProjektLöschenDialog: !this.state.showProjektLöschenDialog
        });
    }


    projektAnlegenClosed = (projekt) => {
        if (projekt) {
            this.setState({
                projekt: projekt,
                showProjektAnlegen: false
            });
        } else {
            this.setState({
                showProjektAnlegen: false
            });
        }
    }

    componentDidMount() {
        this.getAktivitaetbyProjektID();
        this.getErstellerbyID();
    }


    //Renders the component
    render() {
        const { projekt } = this.props;
        const { ersteller, showAktivitaetDialog, showAktivitaetBearbeiten, showProjektAnlegen, aktivitaetliste, showProjektLöschenDialog, currentAktivitaet } = this.state;
        console.log(currentAktivitaet);

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
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Button variant='outlined' startIcon={<EditIcon />} onClick={this.bearbeitenButtonClicked}>
                                                <Typography>Projekt bearbeiten</Typography>
                                            </Button>
                                        </Grid>
                                        <br />
                                        <Grid item xs={3}>
                                            <Button variant='outlined' startIcon={<DeleteIcon />} onClick={this.deleteProjektButtonClicked}>
                                                <Typography>Projekt löschen</Typography>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Typography align='left'><u>Auftraggeber:</u> {projekt.auftraggeber} <br /></Typography>
                                    {ersteller ?
                                    <Typography align='left'><u>Ersteller:</u> {ersteller.getVor_name()} {ersteller.getNach_name()}<br /></Typography>
                                    : null}
                                    <Typography align='left'>???? Personen die im Projekt mitarbeiten HIER anzeigen lassen ???? <br /><br /></Typography>
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
                                                                    <IconButton variant="contained" onClick={this.deleteButtonClicked}><DeleteIcon /></IconButton>
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
                    <AktivitaetDialog show={showAktivitaetDialog} projekt={projekt} onClose={this.aktivitaetDialogClosed} />
                    <ProjektAnlegen show={showProjektAnlegen} onClose={this.projektAnlegenClosed} />
                    <ProjektLöschenDialog show={showProjektLöschenDialog} onClose={this.deleteProjektButtonClicked} />
                    {
                        currentAktivitaet ?
                            <AktivitaetBearbeiten show={showAktivitaetBearbeiten} projekt={projekt} aktivitaet={currentAktivitaet} onClose={this.aktivitaetBearbeitenClosed} />
                            : null
                    }
                </div >
                : null
        );
    }
}



export default ProjektUebersichtEintrag;


