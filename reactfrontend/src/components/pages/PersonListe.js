import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';

import PersonListenEintrag from './PersonListenEintrag'
import TimetrackerAPI from "../../api/TimetrackerAPI";
import PersonDialog from '../dialogs/PersonDialog';


class PersonListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      person: [],
      filteredPerson: [],
      showPerson: false,
      // personenliste: [],
    };
  }

  /** Fetches all PersonBOs from the backend */
  getPerson = () => {
    var api = TimetrackerAPI.getAPI();
        api.getPerson().then((projektBOs) => {
          this.setState({
            person: projektBOs,
          });
        });
      }

    // set loading to true
    
  

    // PersonenList() {
    //     var api = TimetrackerAPI.getAPI();
    //     api.getPerson().then((projektBOs) => {
    //       this.setState({
    //         personenliste: projektBOs,
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

        const { person, filteredPerson, personenliste, showPerson } = this.state;
        // console.log(personenliste)


        return (
            <div>
                <Button variant="contained" sx={{width:250}} onClick={this.showPersonDialog}> Neue Person Erstellen</Button>
                <Grid container spacing={2} alignItems="center">
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
                <PersonDialog show={showPerson} onClose={this.closePersonDialog}/>
            </div>
        );
    }
}




export default PersonListe;


  
