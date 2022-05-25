import React, { Component } from 'react';
import { Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import PersonLöschenDialog from '../dialogs/PersonLöschenDialog';


import PersonListenEintrag from './PersonListenEintrag'
import TimetrackerAPI from "../../api/TimetrackerAPI";
import PersonDialog from '../dialogs/PersonDialog';
import PersonForm from '../dialogs/PersonForm';


class PersonListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      person: null,
      filteredPerson: [],
      showPersonForm: false,
      showPersonDelete: false,
      // person: [],
    };
  }

  /** Fetches all PersonBOs from the backend */
  getPersonbyID = () => {
    var api = TimetrackerAPI.getAPI();
        api.getPersonbyID(2).then((personBO) => {
          this.setState({
            person: personBO,
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
    //         person: personBOs,
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

    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
      event.stopPropagation();
      this.setState({
          showPersonForm: true
      });
  }


    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    personFormClosed = (person) => {
      if (person) {
          this.setState({
              person: person,
              showPersonForm: false
          });
      } else {
          this.setState({
              showPersonForm: false
          });
      }
  }

   //Öffnet das Dialog-Fenster PersonDeleteDialog, wenn der Button geklickt wurde
   personDeleteButtonClicked =  event => {
      console.log("Delete Button")
      event.stopPropagation();
      this.setState({
        showPersonDelete: true
      });
    }
  
    //Wird aufgerufen, wenn das Dialog-Fenster PersonDeleteDialog geschlossen wird
    personDeleteClosed = () => {
        this.setState({
          showPersonDelete: false
        });
        this.getPerson();
    }


    componentDidMount() {
        this.getPersonbyID();
        // this.PersonenList();
    }

    /** Renders the component */
    render() {

        const { person, filteredPerson, showPersonForm, showPersonDelete } = this.state;
        console.log("Personen Liste", person)
        if (person) {
          console.log(person.getVor_name())
        } 


        return (
          person ?
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
                    <ListItem>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={2}>
                            <Typography>{person.getVor_name()}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{person.getNach_name()}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{person.getBenutzer_name()}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{person.getEmail()}</Typography>
                        </Grid>
                        <Grid item xs/>

                        <Grid item>
                    <Tooltip title='Bearbeiten' placement="bottom">
                      <IconButton   variant='contained' onClick={this.bearbeitenButtonClicked}>
                          <EditIcon />
                      </IconButton>
                    </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title='Löschen' placement="bottom">
                      <IconButton variant="contained"  onClick={this.personDeleteButtonClicked}><DeleteIcon /></IconButton>
                      </Tooltip>
                    </Grid>
                    </Grid>
                </ListItem>
                    </List>
                </Paper>

                <PersonForm show={showPersonForm} person={person} onClose={this.personFormClosed} />
                <PersonLöschenDialog show={showPersonDelete} person={person} onClose={this.personDeleteClosed} getPerson= {this.getPerson}/>    

            </div>
            : null
        );
    }
}




export default PersonListe;


  
