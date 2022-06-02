import React, { Component } from 'react';
import { Button, TextField, InputAdornment, IconButton, Grid, Typography, Paper, List, Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import BuchungListenEintrag from './BuchungListenEintrag.js'
import TimetrackerAPI from "../../api/TimetrackerAPI";
import BuchungDialog from '../dialogs/BuchungDialog.js';




class BuchungListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      buchung: [],
      arbeitszeitkonten: [],
      showBuchungDialog: false,
    };
  }

  // Gibt alle Arbeitszeitkonten einer Prson zurück
  getArbeitszeitkontoByPersonID = () => {
    var api = TimetrackerAPI.getAPI();
        api.getArbeitszeitkontobyPersonID(1).then((arbeitszeitkontoBOs) => {
          this.setState({
            arbeitszeitkonten: arbeitszeitkontoBOs,
          });
        });
      }

    //Gibt alle Buchugen einer Person zurück, anhand der Arbeitszeitkonten
    getAktivitaetbyProjektID = () => {
      TimetrackerAPI.getAPI().getAktivitaetbyProjektID(this.props.projekt.getID()).then((aktivitaetBOs) => {
          this.setState({
              aktivitaetliste: aktivitaetBOs,
          });
      });
  }

  //BuchungDialog anzeigen
  buchungAnlegenButtonClicked = event => {
    event.stopPropagation();
    this.setState({
    showBuchungDialog: true,
    });
}

  //BuchungDialog schließen
  BuchungDialogClosed = event => {
    event.stopPropagation();
    this.setState({
      showBuchungDialog: false,
    });
  }

  
  componentDidMount() {
      this.getArbeitszeitkontoByPersonID();

  }


  /** Renders the component */
  render() {

    const { buchung, arbeitszeitkonten, showBuchungDialog } = this.state;
    console.log(Object.values(arbeitszeitkonten.getID()))


    return (
      arbeitszeitkonten ?
      <div>
        {/* <Button variant="contained" sx={{width:250}} onClick={this.showBuchungDialog}> Neue Buchung Erstellen</Button> */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}/>
          <Grid item xs={4}>
            <Button 
                sx={{
                    m: 1,
                    width: 350,
                    height: 50,
                    alignItems: 'center',
                    }}   variant="contained" color="primary" aria-label="add" onClick={this.buchungAnlegenButtonClicked}>
                    <AddIcon />   
                    &nbsp; Ereignis-Buchung erstellen
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button 
                sx={{
                    m: 1,
                    width: 350,
                    height: 50,
                    alignItems: 'center',
                    }}   variant="contained" color="primary" aria-label="add" onClick={this.buchungAnlegenButtonClicked}>
                    <AddIcon />   
                    &nbsp; Zeitintervall-Buchung erstellen
            </Button>
          </Grid>
          <Grid item xs={2}/>
          <Grid item xs={12}>
            <Typography><h1>Übersicht eigener Buchungen</h1></Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              <BuchungListenEintrag key={buchung[buchung.id]} buchung={buchung} show={this.props.show}/>
            </List>
          </Grid>
        </Grid>
        <BuchungDialog show={showBuchungDialog} onClose={this.buchungDialogClosed} />

      </div>
      : null
    );
  }
}




export default BuchungListe;


  
