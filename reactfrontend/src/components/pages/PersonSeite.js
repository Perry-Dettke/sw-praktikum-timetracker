import * as React from 'react';
import { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from '@mui/material';
//import Stack from '@mui/material/Stack';
import PersonDialog from '../dialogs/PersonDialog';

class Person extends Component {
    
    constructor(props) {
        super(props);

    this.state = {
        showPerson: false
    };
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

    render() {
        const {showPerson} = this.state;

        return (
            <div>
            <Button variant="contained" sx={{width:250}} onClick={this.showPersonDialog}> Neue Person Erstellen</Button>
            <TableContainer component={Paper}  sx={{ maxWidth: 1000 , margin:"auto", }}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><b>Person</b></TableCell>     
                       </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Projekt 1</TableCell>
                            <TableCell align="right"><Button variant="outlined">Delete</Button></TableCell>
                            <TableCell align=""><Button variant="outlined">Edit</Button></TableCell>
                       </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Projekt 2</TableCell>
                            <TableCell align="right"><Button variant="outlined">Delete</Button></TableCell>
                            <TableCell align=""><Button variant="outlined">Edit</Button></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Projekt 3</TableCell>
                            <TableCell align="right"><Button variant="outlined">Delete</Button></TableCell>
                            <TableCell align=""><Button variant="outlined">Edit</Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <PersonDialog show={showPerson} onClose={this.closePersonDialog}/>
             </div>
         );
    }
}



export default Person;