import * as React from "react";
import { Component } from "react";
import { Paper, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Table, IconButton, Grid, Typography, TextField, Divider } from "@mui/material";
import TimetrackerAPI from "../../api/TimetrackerAPI";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonForm from "../dialogs/PersonForm";
import PersonDelete from "../dialogs/PersonDelete";
import SonderBuchungAnlegen from "../dialogs/SonderBuchungAnlegen.js";
import SignUp from './SignUp';
import LoadingProgress from '../dialogs/LoadingProgress';

import ZeitintervallBO from "../../api/ZeitintervallBO";
import ZeitintervallEintrag from './ZeitintervallEintrag.js'
import { CoPresent } from "@mui/icons-material";

/**
 * Auf dieser Seite sieht man drei Dinge:
 * 1. das eingene Profil
 * 2. Eine Übersicht des Arbeitzeitkontos mit den Funktionen Kommen, Gehen, Pause und Sonderbuchungen, so wie eine Zeitraumsuche
 * 3. Eine Auflistung aller Kommen, Gehen und Pause Buchungen mit einer bearbeiten und löschen Funktion
 */

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: props.currentUser,
            person: null,
            showPersonForm: false,
            showPersonDelete: false,
            showSonderBuchungAnlegen: false,
            zeitintervall: null,
            zeitintervallliste: [],
            start: null,
            ende: null,
            zeitraum: null,
            zeitraum_stunden: 0,
            authLoading: false,
            zeitraumClicked: false,
            pausebutton: 0,
        };
    }
    // Die Person die angemeldet ist wird anhand der google_user_id in den State geladen
    getPerson = () => {
        TimetrackerAPI.getAPI().getPersonByGoogle(this.props.currentUser.uid).then((person) =>
            this.setState({
                person: person,
            }
            )
        ).catch((e) =>
            this.setState({
                person: null,
            })
        );
    };

    // **********MEIN PROFIL FUNKTIONEN**********\\
    // SignUp anzeigen
    closeSignup = (person) => {
        this.setState({
            currentUser: person.getID(),
            person: person,
        });
    }

    showPersonForm = () => {
        if (!this.state.person) {
            this.setState({ showPersonForm: true });
        }
    }

    //Person bearbeiten
    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = () => {
        this.setState({
            showPersonForm: true,
        });
    };

    //Person Form
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

    //Person Loeschen
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

    // ********** ARBEITSZEITKONTO FUNKTIONEN **********\\
    // Gibt das akteullste Zeitintervall der Person zurück
    getZeitintervall = () => {
        this.timer = setTimeout(() => {
        TimetrackerAPI.getAPI().getZeitintervallbyMaxIDandPersonID(this.state.person.getID()).then((zeitintervallBO) => {
            if (zeitintervallBO)
                this.setState({
                    zeitintervall: zeitintervallBO,
                    authLoading: true,
                });
        });
        }
        , 200);
    }

        // Gibt das alle Zeitintervalle der Person zurück
        getZeitintervallbyPersonID = () => {
            this.timer = setTimeout(() => {
            TimetrackerAPI.getAPI().getZeitintervallbyPersonID(this.state.person.getID()).then((zeitintervallBOs) => {
                this.setState({
                    zeitintervallliste: zeitintervallBOs,
                    authLoading: false,
                });
            });
            // set loading to true
            this.setState({
                authLoading: true,
            });
        }
        , 200);
        }

    // ********** ARBEITSZEITKONTO FUNKTIONEN **********\\
    // Gibt das Arbeitszeitkonto der Person zurück
    getArbeitszeitkonto = () => {
        this.timer = setTimeout(() => {
        TimetrackerAPI.getAPI().getArbeitszeitkonto(this.state.person.getArbeitszeitkonto_id()).then((arbeitszeitkontoBO) => {
            this.setState({
                arbeitszeitkonto: arbeitszeitkontoBO,
                authLoading: false,
            });
        });
        // set loading to true
        this.setState({
            authLoading: true,
        });
    }
    , 200);
    }

    // ********** SONDERBUCHUNG FUNKTIONEN **********\\
    // Sonderbuchung Erstellen Dialog anzeigen
    sonderBuchungAnlegenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showSonderBuchungAnlegen: true,
        });
    }

    sonderBuchungAnlegenClosed = (arbeitszeitkonto) => {
        if (arbeitszeitkonto) {
            this.setState({
                showSonderBuchungAnlegen: false,
            });
            this.getArbeitszeitkonto()
        } else {
            this.setState({
                showSonderBuchungAnlegen: false,
            });
        }
    }

    // ********** ZEITINTERVALL FUNKTIONEN **********\\

    // Kommen Zeitpunkt und person ID adden
    // Rest wird vorerst auf 0 gesetzt 
    addZeitintervall = () => {
        if (this.state.zeitintervall == null || this.state.zeitintervall.getStart() && this.state.zeitintervall.getEnde()) {
            let newZeitintervall = new ZeitintervallBO()
            let start = this.dateSplit(); // Aktuelle Datetime wird aufgerufen und umgewandelt
            newZeitintervall.setID(0) // wird im Backend gesetzt
            newZeitintervall.setStart(start)
            newZeitintervall.setEnde("")
            newZeitintervall.setDauer(0.0) // wird beim update angepasst
            newZeitintervall.setPausenStart("")
            newZeitintervall.setPausenEnde("")
            newZeitintervall.setPausenDauer(0.0) // wird beim update angepasst
            newZeitintervall.setPerson_id(this.state.person.getID()) //current User
            TimetrackerAPI.getAPI().addZeitintervall(newZeitintervall).then(zeitintervall => {
                let date = new Date()
                window.alert("Hallo " + this.state.person.getVor_name() + "! Schön, dass du da bist." + "\nDu hast am " + date.toLocaleDateString() + " um " + date.toLocaleTimeString() + " eingstempelt!\nEinen schönen Arbeitstag!")
                this.getZeitintervall()
                this.setState(this.initialState);
                this.getZeitintervallbyPersonID();
                // this.getArbeitszeitkonto();
            })
            this.setState({
                start: new Date,
            })
        }
        else {
            window.alert("Du hast bereits eingestempelt")
        }
    }

    updateArbeitszeitkonto = () => {
        let arbeitszeitkonto = this.state.arbeitszeitkonto
        let start = new Date(this.startDatumSplitten())
        let endefront = new Date()
        let dauer = endefront.getTime() - start.getTime()
        let gesamtstunden = arbeitszeitkonto.getGesamtstunden() + this.msToTime(dauer)
        arbeitszeitkonto.setGesamtstunden(gesamtstunden)
        TimetrackerAPI.getAPI().updateArbeitszeitkonto(arbeitszeitkonto).then(arbeitszeitkonto => {

        })
    }

    // Ende des Zeitintervall wird gesetzt und die Dauer wird berechnet 
    updateZeitintervall = () => {
        let zeitintervall = this.state.zeitintervall;
        if (this.state.zeitintervall.getStart() != null && this.state.zeitintervall.getEnde() == null) {
            let ende = this.dateSplit(); // Aktuelle Datetime wird aufgerufen und umgewandelt
            let start = new Date(this.startDatumSplitten())
            let endefront = new Date()
            let dauer = endefront.getTime() - start.getTime()
            zeitintervall.setEnde(ende)
            zeitintervall.setDauer(this.msToTime(dauer).toFixed(3))
            TimetrackerAPI.getAPI().updateZeitintervall(zeitintervall)
            let date = new Date
            window.alert("Du hast am " + date.toLocaleDateString() + " um " + date.toLocaleTimeString() + " ausgestempelt!\nDu hast heute " + this.msToTime(dauer).toFixed(3) + " Stunden gearbeitet, und " + this.state.zeitintervall.getPausenDauer() + " Stunden Pause gemacht.\nAuf Wiedersehen!")
            this.setState(this.initialState);
            this.getZeitintervallbyPersonID();
            this.getZeitintervall();
            this.getArbeitszeitkonto();
            this.updateArbeitszeitkonto();
            {
                this.setState({
                    zeitintervall: null
                })
            }
        }

        else {
            window.alert("Du hast noch nicht eingestempelt!")
        }
    }

    // ********** PAUSEN FUNKTIONEN **********\\
    // Pausenstart wird gesetzt 
    addPause = () => {
        if (this.state.pausebutton === 1) {
            window.alert("Deine Pause hat bereits begonnen!")
        }
        else {
            if (this.state.zeitintervall != null) {
                let zeitintervall = this.state.zeitintervall;
                let pausen_start = this.dateSplit(); // Aktuelle Datetime wird aufgerufen und umgewandelt
                zeitintervall.setPausenStart(pausen_start);
                TimetrackerAPI.getAPI().updateZeitintervall(zeitintervall);
                let date = new Date;
                window.alert("Deine Pause hat um " + date.toLocaleTimeString() + " begonnen.\nSchöne Pause!");
                this.getZeitintervall();
                this.setState(this.initialState);
                this.getZeitintervallbyPersonID();
                this.setState({
                    pausebutton: 1
                })
            }
            else {
                window.alert("Du hast noch nicht eingestempelt!")
            }

        }
    }
    // Pausenende wird gesetzt und die Dauer wird berechnet 
    updatePause = () => {
        let zeitintervall = this.state.zeitintervall;
        let pausen_start = new Date(this.pausenStartSplitten())
        let pausen_ende = this.dateSplit(); // Aktuelle Datetime wird aufgerufen und umgewandelt
        let pausen_endefront = new Date();
        let dauer = pausen_endefront.getTime() - pausen_start.getTime();
        zeitintervall.setPausenEnde(pausen_ende);
        zeitintervall.setPausenDauer(this.msToTime(dauer).toFixed(3));
        TimetrackerAPI.getAPI().updateZeitintervall(zeitintervall)
        this.setState({
            pausebutton: 0
        })
        let date = new Date
        window.alert("Du hast Pause " + this.msToTime(dauer).toFixed(3) + " Stunden Pause gemacht.\nJetzt wird es wieder Zeit zu arbeiten!")
    }

    // ********** ZEITUMRECHNUNG FUNKTIONEN **********\\
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
        return new Date(year, month - 1, day, hours, min, sek) // month -1: Monate von [0-11]
    }

    pausenStartSplitten = () => {
        let date = this.state.zeitintervall.getPausenStart()
        let dateliste = date.split('')
        let year = String(dateliste[0] + dateliste[1] + dateliste[2] + dateliste[3])
        let month = String(dateliste[6])
        let day = String(dateliste[8] + dateliste[9])
        let hours = String(dateliste[11] + dateliste[12])
        let min = String(dateliste[14] + dateliste[15])
        let sek = String(dateliste[17] + dateliste[18])
        return new Date(year, month - 1, day, hours, min, sek)
    }

    // Millisekunden in Stunden und Minuten
    // Wird zu Berechnung der Dauer zwischen 2 Datetimes benötigt
    msToTime = (s) => {
        let ms = (s % 1000) / 60
        s = (s - ms) / 1000
        let secs = (s % 60) / 60
        s = (s - secs) / 60
        let mins = (s % 60) / 60
        let hrs = (s - mins) / 60

        return parseFloat(hrs + '.' + mins + secs)
    }

    zeitraumClicked = () => {
        this.zeitraumZeitintervall(this.state.zeitraum);
    };

    zeitraumZeitintervall = (zeitraum) => {
        this.state.zeitraum_stunden = 0
        this.state.zeitintervallliste.map(zeitintervall => {
            if (zeitintervall.getStart().includes(zeitraum)) {
                this.state.zeitraum_stunden += zeitintervall.getDauer() - zeitintervall.getPausenDauer();
            }
        },
        )
        this.zeitraumListe(zeitraum);
        this.zeitraumZeitintervallState()
    }

    zeitraumZeitintervallState = () => {
        this.setState({
            zeitraumClicked: true
        })
    }

    // Erstellt eine List emit Zeitintervalle in dem gegeben Monat
    zeitraumListe = (zeitraum) => {
        let liste = []
        this.state.zeitintervallliste.map(zeitintervall => {
            if (zeitintervall.getStart().includes(zeitraum)) {
                liste.push(zeitintervall)
            }
        })
        this.zeitraumListeState(liste)
    }

    // State der zeitintervalliste wird neu gesetzt
    zeitraumListeState = (liste) => {
        this.setState({
            zeitintervallliste: liste
        })
    }

    // Textfelder ändern
    textFieldValueChange = (event) => {
        const value = event.target.value;

        let error = false;
        if (value.trim().length === 0) {
            error = true;
        }

        this.setState({
            [event.target.id]: event.target.value,
        });
        this.getZeitintervallbyPersonID()
    };

    // Wird aufgerufen wenn man sich neu anmeldet
    reloadUser = () => {
        this.getPerson()
        this.getArbeitszeitkonto()
        this.getZeitintervallbyPersonID()
        this.getZeitintervall()
        this.getNewPerson()
    };

    getNewPerson = () => {
        this.props.getPerson()
    }


    componentDidMount() {
        this.getPerson();
        this.getZeitintervallbyPersonID();
        this.getZeitintervall();
        this.getArbeitszeitkonto();
        this.getNewPerson();
    }

    render() {
        const { currentUser } = this.props;
        const { person, showPersonForm, showPersonDelete, zeitintervallliste, showSonderBuchungAnlegen, arbeitszeitkonto, authLoading, zeitraum, zeitraum_stunden } = this.state;

        return (
            <div><LoadingProgress show={authLoading} />
                {person && arbeitszeitkonto ?
                    <div>
                        <Grid container xs={12} spacing={2} alignItems="center">
                            <Grid item xs={12}/>
                            <Grid item xs={12}/>
                            <Grid item xs={12}>
                                <Paper elevation={3}>
                                    <Grid container xs={12} spacing={2}>
                                        <Grid item xs={12}>
                                        <Typography variant='h5' component='h1' align='center' color='#0098da' fontFamily='Courier'>
                                            Mein Profil
                                        </Typography>
                                        <br/>
                                        </Grid>
                                        <Grid item xs={3}/>
                                        <Grid item xs={6}>
                                            <Typography>
                                                <strong>Name:</strong> {person.getVor_name()}{" "}
                                                {person.getNach_name()}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}/>
                                        <Grid item xs={3}/>
                                        <Grid item xs={6}>
                                            <Typography>
                                                <strong>Email:</strong> {person.getEmail()}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}/>
                                        <Grid item xs={3}/>
                                        <Grid item xs={6}>
                                            <Typography>
                                                <strong>Benutzername:</strong> {person.getBenutzer_name()}
                                            </Typography>
                                            <br/>
                                            <Divider/>
                                            <br/>
                                        </Grid>
                                        <Grid item xs={3}/>
                                        <Grid item xs={12}>
                                            <Button variant="contained" onClick={this.bearbeitenButtonClicked}>
                                                <EditIcon/>
                                                &nbsp; Profil bearbeiten
                                            </Button>
                                            &ensp; &ensp;
                                            <Button variant="contained" onClick={this.deleteButtonClicked}>
                                                <DeleteIcon/>
                                                &nbsp; Profil löschen
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}/>
                                    </Grid>
                                </Paper>
                            </Grid>
                        
                            <Grid item xs={12}/>
                            <Grid item xs={12}>
                                <Paper elevation={3}>
                                    <Grid container spacing={1} xs={12}>
                                        <Grid item xs={12}>
                                            <Typography variant='h5' component='h1' align='center' color='#0098da' fontFamily='Courier'>
                                                Mein Arbeitszeitkonto
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" onClick={this.sonderBuchungAnlegenButtonClicked}>
                                                Sonderbuchung
                                            </Button>
                                        </Grid>
                                        <Grid item xs={1}/>
                                        <Grid item xs={10}>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead sx={{backgroundColor: '#dedede'}}>
                                                        <TableRow>
                                                            <TableCell align="left">Gesamt Stunden {new Date().getFullYear()}</TableCell>
                                                            <TableCell align="left">Gearbeitete Stunden {new Date().getFullYear()}</TableCell>
                                                            <TableCell align="left">Urlaubstage {new Date().getFullYear()}</TableCell>
                                                            <TableCell align="left">Krankheitstage {new Date().getFullYear()}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="center">1680</TableCell>
                                                            <TableCell align="center">{arbeitszeitkonto.getGesamtstunden().toFixed(3)}</TableCell>
                                                            <TableCell align="center">{arbeitszeitkonto.getUrlaubstage()}</TableCell>
                                                            <TableCell align="center">{arbeitszeitkonto.getKrankheitstage()}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                        <Grid item xs={1}/>
                                        <Grid item xs={12}>
                                            <Typography align="center">Um nach deine Stunden in einem bestimmten Monat zu suchen, fülle das Such-Feld aus und klicke den Button.</Typography>
                                        </Grid>
                                        <Grid item align="right" xs={6}>
                                            <TextField autoFocus  type='text' required margin='normal' id='zeitraum' label='Monat: (yyyy-mm)' value={zeitraum} onChange={this.textFieldValueChange} />
                                        </Grid>
                                        <Grid item xs={6} align="left"
                                            sx={{
                                                height: 75,
                                                marginTop: 2,
                                            }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                aria-label="add"
                                                fullWidth
                                                onClick={this.zeitraumClicked}
                                                startIcon={<AccessTimeIcon />}
                                                sx={{
                                                    height: 50,
                                                    width: 250,
                                                }}
                                            >
                                                Zeitraum suchen
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography align="center"><b>Deine gearbeiteten Stunden im Monat {zeitraum}: </b> {zeitraum_stunden.toFixed(3)}</Typography>
                                        </Grid>
                                        <Grid item xs={2}/>
                                    </Grid>           
                                </Paper>
                            </Grid>
                            <Grid item xs={12}/>
                                <Grid item xs={12}>
                                    <Paper>
                                        <Grid container xs={12} spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant='h5' component='h1' align='center' color='#0098da' fontFamily='Courier'>
                                                    Stempelfunktion
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}/>
                                            <Grid item xs={2}>
                                                <Button variant="contained" onClick={this.addZeitintervall}>
                                                    Kommen
                                                </Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button variant="contained" onClick={this.addPause}>
                                                    Pause
                                                </Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant="contained" onClick={this.updatePause}>
                                                    Pause beenden
                                                </Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button variant="contained" onClick={this.updateZeitintervall}>
                                                    Gehen
                                                </Button>
                                            </Grid>
                                            <Grid item xs={1}/>
                                            <Grid item xs={12}/>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            <Grid item xs={12}/> 
                        </Grid>
                        
                        <Grid container xs={12} sx={{
                            backgroundColor: '#dedede'
                        }}>
                            <Grid item xs={12}/>
                            <Grid item xs={2}>
                                <Typography>Kommen</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>Gehen</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>Pause</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>Stunden</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>Bearbeiten</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>Löschen</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                zeitintervallliste.map(zeitintervall =>
                                    <ZeitintervallEintrag key={zeitintervall[zeitintervall.id]} zeitintervall={zeitintervall} getArbeitszeitkonto={this.getArbeitszeitkonto} show={this.props.show} getZeitintervallbyPersonID={this.getZeitintervallbyPersonID} />)
                            }
                        </Grid>
                        <PersonForm show={showPersonForm} person={person} onClose={this.personFormClosed} />
                        <PersonDelete show={showPersonDelete} person={person} onClose={this.personDeleteClosed} getPersonbyID={this.getPerson} currentPersonNull={this.currentPersonNull} />
                        <SonderBuchungAnlegen show={showSonderBuchungAnlegen} arbeitszeitkonto={arbeitszeitkonto} onClose={this.sonderBuchungAnlegenClosed} getArbeitszeitkonto={this.getArbeitszeitkonto} />
                    </div>
                    : <div>
                        <SignUp onClose={this.closeSignup} currentUser={currentUser} reloadUser={this.reloadUser} />
                    </div>}
            </div>
        );
    }
}

export default Home;
