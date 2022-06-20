import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@material-ui/core/TextField';

import TimetrackerAPI from "../../api/TimetrackerAPI";




class ZeitintervallBearbeiten extends Component {

    constructor(props) {
        super(props);

        let st = "", en = "", da;
        if (props.zeitintervall) {
            st = props.zeitintervall.start
        }
        if (props.zeitintervall) {
            en = props.zeitintervall.ende
        }
        if (props.zeitintervall) {
            da = props.zeitintervall.dauer
        }
        this.state = {
            start: st,
            ende: en,
            dauer: da,
          
        };

        this.initialState = this.state;
 

    }

    updateZeitintervall = () => {
        let zeitintervall = this.props.zeitintervall;
        // zeitintervall.setStart(this.state.start)
        // zeitintervall.setEnde(this.state.ende)
        console.log(this.state.dauer)
        zeitintervall.setDauer(this.state.dauer)
        TimetrackerAPI.getAPI().updateZeitintervall(zeitintervall).then(zeitintervall => {
            // this.props.getZeitintervall() /// Fehlt evtl. noch
            this.setState(this.initialState);
            this.props.onClose(zeitintervall); //Aufrufen parent in backend
        })
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

    // Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose();
    }





    render() {
        const { show } = this.props;
        const {dauer, start, ende } = this.state;
        // console.log()


        return (
            show ?
                <Dialog open={show}  onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle > {"Zeitintervall Bearbeiten"}
                        <IconButton  onClick={this.handleClose} right>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Geben Sie die neue Stundenanzahl.
                        </DialogContentText>

                        <form  noValidate autoComplete='off'>

                        {/* Textfeld für die Stunden */}
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='dauer' label='Stunden:' value={dauer} onChange={this.textFieldValueChange} />

                        </form>

                    </DialogContent>
                    <DialogActions>
              <Button color='secondary' onClick={this.handleClose}>
                Abbrechen
              </Button>

                <Button variant='contained' color='primary' onClick={this.updateZeitintervall}>
                  Speichern
                  </Button>
            </DialogActions>
                </Dialog>
                : null
        );
    }
}


export default ZeitintervallBearbeiten;
