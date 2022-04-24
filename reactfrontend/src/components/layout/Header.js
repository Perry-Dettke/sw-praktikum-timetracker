import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CardActions, Button } from '@material-ui/core';

class Header extends Component {

  constructor(props) {
    super(props);
  }
/*
    this.state = {
      tabindex: 0
    };
  }

  handleTabChange = (e, newIndex) => {
    this.setState({
      tabindex: newIndex
    })
  };

  showAccount = () => {
    this.props.showAccount();
  }

  showMatching = () => {
    this.props.showMatching();
  }

  showGroup = () => {
    this.props.showGroup();
  }

  showRequests = () => {
    this.props.showRequests();
  }

  signOut = () => {
    this.props.signOut();
  }
*/

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: '#FFD91D' }}>Timetracker</h1>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button variant="contained" color="primary" /* onClick={this.showGroup}*/>
            Profil
            </Button>
          <Button variant="contained" color="primary" /* onClick={this.showGroup}*/>
            Projektübersicht
            </Button>
          <Button variant="contained" color="primary" /* onClick={this.showGroup}*/>
            Abmelden
            </Button>
        </CardActions>
      </div>
    )
  }
}

/*
Header.propTypes = {
  showAccount: PropTypes.func.isRequired,
  showGroup: PropTypes.func.isRequired,
  showMatching: PropTypes.func.isRequired,
  showRequests: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
}
*/

export default Header;