import * as React from "react";
import { Component } from "react";
import { Paper, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Table, IconButton, } from "@mui/material";
import TimetrackerAPI from "../../api/TimetrackerAPI";
import EditIcon from "@mui/icons-material/Edit";
import PersonForm from "../dialogs/PersonForm";
import PersonDelete from "../dialogs/PersonDelete";
import EreignisBuchungAnlegen from "../dialogs/EreignisBuchungAnlegen.js"

import ZeitintervallBO from "../../api/ZeitintervallBO";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            person: null,
            showPersonForm: false,
            showPersonDelete: false,
            showEreignisBuchungAnlegen: false,
            zeitintervall: null,
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
            console.log("funktion");
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



    // Kommen Zeitpunkt adden
    addZeitintervall = () => {
        let newZeitintervall = new ZeitintervallBO()
        newZeitintervall.setID(0) // wird im Backend gesetzt
        newZeitintervall.setStart(0)
        newZeitintervall.setDauer(0.0) // wird beim update angepasst
        newZeitintervall.setPerson_id(2) //current User
        TimetrackerAPI.getAPI().addZeitintervall(newZeitintervall).then(zeitintervall => {
            let date = new Date()
            window.alert("Du hast am " + date.toLocaleDateString() + " um " + date.toLocaleTimeString() + " eingstempelt")
            console.log(zeitintervall)
            this.getZeitintervall()
            this.setState(this.initialState);
        })
        this.setState({
            start: new Date
        })
    }

    // muss current user ID rein
    getZeitintervall = () => {
        TimetrackerAPI.getAPI().getZeitintervallbyMaxIDandPersonID(2).then((zeitintervallBO) => {
            this.setState({
                zeitintervall: zeitintervallBO,
            });
        });
    }

    

   updateZeitintervall = () => {
    console.log("geklickt")
    console.log(this.state.zeitintervall)
        let zeitintervall = this.state.zeitintervall;
        let ende = new Date;
        let dauer = (parseFloat(ende.toLocaleTimeString())) - parseFloat(this.state.start.toLocaleTimeString())
        zeitintervall.setEnde(0) // wird im Backend gesetzt
        zeitintervall.setDauer(dauer)

        TimetrackerAPI.getAPI().updateZeitintervall(zeitintervall) 
        let date = new Date()
        window.alert("Du hast am " + date.toLocaleDateString() + " um " + date.toLocaleTimeString() + " ausgestempelt")
            this.setState(this.initialState);
        }
    

 uhrzeit = () => {
    var timenow = new Date(),
        h = timenow.getHours(),
        m = timenow.getMinutes(),
        s = timenow.getSeconds();

    let stunden = String(h+m+s)
    console.log(stunden)

 }
 

    

componentDidMount() {
    this.getPersonbyID();
    this.uhrzeit()
}

render() {
    const { person, showPersonForm, showPersonDelete, zeitintervall, showEreignisBuchungAnlegen, start } = this.state;
    console.log(zeitintervall)
    console.log(start)

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
            <PersonForm show={showPersonForm} person={person} onClose={this.personFormClosed}/>
            <PersonDelete show={showPersonDelete} person={person} onClose={this.personDeleteClosed} getPersonbyID={this.getPersonbyID}/>
            <EreignisBuchungAnlegen show={showEreignisBuchungAnlegen} onClose={this.ereignisBuchungAnlegenClosed} />
        </div>
    ) : (
        <p> Du scheinst noch kein Profil zu haben</p>
    );
}
}

export default Home;
