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
import TimetrackerAPI from "../../api/TimetrackerAPI";
import ProjektBO from '../../api/ProjektBO'


class Buchung extends Component {
    
    constructor(props) {
        super(props);

    this.state = {
        showBuchung: false,
        projekt: null
    };
    }


    componentDidMount() {
        this.getProjekt();
        console.log(this.state.projekt)
      }


      getProjekt = () => {
      TimetrackerAPI.getAPI()
        .getProjekt().then((projekt) =>
          this.setState({
            projekt: projekt,
          })
        ).catch((e) =>
          this.setState({
            projekt: []
          })
        );
    };






    //BuchungDialog anzeigen
    showBuchungDialog = () => {
        this.setState({ showBuchung: true}, () => {
            // console.log(this.state.projekt)
        });
    };

    //BuchungDialog schließen
    closeBuchungDialog = () => {
        this.setState({ showBuchung: false});
    };
    

    render() {
        const {showBuchung, projekt } = this.state;
        console.log("BuchungSeite Render Test", this.state, this.props)

        return (
            <div>
                <Button variant="contained" sx={{width:250}}
                    onClick={this.showBuchungDialog}>
                Neue Buchung erstellen</Button>
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
                    <TableContainer component={Paper}  sx={{ maxWidth: 50000, margin:"auto"}}>
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
                </Box>
           {<BuchungDialog show={showBuchung} projekt={projekt} onClose={this.closeBuchungDialog}/> }

            </div>
        );
    }
}

export default Buchung;