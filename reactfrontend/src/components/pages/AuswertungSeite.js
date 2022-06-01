import * as React from 'react';
import { Component } from 'react';
//import Table from '@mui/material/Table';
//import TableBody from '@mui/material/TableBody';
//import TableCell from '@mui/material/TableCell';
//import TableContainer from '@mui/material/TableContainer';
//import TableHead from '@mui/material/TableHead';
//import TableRow from '@mui/material/TableRow';
//import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import { Grid } from '@mui/material';

//import { Button, TextField, InputAdornment, IconButton, Grid, Typography, Paper, List, Fab, Tooltip, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


import TimetrackerAPI from '../../api/TimetrackerAPI';
import AuswertungSeiteEintrag from './AuswertungSeiteEintrag';
import ProjektDialog from '../dialogs/ProjektDialog';


class AuswertungSeite extends Component {
    
    constructor(props) {
        super(props);

        //init empty state
        this.state = {
            currentUser: props.currentUser,
            projekt: [],
            aktivitaet: [],
            showProjektDialog: false,
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

    //PersonDialog anzeigen
    showProjektDialog = () => {
        this.setState({ showProjektDialog: true});
    };


    // Add Button - Oeffnet den Person hinzufuegen Dialog
    addProjektButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showProjektDialog: true,
    });
  }

  /*
    //wird aufgerufen, wenn Dialog Fenster geschloßen wird
    projektFormClosed = projekt => {
        this.getProjekt();
        if (projekt) {
        const newProjektList = [...this.state.projekt, projekt];
        this.setState({
            projekt: newProjektList,
            filteredProjekt: [...newProjektList],
            showProjektForm: false
        });
        } else {
        this.setState({
            showProjektForm: false
        });
        }
    }
*/

    

    //ProjektDialog schließen
    closeProjektDialog = () => {
        this.setState({ 
            showProjektDialog: false});
    };



    componentDidMount() {
        this.getProjekt();
        this.getAktivitaetbyProjektID();
    }
    

    /** Renders the component */
    render() {
        const { expandedState } = this.props;
        
        const{projekt, aktivitaet, showProjektDialog} = this.state;
        console.log(projekt)

        return (
            <div>
                <Grid container spacing={4}  alignItems="left">
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                        <List >
                            {
                                Object.values(projekt).map(projekt =>
                                    <AuswertungSeiteEintrag key={Object.keys(projekt)[projekt.id]} projekt={projekt} aktivitaet={aktivitaet} show={this.props.show}
                                        getProjekt={this.getProjekt} getAktivitaetbyProjektID={this.getAktivitaetbyProjektID} />)
                            }
                        </List>
                    </Grid>
                </Grid>
                <ProjektDialog show={showProjektDialog} onclose={this.closeProjektDialog} />
            </div>
        );
    }
}



export default AuswertungSeite;
