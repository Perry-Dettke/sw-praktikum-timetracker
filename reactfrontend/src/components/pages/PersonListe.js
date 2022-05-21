import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';

import PersonListenEintrag from './PersonListenEintrag'
import TimetrackerAPI from "../../api/TimetrackerAPI";

class PersonListe extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      person: [],
      filteredPerson: [],
      showPerson: false,
      personenliste: [],
    };
  }

//   /** Fetches all PersonBOs from the backend */
//   getPerson = () => {
//     TimetrackerAPI.getAPI().getPerson()
//       .then(personBOs =>
//        this.setState({       
//           person: personBOs,
//           filteredPerson: [...personBOs], //Kopie von person
//         })).catch(e =>
//           this.setState({              
//             person: [],
//           })
//         );}

//     // set loading to true
    
  

    PersonenListe() {
        var api = TimetrackerAPI.getAPI();
        api.getPerson().then((projektBOs) => {
          this.setState({
            personenliste: projektBOs,
          });
        });
      }



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
        this.PersonenListe();
        console.log(this.state.personenliste);
      }

    /** Renders the component */
    render() {

        const { person, filteredPerson, personenliste } = this.state;
        // console.log(personenliste)

        return (
            <div>
                <Grid container spacing={2} alignItems="center">
                <Button variant="contained" sx={{width:250}} onClick={this.showPersonDialog()}> Neue Person Erstellen</Button>
                </Grid>
                
                <Paper>
                    <List >
                        {
                            Object.values(personenliste).map(person =>
                                <PersonListenEintrag key={Object.values(person)[4]} personenliste={personenliste} show={this.props.show}
                                    getPersonenListe={this.getPersonenListe} />)
                        }
                    </List>
                </Paper>

            </div>
        );
    }
}




export default PersonListe;


  
