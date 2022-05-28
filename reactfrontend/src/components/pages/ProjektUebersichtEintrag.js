import React, {Component} from 'react';

import {ListItem, Typography, IconButton, Grid, Tooltip, Divider, Accordion, AccordionSummary, AccordionDetails, Table, TableHead, TableBody, TableRow, TableCell, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ProjektAnlegen from '../dialogs/ProjektAnlegen';

// import ProjektLöschenDialog from '../dialogs/ProjektLöschenDialog';
// import ProjektForm from '../dialogs/ProjektForm';



class ProjektUebersichtEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            showProjektAnlegen: false,
        };
    }

    //Gibt Projekt zurück
    getProjekt = () => {
        this.props.getProjekt();
    }
    
    //Gibt Aktivitaet pro Projekt zurück
    getAktivitaetbyProjektID = () => {
        this.props.getAktivitaetbyProjektID();
    }


    /*
    //Wird aufgerufen, wenn der Bearbeiten Button geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showProjektForm: true
        });
    }

    //Wird aufgerufen, wenn der Delete Button geklickt wird
    deleteButtonClicked =  event => {
        event.stopPropagation();
        this.setState({
          showProjektDelete: true
        });
      }
    */

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


    //Renders the component
    render() {
        const {projekt, aktivitaet} = this.props;
        const {showProjektAnlegen} = this.state;

        return (
            projekt ?
            <div>
                <Grid container spacing={4}  alignItems="center">
                    <Grid item xs={12} textAlign="center">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header" sx={{
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
                                        <Button variant='outlined' startIcon={<EditIcon/>} onClick={this.bearbeitenButtonClicked}>
                                            <Typography>Projekt bearbeiten</Typography>
                                        </Button>
                                    </Grid>
                                    <br/>
                                    <Grid item xs={3}>
                                        <Button variant='outlined' startIcon={<DeleteIcon/>} onClick={this.bearbeitenButtonClicked}>
                                            <Typography>Projekt löschen</Typography>
                                        </Button>
                                    </Grid>
                                </Grid> 
                                <br/>
                                <Typography align='left'><u>Auftraggeber:</u> {projekt.auftraggeber} <br/></Typography>
                                <Typography align='left'><u>Ersteller:</u> {/*projekt.ersteller*/} <br/><br/></Typography>
                                <Typography align='left'>???? Personen die im Projekt mitarbeiten HIER anzeigen lassen ???? <br/><br/></Typography>
                                <Grid item xs={3}>
                                    <Button variant="contained" startIcon={<AddIcon/>}>Aktivität hinzufügen</Button>
                                </Grid>
                                <br/>
                                <Table>
                                    <TableHead sx={{
                                        backgroundColor: '#dedede'
                                    }}>
                                        <TableRow>
                                            <TableCell>Aktivität ID</TableCell>
                                            <TableCell>Aktivität</TableCell>
                                            <TableCell>Kapazität</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><Typography> GET ID {/*aktivitaet.id*/}</Typography></TableCell>
                                            <TableCell><Typography> GET Bezeichnung {/*aktivitaet.bezeichnung*/}</Typography></TableCell>
                                            <TableCell><Typography> GET Kapazität {/*aktivitaet.kapazitaet*/}</Typography></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                
                                
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
                <ProjektAnlegen show={showProjektAnlegen} onClose={this.projektAnlegenClosed} />
            </div>
            : null
        );
    }
}



export default ProjektUebersichtEintrag;


