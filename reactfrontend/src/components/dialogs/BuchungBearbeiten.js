import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
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


class BuchungBearbeiten extends Component {

    constructor(props) {
        super(props);

        let st = "", ak = "", ai;
        if (props.aktivitaet) {
            ak = props.aktivitaet.bezeichnung
        }
        if (props.buchung) {
            st = props.buchung.stunden
        }
        if (props.aktivitaet) {
            ai = props.buchung.aktivitaet_id
        }
        this.state = {
            stunden: st,
            bezeichnung: ak,
            aktivitaet_id: ai,
          
        };

        this.initialState = this.state;
 

    }

    updateBuchung = () => {
        let buchung = this.props.buchung;
        // buchung.setEreignisbuchung(this.state.ereignisbuchung)
        buchung.setStunden(this.state.stunden)
        buchung.setAktivitaet_id(this.state.aktivitaet_id)
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
    
    handleChange = (e) => {
        this.setState({ aktivitaet_id: e.target.value });
    }


    // Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose();
    }





    render() {
        const { show, aktivitaet, aktivitaetliste } = this.props;
        const {stunden, aktivitaet_id } = this.state;
        console.log(aktivitaet_id)


        return (
            show ?
                <Dialog open={show}  onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle > {"Buchung Bearbeiten"}
                        <IconButton  onClick={this.handleClose} right>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Geben Sie die neue Stundenanzahl oder Aktivität an.
                        </DialogContentText>

                        <form  noValidate autoComplete='off'>

                        {/* Textfeld für die Stunden */}
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='stunden' label='Stunden:' value={stunden} onChange={this.textFieldValueChange} />
                        {/* Dropdown für Aktivitaet */}
                        <FormControl fullWidth>
                        <InputLabel id='aktivitaet-label'>Aktivität</InputLabel>
                                <Select labelId='aktivitaet-label' id='aktivitaet' value={aktivitaet_id} defaultValue={aktivitaet.bezeichnung} onChange={this.handleChange}>

                                    {aktivitaetliste.map((aktivitaet) => {
                                                        return (
                                                        <MenuItem
                                                        value={aktivitaet.getID()}>
                                                            {aktivitaet.getBezeichnung()}
                                                        </MenuItem>
                                                        );
                                                    })
                                                    }
                                </Select>
                        </FormControl>
                        </form>

                    </DialogContent>
                    <DialogActions>
              <Button color='secondary' onClick={this.handleClose}>
                Abbrechen
              </Button>

                <Button variant='contained' color='primary' onClick={this.updateBuchung}>
                  Speichern
                  </Button>
            </DialogActions>
                </Dialog>
                : null
        );
    }
}


export default BuchungBearbeiten;
