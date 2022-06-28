import React, { Component } from 'react';
import { Button, Grid, Typography, Box } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import BuchungListenEintrag from './BuchungListenEintrag.js'
import TimetrackerAPI from "../../api/TimetrackerAPI";
import ProjektBuchungAnlegen from '../dialogs/ProjektBuchungAnlegen.js';
import LoadingProgress from '../dialogs/LoadingProgress'

/*
* Auf dieser Seite wird die Übersicht aller Projekt-Buchungen angezeigt, die der angemeldete User erstellt hat.
*/

class BuchungListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      buchung: [],
      buchungliste: [],
      showProjektBuchungAnlegen: false,
      showEreignisBuchungAnlegen: false,
      authLoading: false,
      currentPerson: this.props.currentPerson,
  
    };
  }

  //Gibt alle Buchungen einer Person zurück
  getBuchungbyPersonID = () => {
    TimetrackerAPI.getAPI().getBuchungbyPersonID(this.props.currentPerson.getID()).then((buchungBOs) => {
      this.setState({
        buchungliste: buchungBOs,
      });
    });
  }

  // Projektbuchung Erstellen Dialog anzeigen
  projektBuchungAnlegenButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showProjektBuchungAnlegen: true,
    });
  }

  // Projektbuchung Erstellen Dialog schließen
  projektBuchungAnlegenClosed = buchung => {
    if (buchung) {
      const newBuchungList = [...this.state.buchung, buchung];
      this.setState({
        buchung: newBuchungList,
        showProjektBuchungAnlegen: false,
      });
    } else {
      this.setState({
        showProjektBuchungAnlegen: false,
      });
    }
  }

  componentDidMount() {
    this.getBuchungbyPersonID();
  }

  /** Renders the component */
  render() {
    const { currentPerson, showProjektBuchungAnlegen, buchungliste, authLoading } = this.state;

    return (
      buchungliste ?
        <div>
          <Box>
            <Typography variant='h5' component='h1' align='center' color='#0098da' fontFamily='Courier'>
              Hier kannst du neue Buchungen erstellen.
            </Typography>
            <Typography variant='h9' component='h7' align='center' color='#323748' fontFamily='Verdana'>
              Zudem werden dir deine bereits erstellten Buchungen angezeigt und du kannst diese bearbeiten oder löschen.
            </Typography> 
          </Box>
          <Grid>
            <Box sx={{ flexGrow: 1 }}>
              <Button
                sx={{
                  m: 1,
                  width: 350,
                  height: 50,
                  alignItems: 'center',
                }} variant="contained" color="primary" aria-label="add" onClick={this.projektBuchungAnlegenButtonClicked}>
                <AddIcon />
                &nbsp; Projekt-Buchung erstellen
              </Button>
            </Box>
            <br/><br/>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3} xs={12} sx={{
                backgroundColor: '#dedede'
              }}>
              <Grid item xs={2}>
                <Typography>Datum</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Projekt</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Aktivität</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Stunden, die gebucht wurden</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Bearbeiten</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Löschen</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {
                buchungliste.map(buchung =>
                    <BuchungListenEintrag key={buchung[buchung.id]} buchung={buchung} show={this.props.show} currentPerson={currentPerson} getBuchung={this.getBuchungbyPersonID} />)
              }
            </Grid>
          </Grid>
          <ProjektBuchungAnlegen show={showProjektBuchungAnlegen} onClose={this.projektBuchungAnlegenClosed} currentPerson={currentPerson} getBuchungbyPersonID={this.getBuchungbyPersonID} />
          <LoadingProgress show={authLoading} />
        </div>
        : null
    );
  }
}

export default BuchungListe;
