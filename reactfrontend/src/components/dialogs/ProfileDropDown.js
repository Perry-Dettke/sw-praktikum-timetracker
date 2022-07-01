import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, IconButton, Avatar, ClickAwayListener, Typography, Paper, Button, Grid, Divider } from '@mui/material';
import { getAuth, signOut } from "firebase/auth";

/**
 * Zeigt eine Drop Down Liste mit Profilinformationen und einem Logout Button.
 * Um Drop Down zu schließen kann außerhalb geklickt werden.
 * Log Out ist mit firebase.auth().signOut() method umgesetzt.
 */

class ProfileDropDown extends Component {

  // a refernce to the avatar button
  #avatarButtonRef = createRef();

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      open: false,
    }
  }

  /** Handles click events on the avatar button and toggels visibility */
  handleAvatarButtonClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  /** 
   * Handles click events from the ClickAwayListener.
   */
  handleClose = () => {
    this.setState({
      open: false
    });
  }

  /** 
   * Handles the click event of the sign in button and uses the firebase.auth() component to sign in.
   */
  handleSignOutButtonClicked = () => {
    const auth = getAuth();
    window.location.replace("index.html");
    signOut(auth);
  }

  /** Renders the profile drop down if a loggin user is given as a prop */
  render() {
    const { currentUser } = this.props;
    const { open } = this.state;

    return (
      currentUser ?
        <div>
          <IconButton sx={{ float: 'right' }} ref={this.#avatarButtonRef} onClick={this.handleAvatarButtonClick}>
            <Avatar src={currentUser.photoURL} />
          </IconButton>
          <Popover open={open} anchorEl={this.#avatarButtonRef.current} onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <ClickAwayListener onClickAway={this.handleClose}>
              <Paper sx={{ padding: 1, bgcolor: 'background.default' }}>
                <Typography align='center'>Hello</Typography>
                <Divider sx={{ margin: 1 }} />
                <Typography align='center' variant='body2'>{currentUser.displayName}</Typography>
                <Typography align='center' variant='body2'>{currentUser.email}</Typography>
                <Divider sx={{ margin: 1 }} />
                <Grid container justifyContent='center'>
                  <Grid item>
                    <Button color='primary' onClick={this.handleSignOutButtonClicked}>Logout</Button>
                  </Grid>
                </Grid>
              </Paper>
            </ClickAwayListener>
          </Popover>
        </div>
        : null
    )
  }
}

/** PropTypes */
ProfileDropDown.propTypes = {
  /** The logged in firesbase user */
  currentUser: PropTypes.object,
}

export default ProfileDropDown;