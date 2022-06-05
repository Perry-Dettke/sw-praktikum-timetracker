import React, {Component} from 'react';

import{Typography, IconButton, Grid, Tooltip, ListItem, Divider, Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import TimetrackerAPI from '../../api/TimetrackerAPI';
// import BuchungLöschenDialog from '../dialogs/BuchungLöschenDialog';
import BuchungBearbeiten from '../dialogs/BuchungBearbeiten';



class BuchungListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            aktivitaet: null,
            showBuchungBearbeiten: false,
            showBuchungDelete: false,
            aktivitaetliste: [],
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


    
    getAktivitaetbyProjektID = () => {

        TimetrackerAPI.getAPI().getAktivitaetbyProjektID(this.state.aktivitaet.getProjektID()).then((aktivitaetBOs) => {
            this.setState({
                aktivitaetliste: aktivitaetBOs,
            });
        });
    }

   



    sendMessage = () => {
        this.timer = setTimeout(() => 
        {

            TimetrackerAPI.getAPI().getAktivitaetbyProjektID(this.state.aktivitaet.getProjektID()).then((aktivitaetBOs) => {
                this.setState({
                    aktivitaetliste: aktivitaetBOs,
                });
                console.log(this.state.aktivitaet.getProjektID())
            });
        }
        , 1000);
      }









    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showBuchungBearbeiten: true
        });
    }

    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    buchungBearbeitenClosed = (buchung) => {
        if (buchung) {
            this.setState({
                buchung: buchung,
                showBuchungBearbeiten: false
            });
        } else {
            this.setState({
                showBuchungBearbeiten: false
            });
        }
    }

     //Öffnet das Dialog-Fenster BuchungDeleteDialog, wenn der Button geklickt wurde
     buchungDeleteButtonClicked =  event => {
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
        // setTimeout(this.getAktivitaetbyProjektID(), 50000)
        this.sendMessage()
        
    }


 

    //Renders the component
    render() {
        const {classes, buchung} = this.props;
        const {aktivitaet, showBuchungBearbeiten, showBuchungDelete, aktivitaetliste} = this.state;
        console.log(aktivitaetliste)

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
     
                <BuchungBearbeiten show={showBuchungBearbeiten} buchung={buchung} aktivitaet={aktivitaet} aktivitaetliste={aktivitaetliste} onClose={this.buchungBearbeitenClosed}/>


                {/* <BuchungLöschenDialog show={showBuchungDelete} buchung={buchung} onClose={this.buchungDeleteClosed}/> */}
            
            </div>
            : null
        );
    }
}



export default BuchungListenEintrag;


