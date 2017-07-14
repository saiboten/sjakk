import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('CompletedMatch');

class CompletedMatch extends React.Component {

  static deleteListElementFromList(ref, itemid) {
    debug('Deleting match from users matchlist - ref', ref, '. itemid: ', itemid);
    firebase.database().ref(ref).once('value', (snapshot) => {
      const matchListWhite = snapshot.val();
      const index = matchListWhite.indexOf(itemid);
      if (index !== -1) {
        debug('Found match to delete', matchListWhite, index);
        matchListWhite.splice(index, 1);
        firebase.database().ref(ref).set(matchListWhite);
      }
    });
  }

  constructor(props) {
    super(props);
    this.deleteMatch = this.deleteMatch.bind(this);
  }

  deleteMatch() {
    firebase.database().ref(`matches/${this.props.match.id}`).once('value', (snapshot) => {
      const matchInfo = snapshot.val();
      debug('Deleting match: ', this.props.match.id, 'tournament', this.props.tournament);

      CompletedMatch.deleteListElementFromList(`tournaments/${this.props.tournament}/matches`, this.props.match.id);
      CompletedMatch.deleteListElementFromList(`users/${this.props.match.white}/matches`, this.props.match.id);
      CompletedMatch.deleteListElementFromList(`users/${this.props.match.black}/matches`, this.props.match.id);
      firebase.database().ref(`matches/${this.props.match.id}`).remove();
    });
  }

  render() {
    const match = this.props.match;

    let result = '1/2 - 1/2';

    if (match.whiteWon) {
      result = '1 - 0';
    } else if (match.blackWon) {
      result = '0 - 1';
    }

    return (<li key={match.id}>
      {this.props.white.name} ({match.whiteInitialRating + match.whiteRatingChange} {match.whiteRatingChange > 0 ? `+${match.whiteRatingChange}` : match.whiteRatingChange})
      - {result} -
      {this.props.black.name} ({match.blackInitialRating + match.blackRatingChange} {match.blackRatingChange > 0 ? `+${match.blackRatingChange}` : match.blackRatingChange}):
    <button onClick={this.deleteMatch}>Slett</button></li>);
  }
}

CompletedMatch.propTypes = {
  match: PropTypes.object,
  white: PropTypes.object,
  black: PropTypes.object,
  tournament: PropTypes.string,
};

export default CompletedMatch;
