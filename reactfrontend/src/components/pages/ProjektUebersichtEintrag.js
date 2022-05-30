import React, { Component } from 'react';

import { ListItem, Typography, IconButton, Grid, Tooltip, Divider, Accordion, AccordionSummary, AccordionDetails, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import ProjektAnlegen from '../dialogs/ProjektAnlegen';
import AktivitaetDialog from '../dialogs/AktivitaetDialog';
import TimetrackerAPI from '../../api/TimetrackerAPI';
import ProjektLöschenDialog from '../dialogs/ProjektLöschenDialog';
// import ProjektForm from '../dialogs/ProjektForm';



class ProjektUebersichtEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            aktivitaetliste: null,
            showAktivitaetAnlegen: false,
            showProjektAnlegen: false,
            showProjektLöschenDialog: false,
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

    // Aktivitaet Dialog Button geklickt - Oeffnet den Aktivitaet hinzufuegen Dialog
    aktivitaetDialogButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showAktivitaetAnlegen: true,
        });
    }

    //AktivitaetDialog schließen
    aktivitaetDialogClosed = (aktivitaetliste) => {
        this.getAktivitaetbyProjektID();
        if (aktivitaetliste) {
          const newAktivitaetList = [...this.state.aktivitaetliste, aktivitaetliste];
          this.setState({
            aktivitaetliste: newAktivitaetList,
            showAktivitaetAnlegen: false
          });
        } else {
          this.setState({
            showAktivitaetAnlegen: false
          });
        }
      }

    /*
    //Wird aufgerufen, wenn der Bearbeiten Button geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showProjektForm: true
        });
    }
   */

    //Wird aufgerufen, wenn der Delete Projekt Button geklickt wird
    deleteProjektButtonClicked =  () => { 
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
    }


    //Renders the component
    render() {
        const { projekt } = this.props;
        const { showAktivitaetAnlegen, showProjektAnlegen, aktivitaetliste, showProjektLöschenDialog} = this.state;
        console.log(aktivitaetliste);

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
                                    <Typography align='left'><u>Ersteller:</u> {/*projekt.ersteller*/} <br /><br /></Typography>
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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                aktivitaetliste.map(aktivitaet =>

                                                    <TableRow>
                                                        <TableCell><Typography> {aktivitaet.getBezeichnung()}</Typography></TableCell>
                                                        <TableCell><Typography> {aktivitaet.getKapazitaet()}</Typography></TableCell>
                                                        <TableCell>
                                                            <Grid item>
                                                                <Tooltip title='Bearbeiten' placement="bottom">
                                                                    <IconButton variant='contained' onClick={this.bearbeitenButtonClicked}>
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
                    <AktivitaetDialog show={showAktivitaetAnlegen} onClose={this.aktivitaetDialogClosed} />
                    <ProjektAnlegen show={showProjektAnlegen} onClose={this.projektAnlegenClosed} />
                    <ProjektLöschenDialog show={showProjektLöschenDialog} onClose={this.deleteProjektButtonClicked} />
                </div>
                : null
        );
    }
}



export default ProjektUebersichtEintrag;


