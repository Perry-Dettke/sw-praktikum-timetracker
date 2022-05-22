import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import {Typography, IconButton, Grid, Tooltip} from '@material-ui/core';

import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
                <ListItem>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={2}>
                            <Typography>{buchung.letzte_aenderung}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{buchung.ersteltt_von}</Typography>
                        </Grid>
                        {/* <Grid item xs={3}>
                            <Typography>{buchung.Zeit oder sowas}</Typography>
                        </Grid> */}


                        <Grid item>
                    <Tooltip title='Bearbeiten' placement="bottom">
                      <IconButton   variant='contained' onClick={this.bearbeitenButtonClicked}>
                          <EditIcon />
                      </IconButton>
                    </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title='Löschen' placement="bottom">
                      <IconButton variant="contained"  onClick={this.buchungDeleteButtonClicked}><DeleteIcon /></IconButton>
                      </Tooltip>
                    </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    {/* <LoadingProgress show={loadingInProgress}/>
                    <ContextErrorMessage error={error} contextErrorMsg={'Die Buchung konnte nicht geladen werden'}
                                         onReload={this.getBuchung}/> */}
                </ListItem>

                <Divider/>
                {/* <BuchungForm show={showBuchungForm} buchung={buchung} onClose={this.buchungFormClosed} getBuchung= {this.getBuchung}/>
                <BuchungLöschenDialog show={showBuchungDelete} buchung={buchung} onClose={this.buchungDeleteClosed} getBuchung= {this.getPerson}/>        */}
            </div>
        );
    }
}



export default BuchungListenEintrag;


