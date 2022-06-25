import React, { Component } from 'react';
import { Button, Tooltip, TextField, InputAdornment, IconButton, Grid, Typography, List, Box, Fab, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import BuchungListenEintrag from './BuchungListenEintrag.js'
import TimetrackerAPI from "../../api/TimetrackerAPI";
import ZeitintervallBuchungAnlegen from '../dialogs/ZeitintervallBuchungAnlegen.js';
import LoadingProgress from '../dialogs/LoadingProgress'



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

  


  componentDidMount() {
    this.getBuchungbyPersonID();
  }


  /** Renders the component */
  render() {

    const { buchung, showZeitintervallBuchungAnlegen, buchungliste, authLoading } = this.state;
    // console.log(buchungliste)


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
                    &nbsp; Projekt-Buchung erstellen
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
          <LoadingProgress show={authLoading} />
        </div>
        : null
    );
  }
}




export default BuchungListe;





