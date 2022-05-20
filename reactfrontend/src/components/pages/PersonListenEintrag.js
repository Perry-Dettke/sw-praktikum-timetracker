import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

import ListItem from '@material-ui/core/ListItem';
import {Typography, IconButton, Grid, Tooltip} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';


import PersonDialog from '../dialogs/PersonDialog';



class PersonListenEintrag extends Component {

    constructor(props) {
        super(props);

        //gebe einen leeren status
        this.state = {
            showPerson: false,
            error: null,
            loadingInProgress: false
        };
    }

    //Gibt den aktuellen User zurück
    getPerson = () => {
        this.props.getPerson();
    }

    //Wird aufgerufen, wenn der Button Bearbeiten geklickt wird
    bearbeitenButtonClicked = event => {
        event.stopPropagation();
        this.setState({
            showPerson: true
        });
    }

    //Wird aufgerufen, wenn Speichern oder Abbrechen im Dialog gedrückt wird
    personFormClosed = (person) => {
        if (person) {
            this.setState({
                person: person,
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
        const {classes, person} = this.props;
        const {showPerson, error, loadingInProgress} = this.state;

        return (
            <div>
                <ListItem className={classes.root}>
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
                        </Grid>
                        <Tooltip title='Bearbeiten' placement="bottom">
                            <IconButton className={classes.bearbeitenButton} variant='contained'
                                        onClick={this.bearbeitenButtonClicked}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </ListItem>
                <ListItem>
                    <LoadingProgress show={loadingInProgress}/>
                    <ContextErrorMessage error={error} contextErrorMsg={'Der User konnte nicht geladen werden'}
                                         onReload={this.getUser}/>
                </ListItem>
                <Divider/>
                <PersonDialog show={showPerson} person={person} onClose={this.personFormClosed} getModule={this.getPerson}/>
            </div>
        );
    }
}



export default PersonListenEintrag;


