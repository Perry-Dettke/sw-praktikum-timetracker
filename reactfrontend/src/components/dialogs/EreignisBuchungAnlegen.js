import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import { TableCell } from '@material-ui/core';
import TimetrackerAPI from "../../api/TimetrackerAPI";
import ProjektBO from '../../api/ProjektBO'
import { EventBusyRounded } from '@mui/icons-material';
import BuchungBO from "../../api/BuchungBO";



class EreignisBuchungAnlegen extends Component {



  constructor(props) {
    super(props);

    this.state = {
      projektliste: [],
      projekt: null,
      aktivitaetliste: [],
      stunden: null,
      aktivitaet_id: 0

    };

    this.initialState = this.state;
  }


  //Gibt Projekte der Person zurück
  getProjektByPerson = () => {
    TimetrackerAPI.getAPI().getProjektByPerson(3).then((projektBOs) => {
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


  addBuchung = () => {
    let newBuchung = new BuchungBO()
    newBuchung.setID(0) // bekommt im Backend die max id
    newBuchung.setDatum(0) // bekommt im Backend das aktuelle Datum
    newBuchung.setStunden(0)
    newBuchung.setPerson_id(3) // muss id vom current user rein
    newBuchung.setAktivitaet_id(0)
    newBuchung.setEreignisbuchung(1)
    TimetrackerAPI.getAPI().addBuchung(newBuchung).then(buchung => {
        console.log(buchung)
        this.setState(this.initialState);
        this.props.onClose(buchung); 
    })
}

  // Dialog schließen
  handleClose = () => {
    this.setState(this.initialState);
    this.props.onClose();
    this.getProjektByPerson()
  }

  handleChange = (e) => {
    this.setState({ projekt: e.target.value });
    this.timer = setTimeout(() =>
      this.getAktivitaetbyProjektID()
      , 200);
  }

  handleChange2 = (e) => {
    this.setState({ aktivitaet_id: e.target.value });
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

    const { show } = this.props;
    const { projektliste, projekt, aktivitaetliste, stunden } = this.state;
    console.log(aktivitaetliste)
    console.log(projekt)

    let title = 'Neue Ereignisbuchung';
    let title2 = "Wählen Sie das Projekt auf das Sie buchen möchten."
    let title3 = "Wählen Sie die Aktivität auf das Sie buchen möchten."
    let title4 = "Wählen Anzahl der Stunden die Sie buchen möchten."
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

                  <DialogContentText>
                    {title4}
                  </DialogContentText>
                  <TextField
                    label="Stunden"
                    variant="outlined"
                    name="stunden"
                    size="small"
                    value={stunden}
                    onChange={this.textFieldValueChange}
                    autocomplete='off'
                  />
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

export default EreignisBuchungAnlegen;
