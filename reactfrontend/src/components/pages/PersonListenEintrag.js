import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import {Typography, IconButton, Grid, Tooltip} from '@material-ui/core';

import Divider from '@material-ui/core/Divider';


import PersonDialog from '../dialogs/PersonDialog';



class PersonListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            showPerson: false,
        };
    }

    //Gibt den aktuellen Person zurück
    getPersonenListe = () => {
        this.props.getPersonenListe();
    }

    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showPerson: true
        });
    }

    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    personFormClosed = (personenliste) => {
        if (personenliste) {
            this.setState({
                personenliste: personenliste,
                showPerson: false
            });
        } else {
            this.setState({
                showPerson: false
            });
        }
    }

    //Renders the component
    render() {
        const {classes, personenliste} = this.props;
        const {showPerson, error, loadingInProgress} = this.state;

        return (
            <div>
                <ListItem>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={2}>
                            <Typography>{personenliste.vor_name}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{personenliste.nach_name}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{personenliste.benutzer_name}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{personenliste.email}</Typography>
                        </Grid>
                        <Grid item xs/>
                        <Grid item>
                        </Grid>
                        <Tooltip title='Bearbeiten' placement="bottom">
                            <IconButton variant='contained'
                                        onClick={this.bearbeitenButtonClicked}>
                              
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </ListItem>
                <ListItem>
                    {/* <LoadingProgress show={loadingInProgress}/>
                    <ContextErrorMessage error={error} contextErrorMsg={'Der Person konnte nicht geladen werden'}
                                         onReload={this.getPerson}/> */}
                </ListItem>

                <Divider/>
                <PersonDialog show={showPerson} personenliste={personenliste} onClose={this.personFormClosed} getModule={this.get.Personenliste}/>
            </div>
        );
    }
}



export default PersonListenEintrag;


