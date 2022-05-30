import * as React from 'react';
import { Component } from 'react';
import {Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button} from '@mui/material';
import TimetrackerAPI from "../api/TimetrackerAPI";


 class Home extends Component {

  /*  constructor(props) {
        super(props);
    
        this.state = {
          person: null
        
        };
    }
    componentDidMount() {
        this.getPerson();
    }


    getPerson = () => {
        TimetrackerAPI.getAPI().getPerson(this.state.getPerson()).then((person) =>
            this.setState({
              person: person,
            })
          ).catch((e) =>
            this.setState({
              person: null,
            })
          );
      };

*/


componentDidMount() {
  this.getEreignis(); //name frei wählbar (sollte Sinn ergeben)
}





getEreignis =  () => {     // gleicher name wie in componentdidmount
    TimetrackerAPI.getAPI().getEreignis().then((response) => 
    console.log(response))
}

    render(){
        return(
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
                        <h1>
                            Mein Profil
                        </h1>
                        <p>
                            Name:
                        </p>
                      
                        <p>
                            Email:
                        </p>
                        <p>
                            Rolle:
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
        );
    }
}

export default Home;