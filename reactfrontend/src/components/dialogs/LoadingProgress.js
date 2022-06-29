import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@mui/material';

/**
 * Zeigt den Ladeprozess, wenn show prop ist true.
 */
class LoadingProgress extends Component {

  /** Renders the component */
  render() {
    const { show } = this.props;

    return (
      show ?
        <div >
          <LinearProgress sx={{ width: '100%', marginTop: 2 }} color='primary' />
        </div>
        : null
    );
  }
}

/** PropTypes */
LoadingProgress.propTypes = {
  /** If true, the loading progress is rendered */
  show: PropTypes.bool.isRequired,
}

export default LoadingProgress;
