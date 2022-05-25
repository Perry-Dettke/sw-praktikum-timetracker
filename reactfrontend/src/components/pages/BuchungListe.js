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
      buchung: null,
      filteredBuchung: [],
      showBuchungForm: false,
      showBuchungDelete: false,
    };
  }

  /** Fetches all BuchungBOs from the backend */
  getBuchung = () => {
    var api = TimetrackerAPI.getAPI();
        api.getBuchung().then((buchungBOs) => {
          this.setState({
            buchung: buchungBOs,
          });
        });
      }

    // set loading to true

  // Add Button - Oeffnet den Buchung hinzufuegen Dialog
  addBuchungButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showBuchungForm: true
    });
  }








//wird aufgerufen, wenn Dialog Fenster geschloßen wird
buchungFormClosed = buchung => {
  this.getBuchung();
  if (buchung) {
    const newBuchungList = [...this.state.buchung, buchung];
    this.setState({
      buchung: newBuchungList,
      filteredBuchung: [...newBuchungList],
      showBuchungForm: false
    });
  } else {
    this.setState({
      showBuchungForm: false
    });
  }
}






    //BuchungDialog anzeigen
    showBuchungDialog = () => {
        this.setState({ showBuchung: true}, () => {
            // console.log(this.state.showBuchung);
        });
    };

    //BuchungDialog schließen
    closeBuchungDialog = () => {
        this.setState({ showBuchung: false});
    };



    componentDidMount() {
        this.getBuchung();
    }

    /** Renders the component */
    render() {

        const { buchung, showBuchungForm, showBuchungDelete } = this.state;



        return (
            <div>
                {/* <Button variant="contained" sx={{width:250}} onClick={this.showBuchungDialog}> Neue Buchung Erstellen</Button> */}
                <Grid container spacing={2} alignItems="center">
                </Grid>
                <Grid item>
                <Tooltip title='Buchung anlegen' placement="left">
                    <Fab size="medium"  color="primary" aria-label="add" onClick={this.addBuchungButtonClicked}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Grid>
                <Paper>
                    <List >
                        {
                            Object.values(buchung).map(buchung =>
                                <BuchungListenEintrag key={Object.keys(buchung)[buchung.id]} buchung={buchung} show={this.props.show}
                                    getBuchung={this.getBuchung} />)


                        }
                    </List>
                </Paper>
                {/* {<BuchungForm show={showBuchungForm} onClose={this.buchungFormClosed} getAtivitaet = {this.getBuchung}/>} */}

            </div>
        );
    }
}




export default BuchungListe;


  
