import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Component } from 'react';
// import ProjektDialog from '../dialogs/ProjektDialog';

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
                <Button variant="contained"
                    onClick={this.showProjektDialog}>
                +</Button>
            <TableContainer component={Paper}  sx={{ maxWidth: 800 , margin:"auto"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Projekte</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Projekt 1</TableCell>
                            <Button variant="outlined" startIcon={<DeleteIcon />}>
                              Delete
                            </Button>
                            <Button variant="contained">Edit</Button>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            
            {/* <ProjektDialog show={showProjekt} onClose={this.closeProjektDialog}/> */}
            </div>
        );
    }
}

export default Projekt;