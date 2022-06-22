import React, { Component } from "react";

import {Typography, Button, IconButton, Grid, TextField, Accordion, AccordionSummary, AccordionDetails, Table, TableCell, TableHead, TableRow, TableBody, Box} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import TimetrackerAPI from "../../api/TimetrackerAPI";
import { BorderAllOutlined, BorderColor, StayCurrentLandscapeTwoTone } from "@mui/icons-material";
import AuswertungListenEintragPerson from "./AuswertungListenEintragPerson";

class AuswertungListenEintrag extends Component {
  constructor(props) {
    super(props);

    //gebe einen leeren status
    this.state = {
      aktivitaetliste: [],
      buchungliste: [],
      personliste: [],
      start: null,
      ende: null,
    };
  }

  //Gibt das aktuelle Projekt zurück
  getProjekt = () => {
    this.props.getProjekt();
  };

  //Gibt Aktivitaet pro Projekt zurück
  getAktivitaetbyProjektID = (start = "2000-01-01", ende = "3000-01-01") => {
    TimetrackerAPI.getAPI()
      .getAktivitaetbyProjektID(this.props.projekt.getID(), start, ende)
      .then((aktivitaetBOs) => {
        this.setState({
          aktivitaetliste: aktivitaetBOs,
        });
      });
  };

  zeitraumClicked = () => {
    this.getAktivitaetbyProjektID(this.state.start, this.state.ende);
  };

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
  };

  // getBuchungbyAktivitaetID = () => {

  //     if (this.state.aktivitaetliste) {
  //         for (let i = 0; i < this.state.aktivitaetliste.length; i++) {
  //             let id = this.state.aktivitaetliste[i].getID()
  //             TimetrackerAPI.getAPI().getBuchungbyAktivitaetID(id).then((buchungBOs) => {
  //                 let stunden = 0
  //                 buchungBOs.map(buchungBO => {
  //                     stunden += buchungBO.getStunden()
  //                 })
  //                 this.state.aktivitaetliste[i].setStunden(stunden)
  //             });
  //         };
  //     };
  // }

  // getBuchungbyAktivitaetID = () => {
  //     this.timer = setTimeout(() => {
  //         if (this.state.aktivitaetliste) {
  //             var aktivitaetliste = this.state.aktivitaetliste
  //             for (let i = 0; i < aktivitaetliste.length; i++) {
  //                 let id = aktivitaetliste[i].getID()
  //                 TimetrackerAPI.getAPI().getBuchungbyAktivitaetID(id).then((stundenAPI) => {

  //                     this.setState({
  //                         stundenliste: [...this.state.stundenliste, stundenAPI]

  //                     });
  //                 })
  //             };
  //         };
  //     }
  //         , 1000);
  // }

  componentDidMount() {
    this.getAktivitaetbyProjektID();
  }

  //Renders the component
  render() {
    const { projekt } = this.props;
    const { aktivitaetliste, buchungliste, personliste, start, ende } = this.state;
    // console.log("Akti", aktivitaetliste)
    console.log(aktivitaetliste, "Test");

    return aktivitaetliste ? (
      <div>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} textAlign="center">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  backgroundColor: "#dedede",
                }}
              >
                <Typography>
                  <b>{projekt.bezeichnung}</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "#eeeeee",
                }}
              >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography align="left">Um nach einem bestimmten Zeitraum zu suchen, fülle die Such-Felder aus und klicke den Button. Dies führt zu einer Aktualisierung der Ist-Stunden und der Reststunden.</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='start' label='Start: (yyyy-mm-dd)' value={start} onChange={this.textFieldValueChange} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='ende' label='Ende: (yyyy-mm-dd)' value={ende} onChange={this.textFieldValueChange} />
                    </Grid>
                    <Grid item xs={3} 
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
                </Grid>
                <br/>
                <Table>
                  <TableHead
                    sx={{
                      backgroundColor: "#B4B4B4",
                    }}
                  >
                    <TableRow>
                      <TableCell>Aktivität</TableCell>
                      <TableCell>Kapazität</TableCell>
                      <TableCell>Ist-Stunden</TableCell>
                      <TableCell>Reststunden</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {aktivitaetliste.map((aktivitaet, index) => (
                      <TableRow key={`${aktivitaet.getID() + index}`}>
                        <TableCell>
                          {" "}
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              sx={{
                                backgroundColor: "#dedede",
                              }}
                            >
                              <Typography>
                                <b>{aktivitaet.getBezeichnung()}</b>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                backgroundColor: "#eeeeee",
                              }}
                            >
                               <AuswertungListenEintragPerson key={(aktivitaet)[aktivitaet.id]} aktivitaet={aktivitaet} start={start} ende={ende} />
                            </AccordionDetails>
                          </Accordion>
                        </TableCell>
                        <TableCell>
                          <Typography> {aktivitaet.getKapazitaet()}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography> {aktivitaet.getStunden()}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {" "}
                            {aktivitaet.getKapazitaet() - aktivitaet.getStunden()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </div>
    ) : null;
  }
}

export default AuswertungListenEintrag;
