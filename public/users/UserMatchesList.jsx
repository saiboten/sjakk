import React from 'react';
import PropTypes from 'prop-types';

const debug = require('debug')('UserMatchesList');

class UserMatchesList extends React.Component {

  static findPlayerCssClass(white, match) {
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
    let ratingProgress = [];
    if (this.props.users && this.props.matches && this.props.user) {
      let userMatches = this.props.users[this.props.user].matches.map(match => (
        this.props.matches[match]
      ));

      debug('userMatches', userMatches);
      debug('this.props.users', this.props.users);

      userMatches = userMatches.filter(match => (match.completed));

      ratingProgress = userMatches.map((match) => {
        debug('match', match);
        const white = this.props.users[match.white];
        const black = this.props.users[match.black];

        let wonOrLost = 'Uavgjort';

        if ((match.white === this.props.user && match.whiteWon) || (match.black === this.props.user && match.blackWon)) {
          wonOrLost = 'Seier';
        } if ((match.white === this.props.user && match.blackWon) || (match.black === this.props.user && match.whiteWon)) {
          wonOrLost = 'Tap';
        }

        return (<li className="flex-row smallspace" key={match.id}>
          <span className={UserMatchesList.findPlayerCssClass(true, match)}>
            <div className="flex-column">
              <div className="completedMatch__names">{white.name}</div>
              <div className="completedMatch__rating">{match.whiteInitialRating + match.whiteRatingChange} {match.whiteRatingChange > 0 ? `+${match.whiteRatingChange}` : match.whiteRatingChange} </div>
            </div>
          </span>
          <span className={UserMatchesList.findPlayerCssClass(false, match)}>
            <div className="flex-column">
              <div className="completedMatch__names">{black.name}</div>
              <div className="completedMatch__rating"> {match.blackInitialRating + match.blackRatingChange} {match.blackRatingChange > 0 ? `+${match.blackRatingChange}` : match.blackRatingChange} </div>
            </div>
          </span>
          <span className="space">{wonOrLost}</span>
        </li>);
      });
    }

    return (
      <ul>
        {ratingProgress}
      </ul>);
  }

}

UserMatchesList.propTypes = {
  matches: PropTypes.object,
  users: PropTypes.object,
  user: PropTypes.string,
};

module.exports = UserMatchesList;
