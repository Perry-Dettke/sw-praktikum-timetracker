import * as React from 'react';
import { Component } from 'react';
import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TimetrackerAPI from "../api/TimetrackerAPI";


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            person: null,
            projekt:  null
        };
    }
    componentDidMount() {
        /*this.getPerson();*/
        this.getProjekt();
        /*this.getEreignis(); //name frei wählbar (sollte Sinn ergeben)*/
    }


    getPerson = () => {
        TimetrackerAPI.getAPI().getPerson().then((person) =>
            this.setState({
                person: person,
            })
        ).catch((e) =>
            this.setState({
                person: null,
            })
        );
    };

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




    getEreignis = () => {     // gleicher name wie in componentdidmount
        TimetrackerAPI.getAPI().getEreignis().then((response) =>
            console.log(response))
    }

    render() {
        const {person, projekt} = this.state;
        console.log(projekt);

        return (
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
                            <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto" }}>
                                <Table sx={{ minWidth: 180 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Projektbezeichnung</TableCell>
                                            <TableCell align="left">Projektleiter</TableCell>
                                            <TableCell align="left">Auftraggeber</TableCell>
                                            <TableCell align="left">Soll</TableCell>
                                            <TableCell align="left">Ist</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {projekt ?
                                        <TableRow>
                                            <TableCell align="left">{projekt.getBezeichnung()}</TableCell>
                                            <TableCell align="left">Daten</TableCell>
                                            <TableCell align="left">{projekt.getAuftraggeber()}</TableCell>
                                            <TableCell align="left">Daten</TableCell>
                                            <TableCell align="left">Daten</TableCell>
                                        </TableRow>
                                        :
                                        <TableRow>
                                            <TableCell align="left">Test</TableCell>
                                            <TableCell align="left">Daten</TableCell>
                                            <TableCell align="left">Daten</TableCell>
                                            <TableCell align="left">Daten</TableCell>
                                            <TableCell align="left">Daten</TableCell>
                                        </TableRow>}
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