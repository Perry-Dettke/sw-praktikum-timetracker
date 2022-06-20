import * as React from "react";
import { Component } from "react";
import { Paper, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Table, IconButton, Grid, Typography } from "@mui/material";
import TimetrackerAPI from "../../api/TimetrackerAPI";
import EditIcon from "@mui/icons-material/Edit";
import PersonForm from "../dialogs/PersonForm";
import PersonDelete from "../dialogs/PersonDelete";
import EreignisBuchungAnlegen from "../dialogs/EreignisBuchungAnlegen.js"

import ZeitintervallBO from "../../api/ZeitintervallBO";
import ZeitintervallEintrag from './ZeitintervallEintrag.js'
import { CoPresent } from "@mui/icons-material";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            person: null,
            showPersonForm: false,
            showPersonDelete: false,
            showEreignisBuchungAnlegen: false,
            zeitintervall: null,
            zeitintervallliste: [],
            start: null,
            ende: null,
        };
    }

    getPersonbyID = () => {
        var api = TimetrackerAPI.getAPI();
        api.getPersonbyID(3).then((personBO) => {
            this.setState({
                person: personBO,
            });
        });
    };
    // currentuser.getArbeitszeitkontoID()
    getArbeitszeitkonto = () => {
        TimetrackerAPI.getAPI().getArbeitszeitkonto().then((arbeitszeitkontoBO) => {
            this.setState({
                arbeitszeitkonto: arbeitszeitkontoBO,
            });
        });
    }

    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showPersonForm: true,
        });
    };

    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    personFormClosed = (person) => {
        if (person) {
            this.setState({
                person: person,
                showPersonForm: false,
            });
        } else {
            this.setState({
                showPersonForm: false,
            });
        }
    };

    //Öffnet das Dialog-Fenster PersonDeleteDialog, wenn der Button geklickt wurde
    deleteButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showPersonDelete: true,
        });
    };

    //Wird aufgerufen, wenn das Dialog-Fenster PorjektDeleteDialog geschlossen wird
    personDeleteClosed = () => {
        this.setState({
            showPersonDelete: false,
            person: null,
        });
    };

    // Ereignisbuchung Erstellen Dialog anzeigen
    ereignisBuchungAnlegenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showEreignisBuchungAnlegen: true,
        });
    }

    //Ereignisbuchung Dialog schließen
    ereignisBuchungAnlegenClosed = buchung => {

    }
    //     this.getBuchungbyPersonID();

    //     if (buchung) {
    //     const newBuchungList = [...this.state.buchung, buchung];
    //     this.setState({
    //         buchung: newBuchungList,
    //         showEreignisBuchungAnlegen: false
    //     });
    //     } else {
    //     this.setState({
    //         showEreignisBuchungAnlegen: false
    //     });
    //     }
    // }

    // 20.6.2022 14:13:17

    // str.split([separator[, limit]])

    // Kommen Zeitpunkt adden
    addZeitintervall = () => {
        let newZeitintervall = new ZeitintervallBO()
        let start = this.dateSplit(); // Aktuelle Datetime wird aufgerufen und umgewandelt
        newZeitintervall.setID(0) // wird im Backend gesetzt
        newZeitintervall.setStart(start)
        newZeitintervall.setEnde("")
        newZeitintervall.setDauer(0.0) // wird beim update angepasst
        newZeitintervall.setPerson_id(2) //current User
        TimetrackerAPI.getAPI().addZeitintervall(newZeitintervall).then(zeitintervall => {
            let date = new Date()
            window.alert("Hallo " + this.state.person.getVor_name() + "! Schön, dass du da bist." + "\nDu hast am " + date.toLocaleDateString() + " um " + date.toLocaleTimeString() + " eingstempelt!\nEinen schönen Arbeitstag!.")
            this.getZeitintervall()
            this.setState(this.initialState);
            this.getZeitintervallbyPersonID()
        })
        this.setState({
            start: new Date
        })
    }

    //Datum und Zeit vom Frontend wird das richtige Backend Format umgewandelt
    dateSplit = () => {
        let newDate = new Date()
        let date = newDate.toLocaleDateString() + " " + newDate.toLocaleTimeString()
        let dateliste = date.split('')
        let day = String(dateliste[0] + dateliste[1])
        let month = "0" + String(dateliste[3])
        let year = String(dateliste[5] + dateliste[6] + dateliste[7] + dateliste[8])
        let time = String(dateliste[10] + dateliste[11] + dateliste[12] + dateliste[13] + dateliste[14] + dateliste[15] + dateliste[16] + dateliste[17])
        return year + "-" + month + "-" + day + " " + time
    }


    startDatumSplitten = () => {
        let date = this.state.zeitintervall.getStart()
        let dateliste = date.split('')
        let year = String(dateliste[0] + dateliste[1] + dateliste[2] + dateliste[3])
        let month = String(dateliste[6])
        let day = String(dateliste[8] + dateliste[9])
        let hours = String(dateliste[11] + dateliste[12])
        let min = String(dateliste[14] + dateliste[15])
        let sek = String(dateliste[17] + dateliste[18])
        console.log("Y", year, "M", month, "D", day, "TIME", hours, min, sek)
        return new Date(year, month - 1, day, hours, min, sek)
    }

    // muss current user ID rein
    getZeitintervall = () => {
        TimetrackerAPI.getAPI().getZeitintervallbyMaxIDandPersonID(2).then((zeitintervallBO) => {
            this.setState({
                zeitintervall: zeitintervallBO,
            });
        });
    }

    // muss current user ID rein
    getZeitintervallbyPersonID = () => {
        TimetrackerAPI.getAPI().getZeitintervallbyPersonID(2).then((zeitintervallBOs) => {
            this.setState({
                zeitintervallliste: zeitintervallBOs,
            });
        });
    }



    updateZeitintervall = () => {

        let ende = this.dateSplit(); // Aktuelle Datetime wird aufgerufen und umgewandelt
        let start = new Date(this.startDatumSplitten())
        let endefront = new Date()
        let dauer = endefront.getTime() - start.getTime()
        let zeitintervall = this.state.zeitintervall;
        zeitintervall.setEnde(ende)
        zeitintervall.setDauer(this.msToTime(dauer))
        TimetrackerAPI.getAPI().updateZeitintervall(zeitintervall)
        let date = new Date
        window.alert("Du hast am " + date.toLocaleDateString() + " um " + date.toLocaleTimeString() + " ausgestempelt!\nDu hast heute " + this.msToTime(dauer) + " Stunden gearbeitet!\nAuf Wiedersehen!")
        this.setState(this.initialState);
        this.getZeitintervallbyPersonID()
    }





    // Millisekunden in Stunden und Minuten
    // Wird zu Berechnung der Dauer zwischen 2 Datetimes benötigt
    // msToTime = (duration) => {
    //     var minutes = Math.floor(duration / (1000 * 60) % 60),
    //       hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    //     hours = (hours < 10) ? "0" + hours : hours;
    //     minutes = (minutes < 10) ? "0" + minutes : minutes;
    //     return parseFloat(hours + "." + ((minutes)/6) * 10)
    //   }

    msToTime = (s) => {
        let ms = (s % 1000) / 60
        s = (s - ms) / 1000
        let secs = (s % 60) / 60
        console.log('secs', secs)
        s = (s - secs) / 60
        let mins = (s % 60) / 60
        console.log('minuten', mins)
        let hrs = (s - mins) / 60

        return parseFloat(hrs + '.' + mins + secs)
    }

    componentDidMount() {
        this.getPersonbyID();
        this.getZeitintervallbyPersonID();

    }

    render() {
        const { person, showPersonForm, showPersonDelete, zeitintervall, zeitintervallliste, showEreignisBuchungAnlegen, start } = this.state;
        // console.log(zeitintervall)
        // console.log(start)
        // console.log(zeitintervallliste)

        return person ? (
            <div>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        "& > :not(style)": {
                            m: 2,
                            width: 700,
                            height: 300,
                            alignItems: "center",
                        },
                    }}
                >
                    <Paper elevation={3}>
                        <div>
                            <h2>Mein Profil</h2>
                            <Tooltip title="Bearbeiten" placement="right">
                                <IconButton
                                    variant="contained"
                                    onClick={this.bearbeitenButtonClicked}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <p>
                                <strong>Name:</strong> {person.getVor_name()}{" "}
                                {person.getNach_name()}
                            </p>

                            <p>
                                <strong>Email:</strong> {person.getEmail()}
                            </p>
                            <p>
                                <strong>Benutzername:</strong> {person.getBenutzer_name()}
                            </p>

                            <br />
                            <p>
                                <Button variant="contained" onClick={this.deleteButtonClicked}>
                                    Profil löschen
                                </Button>
                            </p>
                        </div>
                    </Paper>
                    <Paper elevation={3}>
                        <div>
                            <h1>Arbeitszeitkonto</h1>
                            <TableContainer
                                component={Paper}
                                sx={{ maxWidth: 750, margin: "auto" }}
                            >
                                <Table sx={{ minWidth: 180 }} aria-label="simple table">
                                    <TableHead>
                                        <Button variant="contained" onClick={this.addZeitintervall}>
                                            Kommen
                                        </Button>
                                        <Button variant="contained" onClick={this.updateZeitintervall}>
                                            Gehen
                                        </Button>
                                        <TableRow>
                                            <TableCell align="right">Gesamt Stunden</TableCell>
                                            <TableCell align="right">Gearbeitete Stunden</TableCell>
                                            <TableCell align="right">Urlaubstage</TableCell>
                                            <TableCell align="right">Krankheitstage</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="right">Testdaten</TableCell>
                                            <TableCell align="right">Testdaten</TableCell>
                                            <TableCell align="right">30</TableCell>
                                            <TableCell align="right">Testdaten</TableCell>
                                        </TableRow>
                                        <Button variant="contained" onClick={this.ereignisBuchungAnlegenButtonClicked}>
                                            Buchung
                                        </Button>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Paper>
                </Box>
    

                    <Grid container alignItems="center" xs={22} sx={{
                        backgroundColor: '#dedede'
                    }}>
                        <Grid item xs={2}>
                            <Typography>Kommen</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography>Gehen</Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography>Stunden</Typography>
                        </Grid>

                        <Grid item xs={1}>
                            <Typography>Bearbeiten</Typography>
                        </Grid>

                        <Grid item xs={1}>
                            <Typography>Löschen</Typography>
                        </Grid>

                    </Grid>
                    <Grid item xs={12}>

                        {
                            zeitintervallliste.map(zeitintervall =>
                                <ZeitintervallEintrag key={zeitintervall[zeitintervall.id]} zeitintervall={zeitintervall} show={this.props.show} getZeitintervall={this.getZeitintervall} />)
                        }
                    </Grid>

  
                <PersonForm show={showPersonForm} person={person} onClose={this.personFormClosed} />
                <PersonDelete show={showPersonDelete} person={person} onClose={this.personDeleteClosed} getPersonbyID={this.getPersonbyID} />
                <EreignisBuchungAnlegen show={showEreignisBuchungAnlegen} onClose={this.ereignisBuchungAnlegenClosed} />
            </div>
        ) : (
            <p> Du scheinst noch kein Profil zu haben</p>
        );
    }
}

export default Home;
