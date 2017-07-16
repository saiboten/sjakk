import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('CompletedMatch');

require('./completedmatch.css');

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
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelConfirmDelete = this.cancelConfirmDelete.bind(this);

    this.state = {
      confirmedDelete: false,
    };
  }

  confirmDelete() {
    if (this.state.confirmedDelete) {
      this.deleteMatch();
    }

    debug('Setting confirmedDelete to true');
    this.setState({
      confirmedDelete: true,
    });
  }

  cancelConfirmDelete() {
    debug('Setting confirmedDelete to false');

    this.setState({
      confirmedDelete: false,
    });
  }

  deleteMatch() {
    firebase.database().ref(`matches/${this.props.match.id}`).once('value', (snapshot) => {
      const matchInfo = snapshot.val();
      debug('Deleting match: ', this.props.match.id, 'tournament', this.props.tournament);

      CompletedMatch.deleteListElementFromList(`tournaments/${this.props.tournament}/matches`, this.props.match.id);
      CompletedMatch.deleteListElementFromList(`users/${this.props.match.white}/matches`, this.props.match.id);
      CompletedMatch.deleteListElementFromList(`users/${this.props.match.black}/matches`, this.props.match.id);
      firebase.database().ref(`matches/${this.props.match.id}`).remove();

      if (matchInfo.completed) {
        debug('Match is completed. We need to restore user ratings');
      }
    });
  }

  findPlayerCssClass(white) {
    const match = this.props.match;

    const youWon = (white && match.whiteWon) || (!white && match.blackWon);
    const youLost = (white && match.blackWon) || (!white && match.whiteWon);

    if (youWon) {
      return 'completedMatch__won';
    } else if (youLost) {
      return 'completedMatch__lost';
    }
    return 'completedMatch__tie';
  }

  render() {
    const match = this.props.match;

    const displayNone = {
      display: 'none',
    };

    let confirmDeleteMatchButton = (<span style={displayNone} />);
    if (this.state.confirmedDelete) {
      confirmDeleteMatchButton = (<button className="button" onClick={this.cancelConfirmDelete}>Avbryt</button>);
    }

    return (<li className="flex-row space-between smallspace" key={match.id}>
      <span className={this.findPlayerCssClass(true)}>
        <div className="flex-column">
          <div className="completedMatch__names">{this.props.white.name}</div>
          <div className="completedMatch__rating">({match.whiteInitialRating + match.whiteRatingChange} {match.whiteRatingChange > 0 ? `+${match.whiteRatingChange}` : match.whiteRatingChange}) </div>
        </div>
      </span>
      <span className={this.findPlayerCssClass(false)}>
        <div className="flex-column">
          <div className="completedMatch__names">{this.props.black.name}</div>
          <div className="completedMatch__rating"> ({match.blackInitialRating + match.blackRatingChange} {match.blackRatingChange > 0 ? `+${match.blackRatingChange}` : match.blackRatingChange}) </div>
        </div>
      </span>
      <button className="button" onClick={this.confirmDelete}>Slett</button>{confirmDeleteMatchButton}</li>);
  }
}

CompletedMatch.propTypes = {
  match: PropTypes.object,
  white: PropTypes.object,
  black: PropTypes.object,
  tournament: PropTypes.string,
};

export default CompletedMatch;
