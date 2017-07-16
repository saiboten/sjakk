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
        matchJsx = (<CompletedMatch tournament={this.props.tournament} white={this.props.users[match.white]} black={this.props.users[match.black]} key={match.id} match={match} />);
      } else {
        matchJsx = (<UpcomingMatch tournament={this.props.tournament} white={this.props.users[match.white]} black={this.props.users[match.black]} key={match.id} match={match} />);
      }
      return matchJsx;
    });

    return (
      <ul className="smallspace">
        {matchList}
      </ul>
    );
  }
}

MatchList.propTypes = {
  matches: PropTypes.array,
  users: PropTypes.object,
  tournament: PropTypes.string,
};

export default MatchList;
