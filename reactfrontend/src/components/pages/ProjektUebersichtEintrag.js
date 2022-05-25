import React, {Component} from 'react';

import {ListItem, Typography, IconButton, Grid, Tooltip, Divider, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
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
                                id="panel1a-header"
                                >
                                <Typography>{projekt.bezeichnung}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>Auftraggeber: {projekt.auftraggeber}</Typography>
                                <Typography>Aktivitäten: {/*aktivitaet.bezeichnung*/}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </div>
        );
    }
}



export default ProjektUebersichtEintrag;


