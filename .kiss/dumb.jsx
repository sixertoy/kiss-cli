import { withStyles } from '@iziges/napper-core-react';
import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({
  container: {},
});

const ReactDumbComponent = ({ classes }) => (
  <div className={classes.container} />
);

ReactDumbComponent.defaultProps = {};

ReactDumbComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(ReactDumbComponent);
