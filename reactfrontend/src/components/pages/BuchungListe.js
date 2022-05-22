import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

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
      filteredBuchung: [],
      showBuchungForm: false,
      showAktivitaetForm: false,
      showBuchungDelete: false,
    };
  }

  /** Fetches all PersonBOs from the backend */
  getBuchung = () => {
    var api = TimetrackerAPI.getAPI();
        api.getBuchung().then((buchungBOs) => {
          this.setState({
            buchung: buchungBOs,
          });
        });
      }

    // set loading to true

  // Add Button - Oeffnet den Person hinzufuegen Dialog
  addBuchungButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showBuchungForm: true
    });
  }

  addAktivitaetButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showAktivitätForm: true
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






    //PersonDialog anzeigen
    showBuchungDialog = () => {
        this.setState({ showBuchung: true}, () => {
            // console.log(this.state.showPerson);
        });
    };

    //PersonDialog schließen
    closeBuchungDialog = () => {
        this.setState({ showBuchung: false});
    };



    componentDidMount() {
        this.getBuchung();
    }

    /** Renders the component */
    render() {

        const { buchung, showBuchungForm, showAktivitaetForm } = this.state;



        return (
            <div>
                {/* <Button variant="contained" sx={{width:250}} onClick={this.showPersonDialog}> Neue Person Erstellen</Button> */}
                <Grid container spacing={2} alignItems="center">
                </Grid>
                <Grid item>
                <Tooltip title='Buchungart anlegen' placement="left">
                    <Fab size="medium"  color="primary" aria-label="add" onClick={this.addBuchungButtonClicked}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <Tooltip title='Aktivität anlegen' placement="left">
                    <Fab size="medium"  color="primary" aria-label="add" onClick={this.addAktivitaetButtonClicked}>
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
                {/* <BuchungForm show={showBuchungForm} onClose={this.buchungFormClosed} getAtivitaet = {this.getBuchung}/>
                <AktivitaetForm show={showAktivitaetForm} onClose={this.aktivitaetFormClosed} getAktivitaet = {this.getAktivitaet}/> */}

            </div>
        );
    }
}




export default BuchungListe;


  
