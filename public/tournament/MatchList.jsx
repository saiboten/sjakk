import React from 'react';
import PropTypes from 'prop-types';

import UpcomingMatch from './UpcomingMatch';
import CompletedMatch from './CompletedMatch';
import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('MatchList');

class MatchList extends React.Component {

  render() {
    const matchList = this.props.matches.map((match) => {
      let matchJsx;
      if (match.result) {
        matchJsx = (<CompletedMatch key={match.id} match={match} />);
      } else {
        matchJsx = (<UpcomingMatch key={match.id} match={match} />);
      }
      return matchJsx;
    });

    return (
      <ul>
        {matchList}
      </ul>
    );
  }
}

MatchList.propTypes = {
  matches: PropTypes.array,
};

export default MatchList;
