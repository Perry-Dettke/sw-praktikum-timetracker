import React, { Component } from 'react';
import { Button, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@mui/material/InputLabel";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import TimetrackerAPI from "../../api/TimetrackerAPI";
import BuchungBO from "../../api/BuchungBO";

/**
 * In diesem Dialog wird ein Formular angezeigt, mit dem der angemeldete User eine Projektbuchung anlegen kann.
*/

class ProjektBuchungAnlegen extends Component {



  constructor(props) {
    super(props);

    this.state = {
      projektliste: [],
      projekt: null,
      aktivitaetliste: [],
      aktivitaet_id: 0,
      start: new Date,
      ende: new Date,

    };

    this.initialState = this.state;
  }


  //Gibt Projekte der Person zurück
  getProjektByPerson = () => {
    TimetrackerAPI.getAPI().getProjektByPerson(this.props.currentPerson.getID()).then((projektBOs) => {
      this.setState({
        projektliste: projektBOs,
      });
    });
  }

  //Gibt Aktivitaet pro Projekt zurück
  getAktivitaetbyProjektID = () => {
    TimetrackerAPI.getAPI().getAktivitaetbyProjektID(this.state.projekt.getID()).then((aktivitaetBOs) => {
      this.setState({
        aktivitaetliste: aktivitaetBOs,
      });
    });
  }

  //Erstellt eine Buchung, wird mit dem Button aufgerufen
  addBuchung = () => {
    if (this.dateSplit() > this.state.projekt.getStartzeitraum() && this.dateSplit() < this.state.projekt.getEndzeitraum()) {
      let newBuchung = new BuchungBO()
      newBuchung.setID(0) // bekommt im Backend die max id
      newBuchung.setDatum("2000-01-01") // bekommt im Backend das aktuelle Datum
      newBuchung.setStunden(this.msToTime((this.state.ende.getTime() - this.state.start.getTime())))
      newBuchung.setPerson_id(this.props.currentPerson.getID()) // muss id vom current user rein
      newBuchung.setAktivitaet_id(this.state.aktivitaet_id)
      TimetrackerAPI.getAPI().addBuchung(newBuchung).then(buchung => {
        this.setState(this.initialState);
        this.props.onClose(buchung);
        this.props.getBuchungbyPersonID();
        this.getProjektByPerson()
      })
    }
    else {
      window.alert("Buchung nicht möglich!\nDie Projektlaufzeit hat noch nicht begonnen oder ist breits abgelaufen.\nDie Projektlaufzeit ist vom " + this.state.projekt.getStartzeitraum() + " - " + this.state.projekt.getEndzeitraum() + ".")
    }
  }

  // Datum wird in das richtige Format gebracht
  dateSplit = () => {
    let newDate = new Date()
    let date = newDate.toLocaleDateString() + " " + newDate.toLocaleTimeString()
    if(date.length === 17){
    let dateliste = date.split('')
    let day = String(0 + dateliste[0])
    let month = "0" + String(dateliste[2])
    let year = String(dateliste[4] + dateliste[5] + dateliste[6] + dateliste[7])
    let time = String(dateliste[9] + dateliste[10] + dateliste[11] + dateliste[12] + dateliste[13] + dateliste[14] + dateliste[15] + dateliste[16])
    return year + "-" + month + "-" + day + " " + time
    }
    else{
        let dateliste = date.split('')
        let day = String(dateliste[0] + dateliste[1])
        let month = "0" + String(dateliste[3])
        let year = String(dateliste[5] + dateliste[6] + dateliste[7] + dateliste[8])
        let time = String(dateliste[10] + dateliste[11] + dateliste[12] + dateliste[13] + dateliste[14] + dateliste[15] + dateliste[16] + dateliste[17])
        return year + "-" + month + "-" + day + " " + time
    }
}

  // Dialog schließen
  handleClose = () => {
    this.setState(this.initialState);
    this.props.onClose();
    this.getProjektByPerson()
  }

  //State für Projekt ändern (Dropdown)
  handleChange = (e) => {
    this.setState({ projekt: e.target.value });
    this.timer = setTimeout(() =>
      this.getAktivitaetbyProjektID()
      , 200);
  }

  //State für Aktivitaet ändern (Dropdown)
  handleChange2 = (e) => {
    this.setState({ aktivitaet_id: e.target.value });
  }

  //State für Startzeitraum ändern (DatePicker)
  handleChangeStart = (e) => {
    this.setState({ start: e });
  }

  //State für Endzeitraum ändern (DatePicker)
  handleChangeEnde = (e) => {
    this.setState({ ende: e });
  }

  // Millisekunden werden in Stunden umgerechnet
  msToTime = (duration) => {
    var minutes = Math.floor(duration / (1000 * 60) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    return parseFloat(hours + "." + ((minutes) / 6) * 10)
  }

  // Textfelder ändern
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      stunden: event.target.value,
    });
  }



  componentDidMount() {
    this.getProjektByPerson();
  }

  render() {

    const { show, currentPerson } = this.props;
    const { projektliste, projekt, aktivitaetliste, start, ende } = this.state;

    let title = 'Neue Projektbuchung';
    let title2 = "Wählen Sie das Projekt auf das Sie buchen möchten."
    let title3 = "Wählen Sie die Aktivität auf die Sie buchen möchten."
    let title4 = "Wählen den Startzeitpunkt für ihre Projektbuchung."
    let title5 = "Wählen den Endzeitpunkt für ihre Projektbuchung."
    return (
      show ?
        <div>
          <Dialog open={show} onClose={this.handleClose} maxWidth='sm' fullWidth>
            <DialogTitle>
              {title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {title2}
              </DialogContentText>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="projekt">Projekt</InputLabel>
                  <Select
                    labelId="Projekt"
                    name="projekt"
                    size="medium"
                    label="Projekt"
                    autoWidth
                    onChange={this.handleChange}
                  >
                    {projektliste.map((projekt) => (
                      <MenuItem
                        key={projekt.getID()}
                        value={projekt}
                      >
                        {projekt.getBezeichnung()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <br></br>
              {aktivitaetliste.length != 0 ?

                <FormControl fullWidth>
                  <DialogContentText>
                    {title3}
                  </DialogContentText>
                  <InputLabel id="aktivitaet">Aktivität</InputLabel>
                  <Select
                    labelId="Aktivitaet"
                    name="aktivitaet"
                    size="medium"
                    label="Aktivitaet"
                    autoWidth
                    onChange={this.handleChange2}
                  >

                    {aktivitaetliste.map((aktivitaet) => (
                      <MenuItem
                        key={aktivitaet.getID()}
                        value={aktivitaet.getID()}
                      >
                        {aktivitaet.getBezeichnung()}
                      </MenuItem>
                    ))}
                  </Select>
                  <br></br>
                  <DialogContentText>
                    {title4}
                  </DialogContentText>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>

                      <DateTimePicker
                        label="start"
                        value={start}
                        onChange={this.handleChangeStart}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                  <br></br>
                  <DialogContentText>
                    {title5}
                  </DialogContentText>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>

                      <DateTimePicker
                        label="ende"
                        value={ende}
                        onChange={this.handleChangeEnde}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
                : null
              }
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={this.handleClose}>
                Abbrechen
              </Button>
              <Button variant='contained' color='primary' onClick={this.addBuchung}>
                Bestätigen
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        : null
    );
  }
}

export default ProjektBuchungAnlegen;
