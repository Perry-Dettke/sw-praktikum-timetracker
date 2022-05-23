import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Alert, AlertTitle } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { withStyles } from '@mui/styles';

/**
 * Sobald im System ein Error entsteht, wird der ContextErrorMessage ausgegeben.
 * Hierdurch weiß der Benutzer, welcher Fehler entstanden ist.
 */


class ContextErrorMessage extends Component {
  #standardText = 'This should not have happend. Soooo sorry...';

  /** Renders the ContextErrorMessage if error object is not null  */
  render() {
    const { classes, error, contextErrorMsg, onReload } = this.props;

    return (
      (error !== null) ?
        <Alert severity='error' className={classes.root}>
          <div>
            {this.#standardText}
          </div>
          <AlertTitle>
            {contextErrorMsg}
          </AlertTitle>
          <div className={classes.margins}>
            Error message (for debugging only) is:
        </div>
          <div>
            {error.message}
          </div>
          {
            onReload ?
              <div className={classes.margins}>
                <Button variant='contained' color='primary' startIcon={<AutorenewIcon />} onClick={onReload}>
                  Reload
            </Button>
              </div>
              : null
          }
        </Alert>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  margins: {
    marginTop: theme.spacing(2)
  }
});

/** PropTypes */ 
ContextErrorMessage.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** 
   * The error object, which drives the error message 
   * If not null, the error message is shown 
   */
  error: PropTypes.object,
  /**  A contextual error message to be shown */
  contextErrorMsg: PropTypes.string,
  /** 
   * A reload handler for the onReload event, which occurs if the reload button is clicked. 
   * If given a reload button is shown 
   */
  onReload: PropTypes.func
}

export default withStyles(styles)(ContextErrorMessage);