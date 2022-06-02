import React, {Component} from 'react';

import{Typography, IconButton, Grid, Tooltip, ListItem, Divider, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// import BuchungLöschenDialog from '../dialogs/BuchungLöschenDialog';
// import BuchungForm from '../dialogs/BuchungForm';



class BuchungListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            showBuchungForm: false,
            showBuchungDelete: false,
        };
    }

    //Gibt den aktuellen Buchung zurück
    getBuchung = () => {
        this.props.getBuchung();
    }

    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showBuchungForm: true
        });
    }

    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    buchungFormClosed = (buchung) => {
        if (buchung) {
            this.setState({
                buchung: buchung,
                showBuchungForm: false
            });
        } else {
            this.setState({
                showBuchungForm: false
            });
        }
    }

     //Öffnet das Dialog-Fenster BuchungDeleteDialog, wenn der Button geklickt wurde
     buchungDeleteButtonClicked =  event => {
        console.log("Delete Button")
        event.stopPropagation();
        this.setState({
          showProejktDelete: true
        });
      }
    
      //Wird aufgerufen, wenn das Dialog-Fenster PorjektDeleteDialog geschlossen wird
      buchungDeleteClosed = () => {
          this.setState({
            showBuchungDelete: false
          });
          this.getBuchung();
      }


    //Renders the component
    render() {
        const {classes, buchung} = this.props;
        const {showBuchungForm, error, loadingInProgress, showBuchungDelete} = this.state;

        return (
            <div>
                <Typography>Test BuchungsListenEintrag</Typography>
                <Grid container alignItems="center" spacing={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Letzte Änderung</TableCell>
                                <TableCell>Aktivität</TableCell>
                                <TableCell>Art der Buchung? Zeitintervall/Ereignis</TableCell>
                                <TableCell>Stunden die gebucht wurden</TableCell>
                                <TableCell>Bearbeiten</TableCell>
                                <TableCell>Löchen</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Daten</TableCell>
                                <TableCell>Daten</TableCell>
                                <TableCell>Daten</TableCell>
                                <TableCell>Daten</TableCell>
                                <TableCell>
                                    <Tooltip title='Bearbeiten' placement="bottom">
                                        <IconButton   variant='contained' onClick={this.bearbeitenButtonClicked}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                <Tooltip title='Löschen' placement="bottom">
                                    <IconButton variant="contained"  onClick={this.buchungDeleteButtonClicked}><DeleteIcon /></IconButton>
                                </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
     
                {/* <BuchungForm show={showBuchungForm} buchung={buchung} onClose={this.buchungFormClosed} getBuchung= {this.getBuchung}/>
                <BuchungLöschenDialog show={showBuchungDelete} buchung={buchung} onClose={this.buchungDeleteClosed} getBuchung= {this.getPerson}/>        */}
            
            </div>
        );
    }
}



export default BuchungListenEintrag;


