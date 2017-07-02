import React from 'react';

import PropTypes from 'prop-types'; // ES6

class User extends React.Component {
  render() {
    return (<li>{this.props.name}</li>);
  }
}

User.propTypes = {
  name: PropTypes.string,
};

export default User;
