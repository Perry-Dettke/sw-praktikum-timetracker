import * as React from 'react';
import { Component } from 'react';
import {Paper, Box, Button, Tooltip, IconButton} from '@mui/material';
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



    // getPersonbyID = () => {
    //     var api = TimetrackerAPI.getAPI();
    //         api.getPersonbyID(1000).then((personBO) => {
    //             this.setState({
    //             person: personBO,
    //           });
    //         });
    // }

    getPerson = () => {
        TimetrackerAPI.getAPI().getPersonByGoogle(this.props.currentUser.uid).then((person) =>
            this.setState({
              person: person,
            })
          ).catch((e) =>
            this.setState({
              person: null,
            })
          );
      }; 

    





    // SignUp anzeigen
  closeSignup = (person) => {
    this.setState({
      currentUser: person.getID(),
      person: person,
    });
  }

  showPersonForm = () => {
      if(!this.state.person) {
          this.setState({ showPersonForm: true });
      }
  }

//Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showPersonForm: true
        });
    }
    


    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    ClosePersonForm = (person) => {
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
  this.getPerson(); 

  
}


    render(){
        const { currentUser } = this.props;
        const { person, showPersonForm } = this.state;
        console.log(currentUser)
        console.log(person)
        console.log()
        
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
            </div> 
            :  <SignUp onClose={this.closeSignup} currentUser={currentUser}  />
            
        );
    }
}

export default Home;