import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

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
    return (
      <Paper variant='outlined' >
        <Typography variant='h3' component='h1' align='center'>
          TIMTRACKER
        </Typography>
        <Typography variant='h4' component='h2' align='center'>
          Zeiterfassungssystem
        </Typography>
          <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
            <Tab label='Home' component={RouterLink} to={`/home`} />
            <Tab label='Projekt anlegen' component={RouterLink} to={`/projekt_anlegen`} />
            <Tab label='Buchung' component={RouterLink} to={`/buchung`} />
            <Tab label='Projektleiter Übersicht' component={RouterLink} to={`/projektleiter_uebersicht`} />
          </Tabs>
      </Paper>
    )
  }
}

/** PropTypes 
Header.propTypes = {
  The logged in firesbase user
  user: PropTypes.object,
}
*/
export default Header;