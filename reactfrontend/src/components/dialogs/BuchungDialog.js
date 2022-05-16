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


class BuchungDialog extends Component {

    constructor(props) {
        super(props);

        // let projektliste='', bezeichnung=""
        // if (this.props.projekt) {
        //     projektliste = this.props.projekt
        //     bezeichnung = this.props.projekt.getBezeichnung();
        // }


        this.state = {
            bezeichnung: "",
            projekt: "",
            projektliste: [],
            testliste: ["1","2","3"],
        }

    }

    ProjektList() {
        var api = TimetrackerAPI.getAPI();
        api.getProjekt().then((projektBOs) => {
          this.setState({
            projektliste: projektBOs,
          });
        });
      }

    textFieldValueChange = (event) => {
        const value = event.target.value;
        let error = false;
        if (value.trim().length === 0) {
              error = true;
            }
        
            this.setState({
              [event.target.id]: event.target.value,
            });
          }


        
    handleBezeichnungChange = (event) => {
        this.setState({ bezeichnung: event.target.value });
    }
          

    

    handletest = () => {
        console.log(this.state.bezeichnung)
    }


    // Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose();
    }


    componentDidMount() {
        this.ProjektList();
      }

    render() {
        const { show, projekt } = this.props;
        const { bezeichnung, projektliste, testliste } = this.state;
        console.log("Projektliste", projektliste)
        console.log(typeof projektliste)
        console.log("Testloste", typeof testliste)
        console.log(testliste)
        // console.log("Bezeichnung test", projekt.getBezeichnung)

        return (
            show ?
                <div>
                    <Dialog open={show} onClose={this.handleClose} maxWidth='xl'>
                        <DialogTitle id='form-dialog-title'>Neue Buchung
                            <IconButton onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <div>
                                {/* Projekt auswählen */}                               
                                <FormControl sx={{ m: 0, minWidth: 500 }}>
                                    <InputLabel id="projekt">Projekt</InputLabel>
                                    <Select
                                    labelId="Projekt"
                                    name="projekt"
                                    value={this.state.projekt}
                                    size="medium"
                                    label="Projekt"
                                    autoWidth
                                    // onChange={this.handleChange}
                                    >
                    {Object.values(projektliste).map((projekt) => {
                    return (
                      <MenuItem 
                      key={projekt.id.toString()}
                      value={this.props.projekt.getID()}>
                        {this.props.projekt.getBezeichnung()}
                      </MenuItem>
                    );
                  })//.bind(this)
                }
                                    </Select>
                                </FormControl>

                            </div>
                            <div>
                                <FormControl sx={{ m: 0, minWidth: 500 }}>
                                    <InputLabel id="aktivitaet">Aktivität</InputLabel>
                                    <Select
                                    labelId="aktivitaet"
                                    name="aktivitaet"
                                    // value={this.stateaktivitaet}
                                    size="medium"
                                    label="aktivitaet"
                                    autoWidth
                                    onChange={this.handleChange}
                                    >
                                    <MenuItem value={1}>Aktivität 1</MenuItem>
                                    <MenuItem value={2}>Aktivität 2</MenuItem>
                                    <MenuItem value={3}>Aktivität 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <Button variant="outlined">Ereignis</Button>
                                <Button variant="outlined">Zeitintervall</Button>
                            </div>
                            {/* Buttons für Ereignis & Zeitintervall fehlen jeweils */}
                        </DialogContent>
                        <DialogActions>
                            <Button color='secondary' onClick={this.handleClose}>
                                Abbrechen
                            </Button>
                            <Button variant='contained' color='primary'>
                                Bestätigen
                            </Button>
                        </DialogActions>
                    </Dialog></div>
                : null
        );
    }
}


export default BuchungDialog;