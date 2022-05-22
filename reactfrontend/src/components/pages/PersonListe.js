import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import PersonListenEintrag from './PersonListenEintrag'
import TimetrackerAPI from "../../api/TimetrackerAPI";
import PersonDialog from '../dialogs/PersonDialog';
import PersonForm from '../dialogs/PersonForm';


class PersonListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      person: [],
      filteredPerson: [],
      showPersonForm: false,
      showPersonDelete: false,
      // personenliste: [],
    };
  }

  /** Fetches all PersonBOs from the backend */
  getPerson = () => {
    var api = TimetrackerAPI.getAPI();
        api.getPerson().then((personBOs) => {
          this.setState({
            person: personBOs,
          });
        });
      }

    // set loading to true

  // Add Button - Oeffnet den Person hinzufuegen Dialog
  addButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showPersonForm: true
    });
  }

//wird aufgerufen, wenn Dialog Fenster geschloßen wird
personFormClosed = person => {
  this.getPerson();
  if (person) {
    const newPersonList = [...this.state.person, person];
    this.setState({
      person: newPersonList,
      filteredPerson: [...newPersonList],
      showPersonForm: false
    });
  } else {
    this.setState({
      showPersonForm: false
    });
  }
}

    // PersonenList() {
    //     var api = TimetrackerAPI.getAPI();
    //     api.getPerson().then((personBOs) => {
    //       this.setState({
    //         personenliste: personBOs,
    //       });
    //     });
    //   }



    //PersonDialog anzeigen
    showPersonDialog = () => {
        this.setState({ showPerson: true}, () => {
            // console.log(this.state.showPerson);
        });
    };

    //PersonDialog schließen
    closePersonDialog = () => {
        this.setState({ showPerson: false});
    };



    componentDidMount() {
        this.getPerson();
        // this.PersonenList();
    }

    /** Renders the component */
    render() {

        const { person, filteredPerson, personenliste, showPersonForm } = this.state;
        // console.log(personenliste)


        return (
            <div>
                {/* <Button variant="contained" sx={{width:250}} onClick={this.showPersonDialog}> Neue Person Erstellen</Button> */}
                <Grid container spacing={2} alignItems="center">
                </Grid>
                <Grid item>
                <Tooltip title='Person anlegen' placement="left">
                    <Fab size="medium"  color="primary" aria-label="add" onClick={this.addButtonClicked}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Grid>
                <Paper>
                    <List >
                        {
                            Object.values(person).map(person =>
                                <PersonListenEintrag key={Object.keys(person)[person.id]} person={person} show={this.props.show}
                                    getPerson={this.getPerson} />)


                        }
                    </List>
                </Paper>
                <PersonForm show={showPersonForm} onClose={this.personFormClosed} getPerson = {this.getPerson}/>
            </div>
        );
    }
}




export default PersonListe;


  
