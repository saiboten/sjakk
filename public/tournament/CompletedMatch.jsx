import React from 'react';
import PropTypes from 'prop-types';

class CompletedMatch extends React.Component {
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
    </li>);
  }
}

CompletedMatch.propTypes = {
  match: PropTypes.object,
  white: PropTypes.object,
  black: PropTypes.object,
};

export default CompletedMatch;
