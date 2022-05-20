import * as React from 'react';
import { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TimetrackerAPI from '../../api/TimetrackerAPI';


class Projektuebersicht extends Component {
    
    constructor(props) {
        super(props);

    this.state = {
        projekt:  null
    };
    }

    componentDidMount() {
        this.getProjekt();
    }

    getProjekt = () => {
        TimetrackerAPI.getAPI().getProjekt().then((projekt) =>
         //   console.log(projekt))
        this.setState({
                projekt: projekt,
            })
        ).catch((e) =>
            this.setState({
                projekt: null,
            })
        );
    };



    render() {
        const {projekt} = this.state;

        return (
            <div>
            <TableContainer component={Paper}  sx={{ maxWidth: 50000, margin:"auto"}}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><b>Projekte</b></TableCell>
                            <TableCell align="left"><b>Aktivität</b></TableCell>
                            <TableCell align="left"><b>Soll Stunden</b></TableCell>
                            <TableCell align="left"><b>Ist Stunden</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projekt ?
                        <TableRow>
                            <TableCell component="th" scope="row">{projekt.getBezeichnung()}</TableCell>
                        </TableRow>
                        :
                        <TableRow>
                            <TableCell component="th" scope="row">Keine Daten vorhanden</TableCell>
                        </TableRow>
                         }
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        );
    }
}


export default Projektuebersicht;