import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../firebase/FirebaseInit';
import ScoreCalculator from './ScoreCalculator';

const debug = require('debug')('UpcomingMatch');

class UpcomingMatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      winner: 'remis',
    };

    this.changeWinner = this.changeWinner.bind(this);
    this.storeWinner = this.storeWinner.bind(this);
  }

  changeWinner(e) {
    debug('New vinner: ', e.target.value);
    this.setState({
      winner: e.target.value,
    });
  }

  storeWinner(e) {
    e.preventDefault();
    debug('Winner is ', this.state.winner);
    ScoreCalculator.calculateScore(this.props.white, this.props.black, this.props.match, this.state.winner);
  }

  render() {
    const match = this.props.match;

    debug('this.props.white: ', this.props.white);

    let renderThis = (<li>Laster</li>);

    if (this.props.white) {
      renderThis = (<li key={match.id}>
        {this.props.white.name} ({this.props.white.rating})
        vs {this.props.black.name} ({this.props.black.rating}):
        <form onSubmit={this.storeWinner}>
          <select value={this.state.winner} onChange={this.changeWinner}>
            <option value="white">Hvit vant</option>
            <option value="black">Svart vant</option>
            <option value="remis">Remis/Uavgjort</option>
          </select>
          <input type="submit" value="Lagre" />
        </form>
      </li>);
    }

    return renderThis;
  }
}

UpcomingMatch.propTypes = {
  match: PropTypes.object,
  white: PropTypes.object,
  black: PropTypes.object,
};

export default UpcomingMatch;
