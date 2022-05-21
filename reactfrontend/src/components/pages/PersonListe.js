import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import { withStyles, IconButton, InputAdornment, TextField, Paper, Grid } from '@material-ui/core';
import LoadingProgress from './dialogs/LoadingProgress';
import List from '@material-ui/core/List';
import ClearIcon from '@material-ui/icons/Clear';


import { Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';

import PersonListenEintrag from './PersonListenEintrag'
import TimetrackerAPI from "../../api/TimetrackerAPI";

import TimetrackerAPI from "../../api/TimetrackerAPI";
import PersonListenEintrag from './PersonListenEintrag';

class PersonListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      person: [],
      filteredPerson: [],
      showPerson: false
    };
  }

  /** Fetches all PersonBOs from the backend */
  getPerson = () => {
    TimetrackerAPI.getAPI().getPerson()
      .then(personBOs =>
       this.setState({       
          person: personBOs,
          filteredPerson: [...personBOs], //Kopie von person
        })).catch(e =>
          this.setState({              
            person: [],
          })
        );}

    // set loading to true
    
  





    //PersonDialog anzeigen
    showPersonDialog = () => {
        this.setState({ showPerson: true}, () => {
            console.log(this.state.showPerson);
        });
    };

    //PersonDialog schließen
    closePersonDialog = () => {
        this.setState({ showPerson: false});
    };

    showtest = () => {
      console.log(this.state.person)
    }

    componentDidMount() {
        this.getPerson();
      }

    /** Renders the component */
    render() {
        const { classes } = this.props;
        const { loadingInProgress, error, person, filteredPerson } = this.state;

        return (
            <div>
                <Grid container spacing={2} alignItems="center">
                <Button variant="contained" sx={{width:250}} onClick={this.showtest}> Neue Person Erstellen</Button>
                </Grid>
                
                <Paper>
                    <List >
                        {
                            person.map(person =>
                                <PersonListeEintrag key={person.getID()} person={person} show={this.props.show}
                                    getPerson={this.getPerson} />)
                        }
                    </List>
                    {/* <LoadingProgress show={loadingInProgress} />
                    <ContextErrorMessage error={error} contextErrorMsg={`Personenliste konnte nicht geladen werden.`} onReload={this.getPerson} /> */}
                </Paper>

            </div>
        );
    }
}




export default PersonListe;


  
