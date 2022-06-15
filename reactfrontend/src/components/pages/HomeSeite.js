import * as React from 'react';
import { Component } from 'react';
import {Paper, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Grid, IconButton} from '@mui/material';
import TimetrackerAPI from "../../api/TimetrackerAPI";
import EditIcon from '@mui/icons-material/Edit';
import PersonForm from '../dialogs/PersonForm';
import PersonDelete from '../dialogs/PersonDelete';



 class Home extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          person: null,
          showPersonForm: false,
          showPersonDelete: false
        }
    }

    getPersonbyID = () => {
        var api = TimetrackerAPI.getAPI();
            api.getPersonbyID(13).then((personBO) => {
                this.setState({
                person: personBO,
              });
              console.log("funktion")
            });
          }

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
     deleteButtonClicked =  event => {
        event.stopPropagation();
        this.setState({
          showPersonDelete: true
        });
      }
    
      //Wird aufgerufen, wenn das Dialog-Fenster PorjektDeleteDialog geschlossen wird
      personDeleteClosed = () => {
          this.setState({
            showPersonDelete: false,
            person: null
          });

      }


componentDidMount() {
  this.getPersonbyID();
}


    render(){

        const { person, showPersonForm, showPersonDelete } = this.state;

          
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

                            <Button variant="contained"  onClick={this.deleteButtonClicked}>Profil löschen</Button>
                        </p>
                    </div>
                </Paper>
                <Paper>

                </Paper>
                </Box>

                <PersonForm show={showPersonForm} person={person} onClose={this.personFormClosed} />
                <PersonDelete show={showPersonDelete} person={person} onClose={this.personDeleteClosed}/>
            </div> 
            : <p> Du scheinst noch kein Profil zu haben</p>
        );
    }
}

export default Home;