import React, { Component } from 'react';
import { Button, TextField, InputAdornment, IconButton, Grid, Typography, List, Box, Fab, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
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
      buchungliste: [],
      showBuchungDialog: false,
    };
  }

  getBuchungbyPersonID = () => {
    TimetrackerAPI.getAPI().getBuchungbyPersonID(3).then((buchungBOs) => {
      this.setState({
        buchungliste: buchungBOs,
      });
      console.log("getBuchung")

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
    this.getBuchungbyPersonID();
  }


  /** Renders the component */
  render() {

    const { buchung, showBuchungDialog, buchungliste } = this.state;
    console.log(buchungliste)


    return (
      buchungliste ?
        <div>
          <Box sx={{ bgcolor: 'success.main' }}>
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
                    }} variant="contained" color="primary" aria-label="add" onClick={this.buchungAnlegenButtonClicked}>
                    <AddIcon />
                    &nbsp; Ereignis-Buchung erstellen
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    sx={{
                      m: 1,
                      width: 350,
                      height: 50,
                      alignItems: 'center',
                    }} variant="contained" color="primary" aria-label="add" onClick={this.buchungAnlegenButtonClicked}>
                    <AddIcon />
                    &nbsp; Zeitintervall-Buchung erstellen
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <TableHead>
              <TableRow>
                <TableCell>Datum</TableCell>
                <TableCell>Projekt</TableCell>
                <TableCell>Aktivität</TableCell>
                <TableCell>Art der Buchung (Zeitintervall/Ereignis)</TableCell>
                <TableCell>Stunden die gebucht wurden</TableCell>
                <TableCell>Bearbeiten</TableCell>
                <TableCell>Löschen</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {
                buchungliste.map(buchung =>
                  <TableRow>  <BuchungListenEintrag key={buchung[buchung.id]} buchung={buchung} show={this.props.show} getBuchung={this.getBuchungbyPersonID} /></TableRow>)
              }

            </TableBody>




            <BuchungDialog show={showBuchungDialog} onClose={this.buchungDialogClosed} />
          </Grid>
        </div>
        : null
    );
  }
}




export default BuchungListe;





