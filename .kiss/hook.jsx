import { withStyles } from '@iziges/napper-core-react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const styles = () => ({
  container: {},
});

function componentWillUnmount() {}

const ReactHookComponent = ({ classes }) => {
  useEffect(() => {
    return componentWillUnmount;
  }, []);
  return <div className={classes.container} />;
};

ReactHookComponent.defaultProps = {};

ReactHookComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(ReactHookComponent);
