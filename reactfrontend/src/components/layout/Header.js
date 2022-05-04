import React from 'react';
import { Component } from 'react'
//import PropTypes from 'prop-types';
//import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
//import { Link as RouterLink } from 'react-router-dom';

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
      <h1>
        Test 
        </h1>
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