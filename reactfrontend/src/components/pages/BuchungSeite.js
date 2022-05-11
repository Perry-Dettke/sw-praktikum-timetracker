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

import BuchungDialog from '../dialogs/BuchungDialog';

class Buchung extends Component {
    
    constructor(props) {
        super(props);

    this.state = {
        showBuchung: false
    };
    }

    //BuchungDialog anzeigen
    showBuchungDialog = () => {
        this.setState({ showBuchung: true}, () => {
            console.log(this.state.showBuchung);
        });
    };

    //BuchungDialog schließen
    closeBuchungDialog = () => {
        this.setState({ showBuchung: false});
    };
    

    render() {
        const {showBuchung} = this.state;

        return (
            <div>
                <Button variant="contained" sx={{width:250}}
                    onClick={this.showBuchungDialog}>
                Neue Buchung erstellen</Button>
                    <TableContainer component={Paper}  sx={{ maxWidth: 1000 , margin:"auto" }}>
                        <Table sx={{ minWidth: 600 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Buchung</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left" component="th" scope="row">Buchung 1</TableCell>
                                    <TableCell align="right"><Button variant="outlined">Löschen</Button></TableCell>
                                    <TableCell align=""><Button variant="outlined">Bearbeiten</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
           { <BuchungDialog show={showBuchung} onClose={this.closeBuchungDialog}/> }
            </div>
        );
    }
}

export default Buchung;