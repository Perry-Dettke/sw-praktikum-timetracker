import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, InputLabel, FormControl, Select, MenuItem } from '@mui/material';

import TimetrackerAPI from "../../api/TimetrackerAPI";

/** 
 * In diesem Dialog wird ein Formular angezeigt, mit dem Sonderbuchungen angelegt werden können.
*/

class SonderBuchungAnlegen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tage: 0,
      ereignis: null,
    };

    this.initialState = this.state;
  }

  handleChangeText = (e) => {
    this.setState({ tage: e.target.value });
  }

  handleChange = (e) => {
    this.setState({ ereignis: e.target.value });
  }
  // Dialog schließen
  handleClose = () => {
    this.setState(this.initialState);
    this.props.onClose();
  }

  updateArbeitszeitkontoUrlaubstage = () => {
    let arbeitszeitkonto = this.props.arbeitszeitkonto;
    if (arbeitszeitkonto.getUrlaubstage() < parseInt(this.state.tage)){
    window.alert("Du hast leider nur noch " + arbeitszeitkonto.getUrlaubstage() + " Tage Urlaub!")}
    else{
    let neuetage = arbeitszeitkonto.getUrlaubstage() - parseInt(this.state.tage)
    arbeitszeitkonto.setUrlaubstage(neuetage)
    TimetrackerAPI.getAPI().updateArbeitszeitkonto(arbeitszeitkonto).then(arbeitszeitkonto => {
      this.props.getArbeitszeitkonto();
      this.setState(this.initialState);
      this.props.onClose(arbeitszeitkonto); //Aufrufen parent in backend
    })
    this.props.onClose(arbeitszeitkonto)
    window.alert("Einen schönen Urlaub, erhol dich gut!")
  }}

  updateArbeitszeitkontoKrankheitstage = () => {
    let arbeitszeitkonto = this.props.arbeitszeitkonto;
    let neuetage = arbeitszeitkonto.getKrankheitstage() + parseInt(this.state.tage)
    arbeitszeitkonto.setKrankheitstage(neuetage)

    TimetrackerAPI.getAPI().updateArbeitszeitkonto(arbeitszeitkonto).then(arbeitszeitkonto => {
      this.props.getArbeitszeitkonto();
      this.setState(this.initialState);
      this.props.onClose(arbeitszeitkonto); //Aufrufen parent in backend
    })
    this.props.onClose(arbeitszeitkonto)
    window.alert("Gute Besserung!")
  }

  ereignisCheck = () => {
    if (this.state.ereignis == "Urlaub")
      this.updateArbeitszeitkontoUrlaubstage()
    else 
      this.updateArbeitszeitkontoKrankheitstage()
  }

  render() {
    const { show } = this.props;
    const { tage } = this.state;

    let title = 'Neue Sonderbuchung';
    let title2 = "Wählen Sie eine Art für Ihre Buchung aus"
    let title3 = "Wählen Sie die Anzahl an Tagen"
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
              <form  noValidate autoComplete='off'>
                <br/>
                <FormControl fullWidth>
                  <InputLabel id="ereignis">Art</InputLabel>
                  <Select
                    labelId="Sonderbuchung"
                    name="ereignis"
                    size="large"
                    label="Art"
                    fullWidth
                    onChange={this.handleChange}
                  >
                    <MenuItem value={"Urlaub"}>Urlaub</MenuItem>
                    <MenuItem value={"Krankheitstage"}>Krankheitstage</MenuItem>
                  </Select>
                </FormControl>
                <br></br>
                <FormControl fullWidth>
                  <DialogContentText>
                    {title3}
                  </DialogContentText>
                  <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} autoFocus type='number' required fullWidth margin='normal' id='tage' label='Tage:' value={tage} onChange={this.handleChangeText} />
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={this.handleClose}>
                Abbrechen
              </Button>
              <Button variant='contained' color='primary' onClick={this.ereignisCheck}>
                Bestätigen
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        : null
    );
  }
}

export default SonderBuchungAnlegen;