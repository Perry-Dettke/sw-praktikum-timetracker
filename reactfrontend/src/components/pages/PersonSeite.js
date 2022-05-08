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
import Stack from '@mui/material/Stack';

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
                <Button variant="contained" sx={{width:250}}
                        onClick={this.showPersonDialog}>
                </Button>
                <Box
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 2,
                    width: 'max',
                    height: 800,
                    alignItems: 'center',
                    },
                }}
                >
                    <TableContainer component={Paper}  sx={{ maxWidth: 1200 , margin:"auto", }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Person</b></TableCell>
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
            <PersonDialog show={showPerson} onClose={this.closePersonDialog}/>
             </div>
         );
    }
}

export default Person;