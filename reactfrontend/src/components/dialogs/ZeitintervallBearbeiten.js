import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
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
        zeitintervall.setStart(this.state.start)
        zeitintervall.setEnde(this.state.ende)
        let dauer = new Date(this.state.ende).getTime() - new Date(this.state.start).getTime()
        console.log(this.msToTime(dauer))
        zeitintervall.setDauer(this.msToTime(dauer))
        TimetrackerAPI.getAPI().updateZeitintervall(zeitintervall).then(zeitintervall => {
            // this.props.getZeitintervallbyPersonID()
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

    handleChangeStart = (e) => {
        this.setState({ start: e });
    }

    handleChangeEnde = (e) => {
        this.setState({ ende: e });
    }


    // Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose();
    }

    msToTime = (s) => {
        let ms = (s % 1000) / 60
        s = (s - ms) / 1000
        let secs = (s % 60) / 60
        console.log('secs', secs)
        s = (s - secs) / 60
        let mins = (s % 60) / 60
        console.log('minuten', mins)
        let hrs = (s - mins) / 60

        return parseFloat(hrs + '.' + mins + secs)
    }



    render() {
        const { show } = this.props;
        const {dauer, start, ende } = this.state;
        let title = 'Kommen';
        let title2 = "Gehen"
        return (
            show ?
                <Dialog open={show}  onClose={this.handleClose} maxWidth='xs' fullWidth>
                    <DialogTitle > {"Zeitintervall Bearbeiten"}
                        <IconButton  onClick={this.handleClose} right>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>

                        <form  noValidate autoComplete='off'>
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='start' label='Start:' value={start} onChange={this.textFieldValueChange} />
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='ende' label='Ende:' value={ende} onChange={this.textFieldValueChange} />
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
