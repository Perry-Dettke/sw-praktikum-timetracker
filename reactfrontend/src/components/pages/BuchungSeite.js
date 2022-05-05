import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Component } from 'react';

class Buchung extends Component {
    
    constructor(props) {
        super(props);

    this.state = {
        showBuchung: false
    };
    }

    //BuchungDialog anzeigen
    showBuchungDialog = () => {
        this.setState({ showBuchung: true});
    };

    //BuchungDialog schließen
    closeBuchungDialog = () => {
        this.setState({ showBuchung: false});
    };
    

    render() {
        const {showBuchung} = this.state;

        return (
            <div>
                <Button variant="contained"
                    onClick={this.showBuchungDialog}>
                +</Button>
            <TableContainer component={Paper}  sx={{ maxWidth: 800 , margin:"auto"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Buchung</TableCell>
                            <TableCell align="right">löschen</TableCell>
                            <TableCell align="right">bearbeiten</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Test</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        );
    }
}

export default Buchung;