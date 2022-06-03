import * as React from 'react';
import { Component } from 'react';
import {Paper, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Grid, IconButton} from '@mui/material';
import TimetrackerAPI from "../../api/TimetrackerAPI";
import EditIcon from '@mui/icons-material/Edit';
import PersonForm from '../dialogs/PersonForm';
import SignUp from './SignUp';

 class Home extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          person: null,
          showPersonForm: false
        }
    }

    getPersonbyID = () => {
        var api = TimetrackerAPI.getAPI();
            api.getPersonbyID(2).then((personBO) => {
                this.setState({
                person: personBO,
              });
            });
          }

//Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showPersonForm: true
        });
    }

    // SignUp anzeigen
  closeSignup = (person) => {
    this.setState({
      currentUser: person.getID(),
      person: person,
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




componentDidMount() {
  this.getPersonbyID(); //name frei wählbar (sollte Sinn ergeben)
}


    render(){

        const { person, showPersonForm } = this.state;

          
        return(
            person ?
            <div>
                <Box
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 2,
                    width: 1200,
                    height: 300,
                    alignItems: 'center',
                    },
                }}
                >
                <Paper elevation={3}>
                    <div>

                        <h2>
                           Mein Profil                
                        </h2>
                        <Tooltip title='Bearbeiten' placement="right">
                      <IconButton   variant='contained' onClick={this.bearbeitenButtonClicked}>
                          <EditIcon />
                      </IconButton>
                      </Tooltip>
                        <p>
                            <strong>Name:</strong> {person.getVor_name()} {person.getNach_name()}
                        </p>
                      
                        <p>
                        <strong>Email:</strong> {person.getEmail()}
                        </p>
                        <p>
                        <strong>Benutzername:</strong> {person.getBenutzer_name()}
                        </p>

                        <br/>
                        <p> 
                            <Button variant="contained">Logout</Button>
                            <Button variant="contained">Profil löschen</Button>
                        </p>
                    </div>
                </Paper>
                <Paper>

                </Paper>
                </Box>

                <PersonForm show={showPersonForm} person={person} onClose={this.personFormClosed} />
            </div> 
            : null
        );
    }
}

export default Home;