import React from 'react';
import { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Paper, Typography, Tabs, Tab } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import ProfileDropDown from '../dialogs/ProfileDropDown';

/*
* Zeigt den Header mit der Navigationsleiste in einem Paper. 
*/

class Header extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }

  /* Handles onChange events of the Tabs component */
  handleTabChange = (e, newIndex) => {
    this.setState({
      tabindex: newIndex
    })
  };

  /* Renders the component */
  render() {
    const { currentUser } = this.props;
    return (
      <Grid container xs={12} spacing={2}>
        <Grid item xs={12}>
          <Paper variant='outlined'>
            <Grid item xs={12}/>
            <Grid container spacing={1} alignItems="center" xs={12}>
              <Grid item xs={2}/>
              <Grid item xs={1}>
                <img src="foto_klein.png" align='center' width="100" height="82"/>
              </Grid>
              <Grid item xs={1}/>
              <Grid item xs={4}>
                <Typography color='#0098da' variant='h6' fontFamily='Verdana'>
                  <b>TIME TRACKER</b>
                </Typography>
                <Typography align='center' color='#323748' fontFamily='Verdana' >
                  <b>Zeiterfassungssystem</b>
                </Typography>
              </Grid>
              <Grid item xs={2}/>
              <Grid item xs={1}>
                <ProfileDropDown currentUser={currentUser} />
              </Grid>
            </Grid>
            {
                currentUser?
            
              <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
                <Tab label='Home'component={RouterLink} to={process.env.PUBLIC_URL + '/home'} />
                <Tab label='Projekte' component={RouterLink} to={process.env.PUBLIC_URL + '/projekt_uebersicht'} />     
                <Tab label='Buchung' component={RouterLink} to={process.env.PUBLIC_URL + '/buchung'} />
                <Tab label='Auswertung' component={RouterLink} to={process.env.PUBLIC_URL + '/auswertung'} />
              </Tabs>
              : null
            } 
          </Paper>
        </Grid>
      </Grid>
    )   
  } 
}

/**/ 
Header.propTypes = {

  currentUser: PropTypes.object,
}

export default Header;