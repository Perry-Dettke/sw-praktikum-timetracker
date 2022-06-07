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
import AuswertungListenEintrag from './AuswertungListenEintrag';
import ProjektDialog from '../dialogs/ProjektDialog';


class Auswertung extends Component {
    
    constructor(props) {
        super(props);

        //init empty state
        this.state = {
            projektliste: [],
            aktivitaet: [],
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


    
    getAktivitaetbyProjektID = () => {
        var akt = TimetrackerAPI.getAPI();
            akt.getAktivitaetbyProjektID().then((aktivitaetBOs) => {
                this.setState({
                    aktivitaet: aktivitaetBOs,
                });
            });
    }



    componentDidMount() {
        this.getProjektbyProjekterstellerID();
        // this.getAktivitaetbyProjektID();
    }
    

    /** Renders the component */
    render() {
        const { expandedState } = this.props;
        
        const{projektliste, aktivitaet, showProjektDialog} = this.state;
        console.log(projektliste)

        return (
            <div>
                <Grid container spacing={4}  alignItems="left">
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                        <List >
                            {
                                projektliste.map(projekt =>
                                    <AuswertungListenEintrag key={(projekt)[projekt.id]} projekt={projekt} aktivitaet={aktivitaet} show={this.props.show}
                                        getProjekt={this.getProjekt} getAktivitaetbyProjektID={this.getAktivitaetbyProjektID} />)
                            }
                        </List>
                    </Grid>
                </Grid>
            </div>
        );
    }
}



export default Auswertung;
