import React, { Component } from 'react';
import { Button, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
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
      ereignisliste: [],
      ereignis: null,
      anzahl: 0,


    };

    this.initialState = this.state;
  }


  //Gibt alle Ereignisse zurück
  getEreignis = () => {
    TimetrackerAPI.getAPI().getEreignis().then((ereignisBOs) => {
      this.setState({
        ereignisliste: ereignisBOs,
      });
    });
  }


  // Dialog schließen
  handleClose = () => {
    this.setState(this.initialState);
    this.props.onClose();
  }


  handleChange = (e) => {
    this.setState({ ereignis: e.target.value });
  }
  
  // componentDidMount() {
  //   this.getEreignis();
  // }

  render() {

    const { show } = this.props;
    const { ereignisliste } = this.state;





    let title = 'Neue Ereignisbuchung';
    let title2 = "Wählen Sie ein Ereignis aus"
    let title3 = "Wählen Sie die Anzahl wie oft sie das Ereignis buchen möchten"
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
                  <InputLabel id="ereignis">Ereignis</InputLabel>
                  <Select
                    labelId="Ereignis"
                    name="ereignis"
                    size="medium"
                    label="Ereignis"
                    autoWidth
                    onChange={this.handleChange}
                  >
                    {ereignisliste.map((ereignis) => (
                      <MenuItem
                        key={ereignis.getID()}
                        value={ereignis}
                      >
                        {ereignis.getBezeichnung()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <br></br>


              <FormControl fullWidth>
                <DialogContentText>
                  {title3}
                </DialogContentText>
                <InputLabel id="anzahl">Anzahl</InputLabel>
                <Select
                  labelId="Anzahl"
                  name="anzahl"
                  size="medium"
                  label="Anzahl"
                  autoWidth
                  onChange={this.handleChange2}
                >

                  <MenuItem value='1'>1</MenuItem>
                  <MenuItem value='2'>2</MenuItem>
                  <MenuItem value='3'>3</MenuItem>
                  <MenuItem value='4'>4</MenuItem>
                  <MenuItem value='5'>5</MenuItem>
                  <MenuItem value='6'>6</MenuItem>
                  <MenuItem value='7'>7</MenuItem>
                  <MenuItem value='8'>8</MenuItem>
                  <MenuItem value='9'>9</MenuItem>
                  <MenuItem value='10'>10</MenuItem>
                  <MenuItem value='11'>11</MenuItem>
                  <MenuItem value='12'>12</MenuItem>

                </Select>
              </FormControl>


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
