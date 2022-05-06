import * as React from 'react';
import { Component } from 'react';
import {Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';


class Home extends Component {

    render(){
        return(
            <div>
                <Box
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 2,
                    width: 600,
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
                    </div>
                </Paper>
                <Paper elevation={3} >
                    <div>
                        <h1>
                            Meine Projekte
                        </h1>
                        <TableContainer component={Paper}  sx={{ maxWidth: 800 , margin:"auto"}}>
                            <Table sx={{ minWidth: 180 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Projektbezeichnung</TableCell>
                                        <TableCell align="right">Projektleiter</TableCell>
                                        <TableCell align="right">Auftraggeber</TableCell>
                                        <TableCell align="right">Soll</TableCell>
                                        <TableCell align="right">Ist</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Test</TableCell>
                                        <TableCell align="right">Daten</TableCell>
                                        <TableCell align="right">Daten</TableCell>
                                        <TableCell align="right">Daten</TableCell>
                                        <TableCell align="right">Daten</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Paper>
                </Box>
            </div> 
        );
    }
}

export default Home;