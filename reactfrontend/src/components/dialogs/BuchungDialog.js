import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import TimetrackerAPI from "../../api/TimetrackerAPI";

/*
* In diesem Dialog wird ein Formular angezeigt, mit dem Buchungen für ein bestimmtes Projekt angelegt werden können.
*/

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
            projekt: null,
            testliste: ["1","2","3"],
        }

    }

 


      
      AktivitaetList() {
        var api = TimetrackerAPI.getAPI();
        api.getAktivitaet().then((aktivitaetBOs) => {
          this.setState({
            akitvitaetliste: aktivitaetBOs,
          });

        });
      }

        
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }


    // Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose();
    }


    componentDidMount() {
      }

    render() {
        const { show, projektliste } = this.props;
        const { bezeichnung, projekt, testliste } = this.state;
        // console.log("Projektliste", projektliste)
        // console.log(typeof projektliste)
        // console.log("Testloste", typeof testliste)
        // console.log("Bezeichnung test", projekt.getBezeichnung)

        return (
            show && projektliste ?
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
                                    value={"hi"}
                                    size="medium"
                                    label="Projekt"
                                    autoWidth
                                    onChange={this.handleChange()}
                                    >
                                    {projektliste.map((projekt) => {
                                    return (
                                    <MenuItem
                                    
                                    value={"hallo"}>
                                        {projekt.getBezeichnung()}
                                    </MenuItem>
                                    );
                                })
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