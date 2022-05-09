import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


class BuchungDialog extends Component {

    constructor(props) {
        super(props);
    }

    // Dialog schließen
    handleClose = () => {
        this.setState(this.initialState);
        this.props.onClose();
    }

    render() {
        const { show } = this.props

        return (
            show ?
                <div>
                    <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
                        <DialogTitle id='form-dialog-title'>Neue Buchung
                            <IconButton onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <div>
                                {/* Projekt auswählen */}
                                <FormControl sx={{ m: 0, minWidth: 1000 }}>
                                    <InputLabel id="projekt">Projekt</InputLabel>
                                    <Select
                                    labelId="projekt"
                                    name="projekt"
                                    // value={this.state.projekt}
                                    size="large"
                                    label="projekt"
                                    autoWidth
                                    onChange={this.handleChange}
                                    >
                                    <MenuItem value={1}>Projekt 1</MenuItem>
                                    <MenuItem value={2}>Projekt 2</MenuItem>
                                    <MenuItem value={3}>Projekt 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                {/* Aktivität auswählen */}
                                <FormControl sx={{ m: 0, minWidth: 1000 }}>
                                    <InputLabel id="aktivitaet">Aktivität</InputLabel>
                                    <Select
                                    labelId="aktivitaet"
                                    name="aktivitaet"
                                    // value={this.stateaktivitaet}
                                    size="large"
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