import React from 'react';
import PropTypes from 'prop-types';

class UpcomingMatch extends React.Component {
  render() {
    const match = this.props.match;

    return (<li key={match.id}>
      {match.white} ({match.whiteInitialRating})
      vs {match.black} ({match.blackInitialRating}): </li>);
  }
}

UpcomingMatch.propTypes = {
  match: PropTypes.object,
};

export default UpcomingMatch;
