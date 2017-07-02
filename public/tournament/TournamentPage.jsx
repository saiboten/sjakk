import React from 'react';

import TournamentRegistration from './TournamentRegistration';
import TournamentList from './TournamentList';


class TournamentPage extends React.Component {
  render() {
    return (
      <div>
        <TournamentRegistration />
        <TournamentList />
      </div>);
  }
}

module.exports = TournamentPage;
