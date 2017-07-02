// @flow

import React from 'react';
import {
  Link,
} from 'react-router-dom';

import PropTypes from 'prop-types'; // ES6

const debug = require('debug')('ChoosePath');

require('./choosepath.css');

class ChoosePath extends React.Component {

  componentDidMount() {
    debug('componentDidMount');
  }

  render() {
    return (
      <div>
        <h1>Hva vil du gjøre?</h1>

        <div>
          <Link className="smallspace button" to="/adduser">Legg til bruker</Link>
          <Link className="smallspace button" to="/tournament">Turneringer</Link>
          <Link className="smallspace button" to="/statistics">Statistikk</Link>
        </div>
      </div>
    );
  }
}

ChoosePath.propTypes = {
  router: PropTypes.object,
};

module.exports = ChoosePath;
