import React, { Component } from 'react';
import { Button, Tooltip, TextField, InputAdornment, IconButton, Grid, Typography, List, Box, Fab, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import BuchungListenEintrag from './BuchungListenEintrag.js'
import TimetrackerAPI from "../../api/TimetrackerAPI";
import ZeitintervallBuchungAnlegen from '../dialogs/ZeitintervallBuchungAnlegen.js';
import EreignisBuchungAnlegen from '../dialogs/EreignisBuchungAnlegen.js';



class BuchungListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      buchung: [],
      buchungliste: [],
      showZeitintervallBuchungAnlegen: false,
      showEreignisBuchungAnlegen: false,
    };
  }

  getBuchungbyPersonID = () => {
    TimetrackerAPI.getAPI().getBuchungbyPersonID(3).then((buchungBOs) => {
      this.setState({
        buchungliste: buchungBOs,
      });
    });
  }


  // Zeitintervallbuchung Erstellen Dialog anzeigen
  zeitintervallBuchungAnlegenButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showZeitintervallBuchungAnlegen: true,
    });
  }

  /// Zeitintervallbuchung Erstellen Dialog schließen
  zeitintervallBuchungAnlegenClosed = buchung => {
    this.getBuchungbyPersonID();

    if (buchung) {
      const newBuchungList = [...this.state.buchung, buchung];
      this.setState({
        buchung: newBuchungList,
        showZeitintervallBuchungAnlegen: false
      });
    } else {
      this.setState({
        showZeitintervallBuchungAnlegen: false
      });
    }
  }

  
// Ereignisbuchung Erstellen Dialog anzeigen
  ereignisBuchungAnlegenButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showEreignisBuchungAnlegen: true,
    });
  }

  //Ereignisbuchung Dialog schließen
  ereignisBuchungAnlegenClosed = buchung => {
    this.getBuchungbyPersonID();

    if (buchung) {
      const newBuchungList = [...this.state.buchung, buchung];
      this.setState({
        buchung: newBuchungList,
        showEreignisBuchungAnlegen: false
      });
    } else {
      this.setState({
        showEreignisBuchungAnlegen: false
      });
    }
  }



  componentDidMount() {
    this.getBuchungbyPersonID();
  }


  /** Renders the component */
  render() {

    const { buchung, showZeitintervallBuchungAnlegen, showEreignisBuchungAnlegen, buchungliste } = this.state;
    // console.log(buchungliste)


    return (
      buchungliste ?
        <div>
          <Box>
            <h2>Hier kannst du neue Buchungen erstellen.</h2>
            <h3>Zudem werden dir deine bereits erstellten Buchungen angezeigt und du kannst diese bearbeiten oder löschen.</h3>
          </Box>
          <Grid>
            {/* <Button variant="contained" sx={{width:250}} onClick={this.showBuchungDialog}> Neue Buchung Erstellen</Button> */}
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={6} >
                  <Button
                    sx={{
                      m: 1,
                      width: 350,
                      height: 50,
                      alignItems: 'center',
                    }} variant="contained" color="primary" aria-label="add" onClick={this.zeitintervallBuchungAnlegenButtonClicked}>
                    <AddIcon />
                    &nbsp; Zeitintervall-Buchung erstellen
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    sx={{
                      m: 1,
                      width: 350,
                      height: 50,
                      alignItems: 'center',
                    }} variant="contained" color="primary" aria-label="add" onClick={this.ereignisBuchungAnlegenButtonClicked}>
                    <AddIcon />
                    &nbsp; Ereignis-Buchung erstellen
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <br/><br/>
            <Grid container alignItems="center" spacing={3} xs={12} sx={{
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
                <Typography>Art der Buchung (Zeitintervall/Ereignis)</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Stunden, die gebucht wurden</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>Bearbeiten</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>Löschen</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {
                buchungliste.map(buchung =>
                    <BuchungListenEintrag key={buchung[buchung.id]} buchung={buchung} show={this.props.show} getBuchung={this.getBuchungbyPersonID} />)
              }
            </Grid>
          </Grid>
          <ZeitintervallBuchungAnlegen show={showZeitintervallBuchungAnlegen} onClose={this.zeitintervallBuchungAnlegenClosed} getBuchungbyPersonID={this.getBuchungbyPersonID} />
          <EreignisBuchungAnlegen show={showEreignisBuchungAnlegen} onClose={this.ereignisBuchungAnlegenClosed}/>
        </div>
        : null
    );
  }
}




export default BuchungListe;





