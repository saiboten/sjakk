import React from 'react';
import PropTypes from 'prop-types';

class CompletedMatch extends React.Component {
  render() {
    const match = this.props.match;

    return (<li key={match.id}>
      {match.white} ({match.whiteInitialRating + match.whiteRatingChange} {match.whiteRatingChange > 0 ? `+${match.whiteRatingChange}` : match.whiteRatingChange})
      - {match.result} -
      {match.black} ({match.blackInitialRating + match.blackRatingChange} {match.blackRatingChange > 0 ? `+${match.blackRatingChange}` : match.blackRatingChange}):
    </li>);
  }
}

CompletedMatch.propTypes = {
  match: PropTypes.object,
};

export default CompletedMatch;
