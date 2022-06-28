import React, { Component } from 'react';
import { Typography, IconButton, Grid, Tooltip, Divider } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import TimetrackerAPI from '../../api/TimetrackerAPI';
import BuchungDelete from '../dialogs/BuchungDelete';
import BuchungBearbeiten from '../dialogs/BuchungBearbeiten';

/*
* Auf dieser Seite wird der Eintrag auf der Buchungsseite angezeigt. 
* Dies beinhaltet alle Projekt-Buchungen die der angemeldete User getätigt hat,
*/

class BuchungListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            aktivitaet: null,
            projekt: null,
            showBuchungBearbeiten: false,
            showBuchungDelete: false,
            aktivitaetliste: [],
            tablehead: null,
            currentPerson: this.props.currentPerson
        };
    }

    //Gibt die aktuellen Buchungen zurück
    getBuchungbyPersonID = () => {
        this.props.getBuchungbyPersonID();
    }

    //Gibt die Aktivität der Buchung zurücl
    getAktivitaet = () => {
        TimetrackerAPI.getAPI().getAktivitaetbyID(this.props.buchung.getAktivitaet_id()).then((aktivitaetBOs) => {
            this.setState({
                aktivitaet: aktivitaetBOs,
            });
        });
    }

    //Gibt das Projekt der Aktivität zurück
    getProjekt = () => {
        this.timer = setTimeout(() => {
            TimetrackerAPI.getAPI().getProjektbyID(this.state.aktivitaet.getProjektID()).then((projektBOs) => {
                this.setState({
                    projekt: projektBOs,
                });
            });
        }
            , 1000);
    }

    // Gibt die Aktivität des Projekt zurück
    getAktivitaetbyProjektID = () => {
        this.timer = setTimeout(() => {
            TimetrackerAPI.getAPI().getAktivitaetbyProjektID(this.state.aktivitaet.getProjektID()).then((aktivitaetBOs) => {
                this.setState({
                    aktivitaetliste: aktivitaetBOs,
                });
            });
        }
            , 1000);
    }

    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showBuchungBearbeiten: true
        });
    }

    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    buchungBearbeitenClosed = (buchung) => {
        if (buchung) {
            this.setState({
                showBuchungBearbeiten: false
            });
            this.getAktivitaet()
        } else {
            this.setState({
                showBuchungBearbeiten: false
            });
        }
    }

    //Öffnet das Dialog-Fenster BuchungDeleteDialog, wenn der Button geklickt wurde
    buchungDeleteButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showBuchungDelete: true
        });
    }

    //Wird aufgerufen, wenn das Dialog-Fenster PorjektDeleteDialog geschlossen wird
    buchungDeleteClosed = () => {
        this.setState({
            showBuchungDelete: false
        });
        this.props.getBuchung()
    }

    componentDidMount() {
        this.getAktivitaet();
        this.getProjekt();
        this.getAktivitaetbyProjektID()
    }

    //Renders the component
    render() {
        const { buchung, currentPerson } = this.props;
        const { aktivitaet, projekt, showBuchungBearbeiten, showBuchungDelete, aktivitaetliste } = this.state;

        return (
            aktivitaet && projekt ?
                <Grid container direction="row" justifyContent="center" alignItems="center" xs={12}>
                    <Grid item xs={2}>
                        <Typography>{buchung.getDatum()}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{projekt.getBezeichnung()}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{aktivitaet.getBezeichnung()}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{buchung.getStunden()}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Tooltip title='Bearbeiten' placement="bottom">
                            <IconButton variant='contained' onClick={this.bearbeitenButtonClicked}><EditIcon /></IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={2}>
                        <Tooltip title='Löschen' placement="bottom">
                            <IconButton variant="contained" onClick={this.buchungDeleteButtonClicked}><DeleteIcon /></IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>

                    <BuchungBearbeiten show={showBuchungBearbeiten} buchung={buchung} aktivitaet={aktivitaet} currentPerson={currentPerson} aktivitaetliste={aktivitaetliste} onClose={this.buchungBearbeitenClosed} getBuchungbyPersonID={this.getBuchungbyPersonID} />
                    <BuchungDelete show={showBuchungDelete} buchung={buchung} onClose={this.buchungDeleteClosed} getBuchungbyPersonID={this.props.getBuchungbyPersonID}/>
                </Grid>
                    
                : null
        );
    }
}

export default BuchungListenEintrag;
