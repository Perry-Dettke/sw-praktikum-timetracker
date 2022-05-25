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
import ProjektListenEintrag from './ProjektListenEintrag';

class Projekt_uebersicht extends Component {
    
    constructor(props) {
        super(props);

        //init empty state
        this.state = {
            projekt: [],
            aktivitaet: [],
    };
    }

    /** Fetches all PersonBOs from the backend */
    getProjekt = () => {
        var pro = TimetrackerAPI.getAPI();
            pro.getProjekt().then((projektBOs) => {
              this.setState({
                projekt: projektBOs,
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
        this.getProjekt();
        this.getAktivitaetbyProjektID();
    }
    

    /** Renders the component */
    render() {
        const { expandedState } = this.props;
        
        const{projekt, aktivitaet} = this.state;
        console.log(projekt)

        return (
            <div>
                <Grid container spacing={4}  alignItems="left">
                    <Grid item xs={12}>
                        <Button 
                            sx={{
                                m: 4,
                                width: 300,
                                height: 50,
                                alignItems: 'center',
                                }}   variant="contained" color="primary" aria-label="add" onClick={this.addProjektButtonClicked}>
                                <AddIcon />   
                                neues Projekt anlegen
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <List >
                            {
                                Object.values(projekt).map(projekt =>
                                    <ProjektUebersichtEintrag key={Object.keys(projekt)[projekt.id]} projekt={projekt} aktivitaet={aktivitaet} show={this.props.show}
                                        getProjekt={this.getProjekt} getAktivitaetbyProjektID={this.getAktivitaetbyProjektID} />)
                            }

                        
                            
                            Projekte Übersicht Eintrag hier anzeigen
                         
                        </List>
                    </Grid>
                </Grid>
            </div>
        );
    }
}



export default Projekt_uebersicht;