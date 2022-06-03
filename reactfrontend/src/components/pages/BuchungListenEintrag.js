import React, {Component} from 'react';

import{Typography, IconButton, Grid, Tooltip, ListItem, Divider, Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import TimetrackerAPI from '../../api/TimetrackerAPI';
// import BuchungLöschenDialog from '../dialogs/BuchungLöschenDialog';
// import BuchungForm from '../dialogs/BuchungForm';



class BuchungListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            buchungliste: [],
            showBuchungForm: false,
            showBuchungDelete: false,
        };
    }

    //Gibt den aktuellen Buchung zurück
    getBuchung = () => {
        this.props.getBuchung();
    }


  getBuchungbyArbeitszeitkontoID = () => {
    TimetrackerAPI.getAPI().getBuchungbyArbeitszeitkontoID([1]).then((buchungBOs) => {
        this.setState({
            buchungliste: buchungBOs,
        });
    });
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

      componentDidMount() {
        this.getBuchungbyArbeitszeitkontoID();
  
    }

    //Renders the component
    render() {
        const {classes} = this.props;
        const {buchungliste, showBuchungForm, error, loadingInProgress, showBuchungDelete} = this.state;
        console.log(buchungliste)

        return (
            buchungliste ?
            <div>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                        <Table>
                            <TableHead sx={{
                                backgroundColor: '#dedede'
                                }}>
                                <TableRow>
                                    <TableCell>Datum</TableCell>
                                    <TableCell>Aktivität</TableCell>
                                    <TableCell>Art der Buchung (Zeitintervall/Ereignis)</TableCell>
                                    <TableCell>Stunden die gebucht wurden</TableCell>
                                    <TableCell>Bearbeiten</TableCell>
                                    <TableCell>Löchen</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                buchungliste.map(buchung =>
                                <TableRow key={buchung.getID()}>
                                    <TableCell><Typography> {buchung.getDatum()}</Typography></TableCell>
                                    <TableCell><Typography> {buchung.getDatum()}</Typography></TableCell>
                                    <TableCell>Daten</TableCell>
                                    <TableCell><Typography> {buchung.getStunden()}</Typography></TableCell>
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
                                )}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
     
                {/* <BuchungForm show={showBuchungForm} buchung={buchung} onClose={this.buchungFormClosed} getBuchung= {this.getBuchung}/>
                <BuchungLöschenDialog show={showBuchungDelete} buchung={buchung} onClose={this.buchungDeleteClosed} getBuchung= {this.getPerson}/>        */}
            
            </div>
            : null
        );
    }
}



export default BuchungListenEintrag;


