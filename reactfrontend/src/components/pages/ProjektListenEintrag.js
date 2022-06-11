import React, {Component} from 'react';

import {ListItem, Typography, IconButton, Grid, Tooltip, Divider} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ProjektLöschenDialog from '../dialogs/ProjektLöschenDialog';


class ProjektListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            showProjektForm: false,
            showProjektLöschenDialog: false,
        };
    }

    //Gibt den aktuellen Projekt zurück
    getProjekt = () => {
        this.props.getProjekt();
    }

    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showProjektForm: true
        });
    }

    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    projektFormClosed = (projekt) => {
        if (projekt) {
            this.setState({
                projekt: projekt,
                showProjektForm: false
            });
        } else {
            this.setState({
                showProjektForm: false
            });
        }
    }

     //Öffnet das Dialog-Fenster ProjektDeleteDialog, wenn der Button geklickt wurde
     projektDeleteButtonClicked =  event => {
        console.log("Delete Button")
        event.stopPropagation();
        this.setState({
            showProjektLöschenDialog: true,
        });
      }
    
      //Wird aufgerufen, wenn das Dialog-Fenster PorjektDeleteDialog geschlossen wird
      projektDeleteClosed = () => {
          this.setState({
            showProjektLöschenDialog: false
          });
          this.getProjekt();
      }


    //Renders the component
    render() {
        const {classes, projekt} = this.props;
        const {showProjektForm, error, loadingInProgress, showProjektLöschenDialog} = this.state;
        console.log(projekt)

        return (
            <div>
                <ListItem>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={2}>
                            <Typography>{projekt.bezeichnung}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{projekt.auftraggeber}</Typography>
                        </Grid>
                        {/* <Grid item xs={3}>
                            <Typography>{projekt.projektleiter}</Typography>
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
                        <IconButton variant="contained"  onClick={this.projektDeleteButtonClicked}><DeleteIcon /></IconButton>
                      </Tooltip>
                    </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    {/* <LoadingProgress show={loadingInProgress}/>
                    <ContextErrorMessage error={error} contextErrorMsg={'Das Projekt konnte nicht geladen werden'}
                                         onReload={this.getProjekt}/> */}
                </ListItem>

                <Divider/>
                {/* <ProjektForm show={showProjektForm} projekt={projekt} onClose={this.projektFormClosed} getProjekt= {this.getProjekt}/>*/}
                <ProjektLöschenDialog show={showProjektLöschenDialog} projekt={projekt} onClose={this.projektDeleteClosed} getProjekt= {this.getPerson}/>
            </div>
        );
    }
}



export default ProjektListenEintrag;


