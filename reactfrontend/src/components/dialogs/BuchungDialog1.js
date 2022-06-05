import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, NativeSelect } from '@mui/material';
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
import AktivitaetBO from '../../api/AktivitaetBO';


class BuchungDialog1 extends Component {

    constructor(props) {
        super(props);

        let st = "", ak = "";
        if (props.aktivitaet) {
            ak = props.aktivitaet.bezeichnung
        }
        if (props.buchung) {
            st = props.buchung.stunden

       
        }
        this.state = {
            stunden: st,
            bezeichnung: ak,
            value: ""
          
        };

        this.initialState = this.state;
 

    }
    
    





    updateBuchung = () => {
        let buchung = this.props.buchung;
        // buchung.setEreignisbuchung(this.state.ereignisbuchung)
        buchung.setStunden(this.state.stunden)
        TimetrackerAPI.getAPI().updateBuchung(buchung).then(buchung => {
            this.props.getBuchung()
            this.setState(this.initialState);
            this.props.onClose(buchung); //Aufrufen parent in backend
        }).catch(e =>
            this.setState({
                updatingInProgress: false,
                updatingError: e
            })
        );
        // Ladeanimation einblenden
        this.setState({
            updatingInProgress: true,
            updatingError: null
        });
        this.props.onClose(buchung)
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
    
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }


    // Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose();
    }





    render() {
        const { show, buchung, aktivitaet, aktivitaetliste } = this.props;
        const { bezeichnung, stunden, value } = this.state;
        console.log(value, "hiii2")


        return (
            show ?

                <Dialog open={show}  onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle >
                        <IconButton  onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            
                        </DialogContentText>

                        <form  noValidate autoComplete='off'>

                        {/* <TextField autoFocus type='text' required fullWidth margin='normal' id='aktivitaet' label='Aktivitaet:' value={bezeichnung} onChange={this.textFieldValueChange} /> */}
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='stunden' label='Stunden:' value={stunden} onChange={this.textFieldValueChange} />
                        {/* <TextField autoFocus type='text' required fullWidth margin='normal' id='email' label='Email:' value={email} onChange={this.textFieldValueChange} /> */}
                        {/* <TextField autoFocus type='text' required fullWidth margin='normal' id='benutzer_name' label='Benutzername:' value={benutzer_name} onChange={this.textFieldValueChange} /> */}
                        
                        <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Aktivitaet
                        </InputLabel>
                            <NativeSelect
                                defaultValue={value}
                                onChange={this.handleChange()}

                            >

                                {aktivitaetliste.map((aktivitaet) => {
                                    return (
                                        <option 
                                        value={aktivitaet.getProjektID()}>
                                            {aktivitaet.getBezeichnung()}
                                        </option>
                                    );
                                    
                                })
                                }
                                
                            </NativeSelect>
                        </FormControl>


                        </form>

                    </DialogContent>
                    <DialogActions>
              <Button color='secondary' onClick={this.handleClose}>
                Abbrechen
              </Button>
              {buchung ?
                <Button variant='contained' color='primary' onClick={this.updateBuchung}>
                  Speichern
                  </Button>
                : <Button variant='contained' color='primary' onClick={this.addBuchung}>
                  Anlegen
                  </Button>
              }
            </DialogActions>
                </Dialog>
                : null
        );
    }
}


export default BuchungDialog1;