import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Box} from '@mui/material';
import { Component } from 'react';
import Stack from '@mui/material/Stack';
import ProjektDialog from '../dialogs/ProjektDialog';

class Projekt extends Component {
    
    constructor(props) {
        super(props);

    this.state = {
        showProjekt: false
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
    

    render() {
        const {showProjekt} = this.state;

        return (
            <div>
     
            <TableContainer component={Paper}  sx={{ maxWidth: 1000, margin:"auto"}}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Projekte</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Projekt 1</TableCell>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained">Delete</Button>
                                    <Button variant="contained">Edit</Button>
                                    <Button variant="outlined" onClick={this.showProjektDialog}>+
                                </Button>
                                <Box
                                sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                    m:2,
                                    width:'max',
                                    height: 800,
                                    alignItems: 'center',
                                    },
                                }}
                                ></Box>
                                </Stack>
                     
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            { <ProjektDialog show={showProjekt} onClose={this.closeProjektDialog}/> }
            </div>
        );
    }
}

export default Projekt;