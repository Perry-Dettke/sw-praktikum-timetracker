import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from '@mui/material';
import { Component } from 'react';
//mport Stack from '@mui/material/Stack';
import ProjektDialog from '../dialogs/ProjektDialog';
import AktivitaetDialog from '../dialogs/AktivitaetDialog';

class personen_uebersicht extends Component {
    
    constructor(props) {
        super(props);

    this.state = {
        showProjekt: false
    };

    this.state = {
        showAktivitaet: false
    };

    }



    render() {
    

        return (
            <div>

            <TableContainer component={Paper}  sx={{ maxWidth: 1000, margin:"auto"}}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><b>Person</b></TableCell>
                            <TableCell align="left"><b>Projekt</b></TableCell>
                            <TableCell align="left"><b>Soll Std</b></TableCell>
                            <TableCell align="left"><b>Ist Std</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Person</TableCell>
                            
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Person 2</TableCell>
                        
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Person 3</TableCell>
                            
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
         
            
            </div>
        );
    }
}





export default personen_uebersicht;
