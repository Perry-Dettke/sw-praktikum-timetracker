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
import PersonDialog from '../dialogs/PersonDialog';
//import Stack from '@mui/material/Stack';


class Personen_uebersicht extends Component {
    
    constructor(props) {
        super(props);

    this.state = {
        showPerson: false
    };
    }



    render() {
        const {showPerson} = this.state;

        return (
            <div>
            <TableContainer component={Paper}  sx={{ maxWidth: 1000 , margin:"auto", }}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><b>Person</b></TableCell>     
                       </TableRow>
                       <TableRow>
                            <TableCell align="right"><b>Projekt</b></TableCell>     
                       </TableRow>
                       <TableRow>
                            <TableCell align="left"><b>Soll Stunden</b></TableCell>     
                       </TableRow>
                       <TableRow>
                            <TableCell align="left"><b>Ist Stunden</b></TableCell>     
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

export default Personen_uebersicht