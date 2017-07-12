// @flow
import React from 'react';

require('./container.css');
const debug = require('debug')('Container');

class Container extends React.PureComponent {
  render() {
    debug('this.props.children', this.props.children);

    return (
      <div className="sjakk-main__container">
        {this.props.children}
      </div>
    );
  }
}

Container.propTypes = {
  children: React.PropTypes.string.isRequired,
};

module.exports = Container;
