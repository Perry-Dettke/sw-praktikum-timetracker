import * as React from "react";
import { Component } from "react";
import { Paper, Box, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Table, IconButton, Grid, Typography } from "@mui/material";
import TimetrackerAPI from "../../api/TimetrackerAPI";
import EditIcon from "@mui/icons-material/Edit";
import PersonForm from "../dialogs/PersonForm";
import PersonDelete from "../dialogs/PersonDelete";
import EreignisBuchungAnlegen from "../dialogs/EreignisBuchungAnlegen.js"
import SignUp from './SignUp';
import ZeitintervallBO from "../../api/ZeitintervallBO";
import ZeitintervallEintrag from './ZeitintervallEintrag.js'
import { CoPresent } from "@mui/icons-material";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: props.currentUser,
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
    // **********MEIN PROFIL FUNKTIONEN**********\\

    // getPersonbyID = () => {
    //     var api = TimetrackerAPI.getAPI();
    //     api.getPersonbyID(2).then((personBO) => {
    //         this.setState({
    //             person: personBO,
    //         });
    //     });
    // };


    getPerson = () => {
        console.log(this.props.currentUser.uid)
        TimetrackerAPI.getAPI().getPersonByGoogle(this.props.currentUser.uid).then((person) =>
            this.setState({
              person: person,
            })
          ).catch((e) =>
            this.setState({
              person: null,
            })
          );
      }; 

      // SignUp anzeigen
  closeSignup = (person) => {
    this.setState({
      currentUser: person.getID(),
      person: person,
    });
  }

  showPersonForm = () => {
      if(!this.state.person) {
          this.setState({ showPersonForm: true });
      }
  }



    //Person bearbeiten
    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = (event) => {
        event.stopPropagation();
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

    // muss current user ID rein
    getZeitintervall = () => {
        TimetrackerAPI.getAPI().getZeitintervallbyMaxIDandPersonID(2).then((zeitintervallBO) => {
            if (zeitintervallBO)
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

    // ********** EREIGNISBUCHUNG FUNKTIONEN **********\\

    // Ereignisbuchung Erstellen Dialog anzeigen
    ereignisBuchungAnlegenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showEreignisBuchungAnlegen: true,
        });
    }

    ereignisBuchungAnlegenClosed = (arbeitszeitkonto) => {
        if (arbeitszeitkonto) {
            this.setState({
                showEreignisBuchungAnlegen: false
            });
            this.getArbeitszeitkonto()
        } else {
            this.setState({
                showEreignisBuchungAnlegen: false
            });
        }
    }


    // ********** ARBEITSZEITKONTO FUNKTIONEN **********\\

    // currentuser.getArbeitszeitkontoID() in die Klammer statt 1
    getArbeitszeitkonto = () => {
        TimetrackerAPI.getAPI().getArbeitszeitkonto(4).then((arbeitszeitkontoBO) => {
            this.setState({
                arbeitszeitkonto: arbeitszeitkontoBO,
            });
        });
    }

    
    reloadUser = () => {
        console.log('reload')
        this.getPerson()
            this.getArbeitszeitkonto()
    
    };




    // ********** ZEITINTERVALL FUNKTIONEN **********\\

    // Kommen Zeitpunkt und person ID adden
    // Rest wird vorerst auf 0 gesetzt 
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
            window.alert("Hallo " + this.state.person.getVor_name() + "! Schön, dass du da bist." + "\nDu hast am " + date.toLocaleDateString() + " um " + date.toLocaleTimeString() + " eingstempelt!\nEinen schönen Arbeitstag!")
            this.getZeitintervall()
            this.setState(this.initialState);
            this.getZeitintervallbyPersonID()
        })
        this.setState({
            start: new Date
        })
    }

    updateZeitintervall = () => {
        let ende = this.dateSplit(); // Aktuelle Datetime wird aufgerufen und umgewandelt
        let start = new Date(this.startDatumSplitten())
        let endefront = new Date()
        let dauer = endefront.getTime() - start.getTime()
        let zeitintervall = this.state.zeitintervall;
        zeitintervall.setEnde(ende)
        zeitintervall.setDauer(this.msToTime(dauer).toFixed(3))
        TimetrackerAPI.getAPI().updateZeitintervall(zeitintervall)
        let date = new Date
        window.alert("Du hast am " + date.toLocaleDateString() + " um " + date.toLocaleTimeString() + " ausgestempelt!\nDu hast heute " + this.msToTime(dauer).toFixed(3) + " Stunden gearbeitet!\nAuf Wiedersehen!")
        this.setState(this.initialState);
        this.getZeitintervallbyPersonID();
        this.getArbeitszeitkonto();
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


    // Millisekunden in Stunden und Minuten
    // Wird zu Berechnung der Dauer zwischen 2 Datetimes benötigt
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
        this.getPerson();
        this.getZeitintervallbyPersonID();
        this.getZeitintervall();
        this.getArbeitszeitkonto();
    }

    render() {
        const {currentUser} = this.props;
        const { person, showPersonForm, showPersonDelete, zeitintervall, zeitintervallliste, showEreignisBuchungAnlegen, arbeitszeitkonto } = this.state;
        // console.log(zeitintervall)
        // console.log(start)
        // console.log(zeitintervallliste)
        console.log(arbeitszeitkonto)

        return person && arbeitszeitkonto ?
            <div>
                <Box
                    sx={{
                        float: "left",
                        display: "flex",
                        flexWrap: "wrap",
                        "& > :not(style)": {
                            m: 2,
                            width: 500,
                            height: 300,
                            alignItems: "center",
                        },
                    }}
                >
                    <Paper elevation={3}>
                        <div>
                        <Typography variant='h5' component='h1' align='center' color='#0098da' fontFamily='Courier'>
                        Mein Profil
                         </Typography>
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
                    </Box>
                    <Box sx={{
                        float: "right",
                        display: "flex",
                        flexWrap: "wrap",
                        "& > :not(style)": {
                            m: 2,
                            width: 800,
                            height: 300,
                            alignItems: "center",
                        },
                    }}>
                    <Paper elevation={3}>
                        <div>
                        <Typography variant='h5' component='h1' align='center' color='#0098da' fontFamily='Courier'>
                        Mein Arbeitszeitkonto
                         </Typography>
                            <TableContainer
                                component={Paper}
                                sx={{ maxWidth: 750, margin: "auto" }}
                            >
                                <Table sx={{ minWidth: 180 }} aria-label="simple table">
                                    <TableHead>
                                        <Button variant="contained"  onClick={this.addZeitintervall}>
                                            Kommen
                                        </Button>
                                        <Button variant="contained" onClick={this.updateZeitintervall}>
                                            Gehen
                                        </Button>
                                        <TableRow>
                                            <TableCell align="right">Gesamt Stunden {new Date().getFullYear()}</TableCell>
                                            <TableCell align="right">Gearbeitete Stunden {new Date().getFullYear()}</TableCell>
                                            <TableCell align="right">Urlaubstage {new Date().getFullYear()}</TableCell>
                                            <TableCell align="right">Krankheitstage {new Date().getFullYear()}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">1680</TableCell>
                                            <TableCell align="center">{arbeitszeitkonto.getGesamtstunden().toFixed(3)}</TableCell>
                                            <TableCell align="center">{arbeitszeitkonto.getUrlaubstage()}</TableCell>
                                            <TableCell align="center">{arbeitszeitkonto.getKrankheitstage()}</TableCell>
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
                                <Typography></Typography>
                            </Grid>

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
                                    <ZeitintervallEintrag key={zeitintervall[zeitintervall.id]} zeitintervall={zeitintervall} getArbeitszeitkonto={this.getArbeitszeitkonto} show={this.props.show} getZeitintervallbyPersonID={this.getZeitintervallbyPersonID}/>)
                            }
                        </Grid>

                <PersonForm show={showPersonForm} person={person} onClose={this.personFormClosed} />
                <PersonDelete show={showPersonDelete} person={person} onClose={this.personDeleteClosed} getPersonbyID={this.getPersonbyID} />
                <EreignisBuchungAnlegen show={showEreignisBuchungAnlegen} arbeitszeitkonto={arbeitszeitkonto} onClose={this.ereignisBuchungAnlegenClosed} getArbeitszeitkonto={this.getArbeitszeitkonto} />
            </div>
            : (
                <SignUp onClose={this.closeSignup} currentUser={currentUser} reloadUser={this.reloadUser} />
            );
    }
}

export default Home;
