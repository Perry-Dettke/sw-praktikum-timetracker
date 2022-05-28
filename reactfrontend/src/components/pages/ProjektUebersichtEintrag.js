import React, {Component} from 'react';

import {ListItem, Typography, IconButton, Grid, Tooltip, Divider, Accordion, AccordionSummary, AccordionDetails, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import ProjektLöschenDialog from '../dialogs/ProjektLöschenDialog';
// import ProjektForm from '../dialogs/ProjektForm';



class ProjektUebersichtEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            projekt: props.projekt,
            aktivitaet: props.aktivitaet,
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


    //Renders the component
    render() {
        const {projekt, aktivitaet} = this.props;

        return (
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
                                <Typography>{projekt.bezeichnung}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{
                                    backgroundColor: "#eeeeee",
                                }}>
                                <Typography align='left'><u> Auftraggeber:</u> {projekt.auftraggeber} <br/><br/></Typography>
                                <Typography align='left'><u> Projektleiter:</u> {/*projekt.projektleiter*/} <br/><br/></Typography>
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
            </div>
        );
    }
}



export default ProjektUebersichtEintrag;


