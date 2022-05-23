import React, {Component} from 'react';

import ListItem from '@material-ui/core/ListItem';
import {Typography, IconButton, Grid, Tooltip} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import PersonLöschenDialog from '../dialogs/PersonLöschenDialog';
import PersonForm from '../dialogs/PersonForm';



class PersonListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            showPersonForm: false,
            showPresonDelete: false,
        };
    }

    //Gibt den aktuellen Person zurück
    getPerson = () => {
        this.props.getPerson();
    }

    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showPersonForm: true
        });
    }

    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    personFormClosed = (person) => {
        if (person) {
            this.setState({
                person: person,
                showPersonForm: false
            });
        } else {
            this.setState({
                showPersonForm: false
            });
        }
    }

     //Öffnet das Dialog-Fenster PersonDeleteDialog, wenn der Button geklickt wurde
     personDeleteButtonClicked =  event => {
        console.log("Delete Button")
        event.stopPropagation();
        this.setState({
          showPersonDelete: true
        });
      }
    
      //Wird aufgerufen, wenn das Dialog-Fenster PersonDeleteDialog geschlossen wird
      personDeleteClosed = () => {
          this.setState({
            showPersonDelete: false
          });
          this.getPerson();
      }


    //Renders the component
    render() {
        const {classes, person} = this.props;
        const {showPersonForm, error, loadingInProgress, showPersonDelete} = this.state;

        return (
            <div>
                <ListItem>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={2}>
                            <Typography>{person.vor_name}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{person.nach_name}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{person.benutzer_name}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{person.email}</Typography>
                        </Grid>
                        <Grid item xs/>

                        <Grid item>
                    <Tooltip title='Bearbeiten' placement="bottom">
                      <IconButton   variant='contained' onClick={this.bearbeitenButtonClicked}>
                          <EditIcon />
                      </IconButton>
                    </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title='Löschen' placement="bottom">
                      <IconButton variant="contained"  onClick={this.personDeleteButtonClicked}><DeleteIcon /></IconButton>
                      </Tooltip>
                    </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    {/* <LoadingProgress show={loadingInProgress}/>
                    <ContextErrorMessage error={error} contextErrorMsg={'Die Person konnte nicht geladen werden'}
                                         onReload={this.getPerson}/> */}
                </ListItem>

                <Divider/>
                <PersonForm show={showPersonForm} person={person} onClose={this.personFormClosed} getPerson= {this.getPerson}/>
                <PersonLöschenDialog show={showPersonDelete} person={person} onClose={this.personDeleteClosed} getPerson= {this.getPerson}/>       
            </div>
        );
    }
}



export default PersonListenEintrag;


