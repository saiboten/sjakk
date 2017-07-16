import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../firebase/FirebaseInit';
import ScoreCalculator from './ScoreCalculator';

const debug = require('debug')('UpcomingMatch');

class UpcomingMatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      winner: 'white',
      remisConfirmed: false,
      whiteWonConfirmed: false,
      blackWonConfirmed: false,
    };

    this.storeWinner = this.storeWinner.bind(this);
    this.remisConfirm = this.remisConfirm.bind(this);
    this.blackWon = this.blackWon.bind(this);
    this.whiteWon = this.whiteWon.bind(this);
  }

  remisConfirm() {
    if (this.state.remisConfirmed) {
      this.storeWinner('remis');
    }
    this.setState({
      remisConfirmed: true,
    });
  }

  blackWon() {
    if (this.state.blackWonConfirmed) {
      this.storeWinner('black');
    }
    this.setState({
      blackWonConfirmed: true,
    });
  }

  whiteWon() {
    if (this.state.whiteWonConfirmed) {
      this.storeWinner('white');
    }
    this.setState({
      whiteWonConfirmed: true,
    });
  }

  storeWinner(winner) {
    debug('Winner is ', winner);
    ScoreCalculator.calculateScore(this.props.white, this.props.black, this.props.match, winner);
  }

  render() {
    const match = this.props.match;

    debug('this.props.white: ', this.props.white);

    let renderThis = (<li>Laster</li>);

    if (this.props.white) {
      renderThis = (
        <li className="flex-row space-between smallspace" key={match.id}>
          <button className={this.state.whiteWonConfirmed ? 'completedMatch__won' : 'completedMatch__tie'} onClick={this.whiteWon}>
            <div className="flex-column">
              <div className="completedMatch__names">{this.props.white.name}</div>
              <div className="completedMatch__rating">({this.props.white.rating}) </div>
            </div>
          </button>
          <button className={this.state.blackWonConfirmed ? 'completedMatch__won' : 'completedMatch__tie'} onClick={this.blackWon}>
            <div className="flex-column">
              <div className="completedMatch__names">{this.props.black.name}</div>
              <div className="completedMatch__rating"> ({this.props.black.rating})</div>
            </div>
          </button>
          <button className="button" onClick={this.remisConfirm}>{this.state.remisConfirmed ? 'Bekreft remis' : 'Remis'}</button>
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
