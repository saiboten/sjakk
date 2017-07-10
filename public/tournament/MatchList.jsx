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
      if (match.completed) {
        matchJsx = (<CompletedMatch key={match.id} match={match} />);
      } else {
        debug('this.props.users', this.props.users);
        debug('match.white', match.white);
        matchJsx = (<UpcomingMatch white={this.props.users[match.white]} black={this.props.users[match.black]} key={match.id} match={match} />);
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
  users: PropTypes.object,
};

export default MatchList;
