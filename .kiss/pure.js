import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ReactPureComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextprops) {}

  componentWillUnmount() {}

  render() {
    return <div />;
  }
}

ReactPureComponent.defaultProps = {};

ReactPureComponent.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(ReactPureComponent);
