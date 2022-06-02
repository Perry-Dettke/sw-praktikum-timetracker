import React, { Component } from 'react';
import { Button, TextField, InputAdornment, IconButton, Grid, Typography, Paper, List, Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import BuchungListenEintrag from './BuchungListenEintrag.js'
import TimetrackerAPI from "../../api/TimetrackerAPI";
// import BuchungDialog from '../dialogs/BuchungDialog';
// import BuchungForm from '../dialogs/BuchungForm';


class BuchungListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      buchung: [],
      showBuchungAnlegen: false,
    };
  }
/*
  // Fetches all BuchungBOs from the backend 
  getBuchung = () => {
    var api = TimetrackerAPI.getAPI();
        api.getBuchung().then((buchungBOs) => {
          this.setState({
            buchung: buchungBOs,
          });
        });
      }

  // Add Button - Oeffnet den Buchung hinzufuegen Dialog
  addBuchungButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showBuchungForm: true
    });
  }

  //BuchungAnlegen anzeigen
  showBuchungAnlegen = () => {
      this.setState({ showBuchung: true}, () => {
          // console.log(this.state.showBuchung);
      });
  };

  //BuchungAnlegen schließen
  closeBuchungDialog = () => {
      this.setState({ showBuchung: false});
  };



  componentDidMount() {
      this.getBuchung();
  }
  */

  /** Renders the component */
  render() {

    const { buchung, showBuchungForm, showBuchungDelete } = this.state;

    return (
      <div>
        {/* <Button variant="contained" sx={{width:250}} onClick={this.showBuchungDialog}> Neue Buchung Erstellen</Button> */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Button 
                sx={{
                    m: 1,
                    width: 300,
                    height: 50,
                    alignItems: 'center',
                    }}   variant="contained" color="primary" aria-label="add" onClick={this.projektAnlegenButtonClicked}>
                    <AddIcon />   
                    neue Buchung erstellen
            </Button>
          </Grid>
          <Grid item xs={12}>
            <List>
              {
                  buchung.map(buchung =>
                      <BuchungListenEintrag key={buchung[buchung.id]} buchung={buchung} show={this.props.show}/>)
                  }
            </List>
          </Grid>
        </Grid>
        {/* {<BuchungForm show={showBuchungForm} onClose={this.buchungFormClosed} getAtivitaet = {this.getBuchung}/>} */}

      </div>
    );
  }
}




export default BuchungListe;


  
