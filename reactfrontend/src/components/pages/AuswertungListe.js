import * as React from 'react';
import { Component } from 'react';

import { Grid, Typography, TextField, Paper, List, Fab, Tooltip, Button } from '@mui/material';
import TimetrackerAPI from '../../api/TimetrackerAPI';
import AuswertungListenEintrag from './AuswertungListenEintrag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


class Auswertung extends Component {

    constructor(props) {
        super(props);

        //init empty state
        this.state = {
            start: null,
            ende: null,
            projektliste: [],
            aktivitaet: [],
        };
        this.child = React.createRef()
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

        return (
            <div>
                <h2> Es werden dir nur die Projekte angezeigt, die du selbst erstellt hast!</h2>
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
        );
    }
}



export default Auswertung;
