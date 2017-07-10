import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../firebase/FirebaseInit';

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

  /*     id: 1,
      white: 'Tobias',
      black: 'Torje',
      result: '1/2 - 1/2',
      whiteInitialRating: 666,
      blackInitialRating: 1337,
      whiteRatingChange: 5,
      blackRatingChange: -10, */

  storeWinner(e) {
    // TODO move this to somewhere else ...
    e.preventDefault();
    debug('Winner is ', this.state.winner);

    const updatedObject = Object.assign({}, this.props.match);

    updatedObject.completed = true;

    if (this.state.winner === 'white') {
      updatedObject.whiteWon = true;
      updatedObject.whiteRatingChange = 10;
      updatedObject.blackRatingChange = -9;
    } else if (this.state.winner === 'black') {
      updatedObject.blackWon = true;
      updatedObject.blackRatingChange = 10;
      updatedObject.whiteRatingChange = -11;
    } else {
      updatedObject.remis = true;
    }

    firebase.database().ref(`matches/${this.props.match.id}`).set(updatedObject);
  }

  render() {
    const match = this.props.match;

    return (<li key={match.id}>
      {match.white} ({match.whiteInitialRating})
      vs {match.black} ({match.blackInitialRating}):
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
}

UpcomingMatch.propTypes = {
  match: PropTypes.object,
};

export default UpcomingMatch;
