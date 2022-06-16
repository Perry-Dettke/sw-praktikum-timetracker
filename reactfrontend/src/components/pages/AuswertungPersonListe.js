import * as React from 'react';
import { Component } from 'react';

import { Grid, Typography, TextField, Paper, List, Fab, Tooltip, Button } from '@mui/material';
import TimetrackerAPI from '../../api/TimetrackerAPI';
import AuswertungPersonListenEintrag from './AuswertungPersonListenEintrag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


class AuswertungPerson extends Component {

    constructor(props) {
        super(props);

        //init empty state
        this.state = {
            start: null,
            ende: null,
            projektliste: [],
            personliste: [],
        };

    }

    /** Fetches all PersonBOs from the backend */
    getProjektbyProjekterstellerID = () => {
        var pro = TimetrackerAPI.getAPI();
        pro.getProjektbyProjekterstellerID(1).then((projektBOs) => {
            this.setState({
                projektliste: projektBOs,
            });
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
        const { expandedState } = this.props;
        const { projektliste, start, ende } = this.state;
        console.log(projektliste.length)

        return (
            projektliste.length != 0 ?
                <div>
                    <h2> Es werden dir nur die Projekte angezeigt, die du selbst erstellt hast!</h2>
                    <Grid container spacing={4} alignItems="left">
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>


                            <List >
                                {
                                    projektliste.map(projekt =>
                                        <AuswertungPersonListenEintrag key={(projekt)[projekt.id]} projekt={projekt} ref={this.child} />)
                                }
                            </List>
                        </Grid>
                    </Grid>
                </div>
                : <div> <h1>Bisher hast du noch keine Projekte erstellt.</h1>
                    <h3>Gehe auf die Projekt Übersicht um neue Projekte zu erstellen.</h3>
                </div>
        );
    }
}



export default AuswertungPerson;