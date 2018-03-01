import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MyComponent extends React.PureComponent {

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {}

  componentDidMount () {}

  componentWillReceiveProps (nextprops) {}

  componentWillUnmount () {}

  render () {
    return (
      <div />
    );
  }
}

MyComponent.defaultProps = {};

MyComponent.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(MyComponent);
