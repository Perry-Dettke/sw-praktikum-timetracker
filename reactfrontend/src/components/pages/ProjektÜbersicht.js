import * as React from 'react';
import { Component } from 'react';
import { Button, Grid, Typography, List } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import TimetrackerAPI from '../../api/TimetrackerAPI';
import ProjektUebersichtEintrag from './ProjektUebersichtEintrag';
import ProjektAnlegen from '../dialogs/ProjektAnlegen';
import LoadingProgress from '../dialogs/LoadingProgress'

/*
* Auf dieser Seite sieht man alle Projekte in denen der angemeldete User Teilnehmer oder Ersteller ist.
* Dies geschieht mithilfe eines Listeneintrags und einer Map-Funktion.
*/

class Projekt_uebersicht extends Component {

    constructor(props) {
        super(props);

        //init empty state
        this.state = {
            projekt: [],
            person: false,
            showProjektAnlegen: false,
            authLoading: false,
        };
    }

    /* Fetches all ProjektBOs from the backend */
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
        if (this.state.person){
        event.stopPropagation();
        this.setState({
            showProjektAnlegen: true,
        });
    }
        else{ window.alert("Du musst dich erst anmelden!")
}
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
        this.getPerson();
    }

    /* Renders the component */
    render() {
        const { currentPerson } = this.props;
        const { projekt, showProjektAnlegen, authLoading } = this.state;
        console.log(currentPerson)
        return (
            <div>
                <Grid container spacing={1} alignItems="left">
                    <Grid item xs={1}/>
                    <Grid item xs={10}>
                        <Typography  variant='h5' component='h1' align='center' color='#0098da' fontFamily='Courier'>
                            Hier werden alle Projekte in denen du Teilnehmer bist angezeigt.
                        </Typography>
                        <Typography variant='h5' component='h1' align='center' color='#0098da' fontFamily='Courier'>
                            (Der Ersteller ist immer auch Teilnehmer)
                        </Typography>
                        <Typography variant='h9' component='h7' align='center' color='#323748' fontFamily='Verdana'>
                            Nur der Ersteller eines Projekts kann ein Projekt bearbeiten und löschen oder Aktivitäten hinzufügen und löschen.
                        </Typography>
                    </Grid>
                    <Grid item xs={1}/>
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