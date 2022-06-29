import * as React from 'react';
import { Component } from 'react';
import { Grid, Typography, List } from '@mui/material';

import TimetrackerAPI from '../../api/TimetrackerAPI';
import AuswertungListenEintrag from './AuswertungListenEintrag';
import LoadingProgress from '../dialogs/LoadingProgress'

/*
* Auf dieser Seite werden alle selbst erstellten Projekte angezeigt. Dies geschieht mithilfe eines Listeneintrags und einer Map-Funktion.
*/

class Auswertung extends Component {

    constructor(props) {
        super(props);

        //init empty state
        this.state = {
            start: null,
            ende: null,
            projektliste: [],
            aktivitaet: [],
            authLoading: false,
        };
    }

    /* Fetches all PersonBOs from the backend */
    getProjektbyProjekterstellerID = () => {
        if (this.props.currentPerson.getID())
            var pro = TimetrackerAPI.getAPI();
        pro.getProjektbyProjekterstellerID(this.props.currentPerson.getID()).then((projektBOs) => {
            this.setState({
                projektliste: projektBOs,
                authLoading: false,
            });
        });
        // set loading to true
        this.setState({
            authLoading: true,
        });
    }

    // Textfelder ändern
    textFieldValueChange = (event) => {
        const value = event.target.value;

        let error = false;
        if (value.trim().length === 0) {
            error = true;
        }

        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    componentDidMount() {
        this.getProjektbyProjekterstellerID();

    }

    /** Renders the component */
    render() {
        const { expandedState, currentPerson } = this.props;
        const { projektliste, start, ende, authLoading } = this.state;

        return (
            currentPerson ?
                <div>
                    <div><LoadingProgress show={authLoading} />
                        {projektliste.length != 0 ?
                            <div>
                                <Typography variant='h5' component='h1' align='center' color='#0098da' fontFamily='Courier'>
                                    Es werden dir nur die Projekte angezeigt, die du selbst erstellt hast!
                                </Typography>
                                <Grid container spacing={4} alignItems="left">
                                    <Grid item xs={12}>
                                    </Grid>
                                    <Grid item xs={12}>


                                        <List >
                                            {
                                                projektliste.map(projekt =>
                                                    <AuswertungListenEintrag key={(projekt)[projekt.id]} projekt={projekt} ref={this.child} />)
                                            }
                                        </List>
                                    </Grid>
                                </Grid>

                            </div>
                            : <div> <h1>Bisher hast du noch keine Projekte erstellt.</h1>
                                <h3>Gehe auf die Projekt Übersicht um neue Projekte zu erstellen.</h3>
                            </div>}
                    </div>
                </div> : <h1>Bisher hast du noch keine Projekte erstellt.</h1>
        );
    }
}



export default Auswertung;
