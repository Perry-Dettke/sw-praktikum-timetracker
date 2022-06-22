import React from 'react';
import { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Paper, Typography, Tabs, Tab } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@material-ui/core';
import ProfileDropDown from '../dialogs/ProfileDropDown';

/**
 * Shows the header with the main navigation Tabs within a Paper.
 */
class Header extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }

  /** Handles onChange events of the Tabs component */
  handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };

  /** Renders the component */
  render() {
    const { currentUser } = this.props;
    return (
      <Paper variant='outlined' >
        <Grid container justifyContent="center" alignItems="center" xs={12}>
          <Grid item xs={2}/>
          <Grid item xs={2}>
            <img src="logo.png" align='center' width="180" height="165"></img>
          </Grid>
          <Grid item xs={2}>
            <div id="aussen">
              <div class="b1">
                <Typography variant='h3' component='h1' color='#323748' fontFamily='Verdana'>
                  TIME
                </Typography>
              </div>
              <div class="b1">
                <Typography variant='h3' component='h1'  color='#0098da' fontFamily='Courier'>
                  TRACKER
                </Typography>
              </div> 
            </div>
            <Typography variant='h5' component='h2' align='center' color='#323748' fontFamily='Verdana' >
              Zeiterfassungssystem
            </Typography>
          </Grid>
          <Grid item xs={3}/>
          <Grid item xs={1}>
            <ProfileDropDown currentUser={currentUser} />
          </Grid>
        </Grid>
        
      
        {
            currentUser?
        
          <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
            <Tab label='Home'component={RouterLink} to={`/home`} />
            <Tab label='Projekt Übersicht' component={RouterLink} to={`/projekt_uebersicht`} />     
            <Tab label='Buchung' component={RouterLink} to={`/buchung`} />
            <Tab label='Auswertung Aktivität' component={RouterLink} to={`/auswertung`} />
            <Tab label='Auswertung Person' component={RouterLink} to={`/auswertung_person`} />
          </Tabs>
          : null
        } 
      </Paper>
    

    )
    
  }
 
}

 
Header.propTypes = {

  currentUser: PropTypes.object,
}

export default Header;