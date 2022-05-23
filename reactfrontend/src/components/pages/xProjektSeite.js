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

class Projekt extends Component {
    
    constructor(props) {
        super(props);

    this.state = {
        showProjekt: false
    };

    this.state = {
        showAktivitaet: false
    };

    }

    //ProjektDialog anzeigen = neues Projekt anlegen
    showProjektDialog = () => {
        this.setState({ showProjekt: true}, () => {
            console.log(this.state.showProjekt);
        });
    };

    //ProjektDialog schließen
    closeProjektDialog = () => {
        this.setState({ showProjekt: false});
    };
    
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
        const {showProjekt} = this.state;
        const {showAktivitaet} = this.state;

        return (
            <div>
            <Button variant="contained" onClick={this.showProjektDialog}>Neues Projekt erstellen</Button>
            <Button variant="contained" onClick={this.showAktivitaetDialog}>Neue Aktivität anlegen</Button>
            <TableContainer component={Paper}  sx={{ maxWidth: 1000, margin:"auto"}}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><b>Projekte</b></TableCell>
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
            { <ProjektDialog show={showProjekt} onClose={this.closeProjektDialog}/> }
            { <AktivitaetDialog show={showAktivitaet} onClose={this.closeAktivitaetDialog}/> }
         
            
            </div>
        );
    }
}





export default Projekt;
