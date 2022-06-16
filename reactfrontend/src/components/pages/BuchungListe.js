import React, { Component } from 'react';
import { Button, TextField, InputAdornment, IconButton, Grid, Typography, List, Box, Fab, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import BuchungListenEintrag from './BuchungListenEintrag.js'
import TimetrackerAPI from "../../api/TimetrackerAPI";

import ZeitintervallBuchungAnlegen from '../dialogs/ZeitintervallBuchungAnlegen.js';




class BuchungListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      buchung: [],
      buchungliste: [],
      showZeitintervallBuchungAnlegen: false,
    };
  }

  getBuchungbyPersonID = () => {
    TimetrackerAPI.getAPI().getBuchungbyPersonID(3).then((buchungBOs) => {
      this.setState({
        buchungliste: buchungBOs,
      });
    });
  }



  zeitintervallBuchungAnlegenButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showZeitintervallBuchungAnlegen: true,
    });
  }

  //ProjektDialog schließen
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

    const { buchung, showZeitintervallBuchungAnlegen, buchungliste } = this.state;
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
                    }} variant="contained" color="primary" aria-label="add" onClick={this.buchungAnlegenButtonClicked}>
                    <AddIcon />
                    &nbsp; Ereignis-Buchung erstellen
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Table style={{ width: 1400 }}>

              
   
                        <TableHead sx={{
                backgroundColor: '#dedede'
              }}>
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

              {
                buchungliste.map(buchung =>
                  <TableRow>  <BuchungListenEintrag key={buchung[buchung.id]} buchung={buchung} show={this.props.show} getBuchung={this.getBuchungbyPersonID} /></TableRow>)
              }
            </Table>

          </Grid>
          <ZeitintervallBuchungAnlegen show={showZeitintervallBuchungAnlegen} onClose={this.zeitintervallBuchungAnlegenClosed} />
        </div>
        : null
    );
  }
}




export default BuchungListe;





