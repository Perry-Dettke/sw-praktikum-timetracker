import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import { withStyles, IconButton, InputAdornment, TextField, Paper, Grid } from '@material-ui/core';
import LoadingProgress from './dialogs/LoadingProgress';
import List from '@material-ui/core/List';
import ClearIcon from '@material-ui/icons/Clear';



import TimetrackerAPI from "../../api/TimetrackerAPI";
import PersonListenEintrag from './PersonListenEintrag';

class PersonListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      person: [],
      filteredPerson: [],
      personFilter: '',
      error: null,
      loadingInProgress: false,
      showPerson: false
    };
  }

  /** Fetches all PersonBOs from the backend */
  getPerson = () => {
    TimetrackerAPI.getAPI().getPerson()
      .then(personBOs =>
        this.setState({       
          person: personBOs,
          filteredPerson: [...personBOs], 
          loadingInProgress: false,  
          error: null
        })).catch(e =>
          this.setState({              
            person: [],
            loadingInProgress: false, 
            error: e
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }





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



    componentDidMount() {
        this.getPerson();
      }

    /** Renders the component */
    render() {
        const { classes } = this.props;
        const { loadingInProgress, error, person } = this.state;

        return (
            <div className={classes.root}>
                <Grid container spacing={2} alignItems="center">
                <Button variant="contained" sx={{width:250}} onClick={this.showPersonDialog}> Neue Person Erstellen</Button>
                </Grid>
                
                <Paper>
                    <List className={classes.root} dense>
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


  
