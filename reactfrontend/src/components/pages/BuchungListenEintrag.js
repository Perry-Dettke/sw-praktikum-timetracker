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
            aktivitaet: null,
            showBuchungForm: false,
            showBuchungDelete: false,
        };
    }

    //Gibt die aktuellen Buchungen zurück
    getBuchungbyPersonID = () => {
        this.props.getBuchungbyPersonID();
    }

    ereignisbuchungCheck = () => {
        if (this.props.buchung.getEreignisbuchung() === true) {
            return "Ereignisbuchung"}
        else {
            return "Zetintervallbuchung"
        }
        
    }

    getAktivitaet = () => {
        TimetrackerAPI.getAPI().getAktivitaetbyID(this.props.buchung.getAktivitaet_id()).then((aktivitaetBOs) => {
            this.setState({
                aktivitaet: aktivitaetBOs,
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
        this.getAktivitaet();
    }

    //Renders the component
    render() {
        const {classes, buchung} = this.props;
        const {aktivitaet, showBuchungForm, error, loadingInProgress, showBuchungDelete} = this.state;
        console.log(aktivitaet)

        return (
            aktivitaet ?
            <div>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                        <Table>

                            <TableBody>

                                <TableRow key={buchung.getID()}>
                                    <TableCell><Typography> {buchung.getDatum()}</Typography></TableCell>
                                    <TableCell><Typography> {aktivitaet.getBezeichnung()}</Typography></TableCell>
                                    <TableCell><Typography> {this.ereignisbuchungCheck()}</Typography></TableCell>
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


