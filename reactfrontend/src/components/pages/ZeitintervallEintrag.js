import React, { Component } from 'react';

import { Typography, IconButton, Grid, Tooltip, ListItem, Divider, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import TimetrackerAPI from '../../api/TimetrackerAPI';
import ZeitintervallLoeschen from '../dialogs/ZeitintervallLoeschen.js';
import ZeitintervallBearbeiten from '../dialogs/ZeitintervallBearbeiten';



class ZeitintervallEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            showZeitintervallBearbeiten: false,
            showZeitintervallLoeschen: false,
        };
    }




    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showZeitintervallBearbeiten: true
        });
    }

    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    zeitintervallBearbeitenClosed = (zeitintervall) => {
        if (zeitintervall) {
            this.setState({
                showZeitintervallBearbeiten: false
            });
            this.props.getZeitintervallbyPersonID()
            this.props.getArbeitszeitkonto()
        } else {
            this.setState({
                showZeitintervallBearbeiten: false
            });
        }
    }

    //Öffnet das Dialog-Fenster ZeitintervallLoeschenDialog, wenn der Button geklickt wurde
    zeitintervallLoeschenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showZeitintervallLoeschen: true
        });
    }

    //Wird aufgerufen, wenn das Dialog-Fenster PorjektLoeschenDialog geschlossen wird
    zeitintervallLoeschenClosed = () => {
        this.setState({
            showZeitintervallLoeschen: false
        });
        this.props.getZeitintervallbyPersonID()
        this.props.getArbeitszeitkonto()
    }

    componentDidMount() {
    }




    //Renders the component
    render() {
        const { zeitintervall } = this.props;
        const { showZeitintervallBearbeiten, showZeitintervallLoeschen } = this.state;
        // console.log()

        return (
            zeitintervall ?
                <Grid container alignItems="center" xs={12}>

                    <Grid item xs={2}>
                        <Typography></Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography>{zeitintervall.getStart()}</Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography>{zeitintervall.getEnde()}</Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography>{zeitintervall.getPausenDauer()}</Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography>{zeitintervall.getDauer()}</Typography>
                    </Grid>

                    <Grid item xs={1}>
                        <Tooltip title='Bearbeiten' placement="bottom">
                            <IconButton variant='contained' onClick={this.bearbeitenButtonClicked}><EditIcon /></IconButton>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={1}>
                        <Tooltip title='Löschen' placement="bottom">
                            <IconButton variant="contained" onClick={this.zeitintervallLoeschenButtonClicked}><DeleteIcon /></IconButton>
                        </Tooltip>
                    </Grid>

                    <ZeitintervallBearbeiten show={showZeitintervallBearbeiten} zeitintervall={zeitintervall} onClose={this.zeitintervallBearbeitenClosed} getZeitintervallbyPersonID={this.getZeitintervallbyPersonID} />
                    <ZeitintervallLoeschen show={showZeitintervallLoeschen} zeitintervall={zeitintervall} onClose={this.zeitintervallLoeschenClosed} getZeitintervallbyPersonID={this.props.getZeitintervallbyPersonID} />

                </Grid>

                : null
        );
    }
}



export default ZeitintervallEintrag;


