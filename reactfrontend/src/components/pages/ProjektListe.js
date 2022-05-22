import React, { Component } from 'react';
import { Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import ProjektListenEintrag from './ProjektListenEintrag.js'
import TimetrackerAPI from "../../api/TimetrackerAPI";
import ProjektDialog from '../dialogs/ProjektDialog';
// import ProjektForm from '../dialogs/ProjektForm';


class ProjektListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      projekt: [],
      filteredProjekt: [],
      showProjektForm: false,
      showAktivitaetForm: false,
      showProjektDelete: false,
    };
  }

  /** Fetches all PersonBOs from the backend */
  getProjekt = () => {
    var api = TimetrackerAPI.getAPI();
        api.getProjekt().then((projektBOs) => {
          this.setState({
            projekt: projektBOs,
          });
        });
      }

    // set loading to true

  // Add Button - Oeffnet den Person hinzufuegen Dialog
  addProjektButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showProjektForm: true
    });
  }

  addAktivitaetButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showAktivitätForm: true
    });
  }







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






    //PersonDialog anzeigen
    showProjektDialog = () => {
        this.setState({ showProjekt: true}, () => {
            // console.log(this.state.showPerson);
        });
    };

    //PersonDialog schließen
    closeProjektDialog = () => {
        this.setState({ showProjekt: false});
    };



    componentDidMount() {
        this.getProjekt();
    }

    /** Renders the component */
    render() {

        const { projekt, showProjektForm, showAktivitaetForm, showProjektDelete } = this.state;



        return (
            <div>
                {/* <Button variant="contained" sx={{width:250}} onClick={this.showPersonDialog}> Neue Person Erstellen</Button> */}
                <Grid container spacing={2} alignItems="center">
                </Grid>
                <Grid item>
                <Tooltip title='Projekt anlegen' placement="left">
                    <Fab size="medium"  color="primary" aria-label="add" onClick={this.addProjektButtonClicked}>
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
                            Object.values(projekt).map(projekt =>
                                <ProjektListenEintrag key={Object.keys(projekt)[projekt.id]} projekt={projekt} show={this.props.show}
                                    getProjekt={this.getProjekt} />)


                        }
                    </List>
                </Paper>
                {/* <ProjektForm show={showProjektForm} onClose={this.projektFormClosed} getAtivitaet = {this.getProjekt}/>
                <AktivitaetForm show={showAktivitaetForm} onClose={this.aktivitaetFormClosed} getAktivitaet = {this.getAktivitaet}/> */}

            </div>
        );
    }
}




export default ProjektListe;


  
