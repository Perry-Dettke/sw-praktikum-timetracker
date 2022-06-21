import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Alert, AlertTitle } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';

/**
 * Shows an in-line error message in a given component context,
 * if the error object is not null
 * 
 * @See See Material-UIs [Alert](https://mui.com/material-ui/react-alert/)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ContextErrorMessage extends Component {
  #standardText = 'This should not have happend. Soooo sorry...';

  /** Renders the ContextErrorMessage if error object is not null  */
  render() {
    const { error, contextErrorMsg, onReload } = this.props;

    return (
      (error !== null) ?
        <Alert severity='error'>
          <div>
            {this.#standardText}
          </div>
          <AlertTitle>
            {contextErrorMsg}
          </AlertTitle>
          <div >
            Error message (for debugging only) is:
          </div>
          <div>
            {error.message}
          </div>
          {
            onReload ?
              <div >
                <Button sx={{ marginTop: 2 }} variant='contained' color='primary' startIcon={<AutorenewIcon />} onClick={onReload}>
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

/** PropTypes */
ContextErrorMessage.propTypes = {
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

export default ContextErrorMessage;