import React, { Component } from 'react';

import { Typography, IconButton, Grid, Tooltip, ListItem, Divider, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import TimetrackerAPI from '../../api/TimetrackerAPI';
import BuchungDelete from '../dialogs/BuchungDelete';
import BuchungBearbeiten from '../dialogs/BuchungBearbeiten';



class ZeitintervallEintrag extends Component {

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
        };
    }

    //Gibt die aktuellen Buchungen zurück
    getBuchungbyPersonID = () => {
        this.props.getBuchungbyPersonID();
    }


    getAktivitaet = () => {
        TimetrackerAPI.getAPI().getAktivitaetbyID(this.props.buchung.getAktivitaet_id()).then((aktivitaetBOs) => {
            this.setState({
                aktivitaet: aktivitaetBOs,
            });
        });
    }



    getProjekt = () => {
        this.timer = setTimeout(() => {
            TimetrackerAPI.getAPI().getProjektbyID(this.state.aktivitaet.getProjektID()).then((projektBOs) => {
                this.setState({
                    projekt: projektBOs,
                });
            });
        }
            , 2000);
    }


    getAktivitaetbyProjektID = () => {
        this.timer = setTimeout(() => {

            TimetrackerAPI.getAPI().getAktivitaetbyProjektID(this.state.aktivitaet.getProjektID()).then((aktivitaetBOs) => {
                this.setState({
                    aktivitaetliste: aktivitaetBOs,
                });
            });
        }
            , 2000);
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
    }




    //Renders the component
    render() {
        const { zeitintervall } = this.props;
        const { showBuchungBearbeiten, showBuchungDelete } = this.state;
        // console.log(projekt)
        // console.log(this.state.aktivitaet.getProjektID())

        return (
            zeitintervall ?
                <div>

                        
  
                            <TableRow key={zeitintervall.getID()}>
                                <TableCell>{zeitintervall.getStart()}</TableCell>
                                <TableCell>{zeitintervall.getEnde()}</TableCell>
                                <TableCell>{zeitintervall.getDauer()}</TableCell>
                                <TableCell>
                                    <Tooltip title='Bearbeiten' placement="bottom">
                                        <IconButton variant='contained' onClick={this.bearbeitenButtonClicked}><EditIcon /></IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title='Löschen' placement="bottom">
                                        <IconButton variant="contained" onClick={this.buchungDeleteButtonClicked}><DeleteIcon /></IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
       
                   
                 
    

                    {/* <BuchungBearbeiten show={showBuchungBearbeiten} buchung={buchung} aktivitaet={aktivitaet} aktivitaetliste={aktivitaetliste} onClose={this.buchungBearbeitenClosed} getBuchungbyPersonID={this.getBuchungbyPersonID} />
                    <BuchungDelete show={showBuchungDelete} buchung={buchung} onClose={this.buchungDeleteClosed} getBuchungbyPersonID={this.props.getBuchungbyPersonID}/> */}

                </div>
                    
                : null
        );
    }
}



export default ZeitintervallEintrag;

