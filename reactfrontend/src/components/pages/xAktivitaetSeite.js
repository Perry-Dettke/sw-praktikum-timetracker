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

import AktivitaetDialog from '../dialogs/AktivitaetDialog';

class Aktivitaet extends Component {
    
    constructor(props) {
        super(props);

    this.state = {
        showAktivitaet: false
    };
    }

    //AktivitaetDialog anzeigen
    showAktivitaetDialog = () => {
        this.setState({ showAktivitaet: true}, () => {
            console.log(this.state.showAktivitaet);
        });
    };

    //AktivitaetDialog schließen
    closeAktivitaetDialog = () => {
        this.setState({ showAktivitaet: false});
    };
    

    render() {
        const {showAktivitaet} = this.state;

        return (
            <div>
                <Button variant="contained" sx={{width:250}}
                    onClick={this.showAktivitaetDialog}>
                Neue Aktivität anlegen</Button>
                    <TableContainer component={Paper}  sx={{ maxWidth: 1000 , margin:"auto" }}>
                        <Table sx={{ minWidth: 600 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Aktivität</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left" component="th" scope="row">Aktivität 1</TableCell>
                                    <TableCell align="right"><Button variant="outlined">Löschen</Button></TableCell>
                                    <TableCell align=""><Button variant="outlined">Bearbeiten</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
           { <AktivitaetDialog show={showAktivitaet} onClose={this.closeAktivitaetDialog}/> }
            </div>
        );
    }
}

export default Aktivitaet;