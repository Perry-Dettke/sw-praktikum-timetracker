import * as React from 'react';
import { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Box} from '@mui/material';

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
                +</Button>
                <Box
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 2,
                    width: 'max',
                    height: 300,
                    alignItems: 'center',
                    },
                }}
                >
                    <TableContainer component={Paper}  sx={{ maxWidth: 1200 , margin:"auto", }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Buchung</b></TableCell>
                                    <TableCell align="left"><b>löschen</b></TableCell>
                                    <TableCell align="left"><b>bearbeiten</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">Test</TableCell>
                                    <TableCell align="left">Test</TableCell>
                                    <TableCell align="left">Test</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            <BuchungDialog show={showBuchung} onClose={this.closeBuchungDialog}/>
            </div>
        );
    }
}

export default Buchung;