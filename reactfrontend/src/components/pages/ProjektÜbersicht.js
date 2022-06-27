import * as React from 'react';
import { Component } from 'react';
//import Table from '@mui/material/Table';
//import TableBody from '@mui/material/TableBody';
//import TableCell from '@mui/material/TableCell';
//import TableContainer from '@mui/material/TableContainer';
//import TableHead from '@mui/material/TableHead';
//import TableRow from '@mui/material/TableRow';
//import Paper from '@mui/material/Paper';
//import List from '@mui/material/List';

import { Button, TextField, InputAdornment, IconButton, Grid, Typography, Paper, List, Fab, Tooltip, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


import TimetrackerAPI from '../../api/TimetrackerAPI';
import ProjektUebersichtEintrag from './ProjektUebersichtEintrag';
import ProjektAnlegen from '../dialogs/ProjektAnlegen';
import LoadingProgress from '../dialogs/LoadingProgress'


class Projekt_uebersicht extends Component {

    constructor(props) {
        super(props);

        //init empty state
        this.state = {
            projekt: [],
            showProjektAnlegen: false,
            authLoading: false,
        };
    }

    /** Fetches all ProjektBOs from the backend */
    getProjekt = () => {
        TimetrackerAPI.getAPI().getProjektbyPersonID(this.props.currentPerson.getID()).then((projektBOs) => {
            this.setState({
                projekt: projektBOs,
                authLoading: false,
            });
        });
        // set loading to true
        this.setState({
            authLoading: true,
        });
    }


    // Projekt Anlegen Button geklickt - Oeffnet den Projekt anlegen Dialog

    projektAnlegenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showProjektAnlegen: true,
        });
    }

    //ProjektDialog schließen
    projektAnlegenClosed = projekt => {
        if (projekt) {
            const newProjektList = [...this.state.projekt, projekt];
            this.setState({
                projekt: newProjektList,
                showProjektAnlegen: false,
            });
        } else {
            this.setState({
                showProjektAnlegen: false,
            });
        }
    }


    componentDidMount() {
        this.getProjekt();
    }


    /** Renders the component */
    render() {
        const { expandedState, currentPerson } = this.props;

        const { projekt, showProjektAnlegen, authLoading } = this.state;

        return (
            <div>
                <Grid container spacing={1} alignItems="left">
                    <Grid item xs={12}>
                        <Typography><h3>Hier werden alle Projekte in denen du Teilnehmer bist angezeigt (Der Ersteller ist immer auch Teilnehmer)</h3></Typography>
                        <Typography><h4>Nur der Ersteller eines Projekts kann ein Projekt bearbeiten und löschen oder Aktivitäten hinzufügen und löschen.</h4></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            sx={{
                                m: 1,
                                width: 300,
                                height: 50,
                                alignItems: 'center',
                            }} variant="contained" color="primary" aria-label="add" onClick={this.projektAnlegenButtonClicked}>
                            <AddIcon />
                            neues Projekt anlegen
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {
                                projekt.map(projekt =>
                                    <ProjektUebersichtEintrag key={projekt[projekt.id]} projekt={projekt} getProjekt={this.getProjekt} currentPerson={currentPerson} show={this.props.show} />)
                            }
                        </List>
                    </Grid>
                </Grid>
                <ProjektAnlegen show={showProjektAnlegen} onClose={this.projektAnlegenClosed} currentPerson={currentPerson}/>
                <LoadingProgress show={authLoading} />
            </div>
        );
    }
}



export default Projekt_uebersicht;