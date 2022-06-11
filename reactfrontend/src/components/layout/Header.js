import React from 'react';
import { Component } from 'react'
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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

    this.setState({
      tabindex: newIndex
    })
  };

  /** Renders the component */
  render() {
    const{ user } = this.props;

    return (
      <Paper variant='outlined' >
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center' color='#323748' fontFamily='Verdana'>
          TIME
        </Typography>
        <Typography variant='h3' component='h1' align='center' color='#0098da' fontFamily='Courier'>
          TRACKER
        </Typography>
        <Typography variant='h4' component='h2' align='center' >
          Zeiterfassungssystem
        </Typography>
        {
          user ?
          <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
            <Tab label='Home' component={RouterLink} to={`/home`} />
            <Tab label='Projekt Übersicht' component={RouterLink} to={`/projekt_uebersicht`} />     
            <Tab label='Buchung' component={RouterLink} to={`/buchung`} />
            <Tab label='Auswertung' component={RouterLink} to={`/auswertung`} />
          </Tabs>
          : null
        }
      </Paper>
    )
  }
}

/** PropTypes */
Header.propTypes = {
  /**The logged in firesbase user*/
  user: PropTypes.object,
}

export default Header;