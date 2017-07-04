import React from 'react';

import TournamentRegistration from './TournamentRegistration';
import TournamentList from './TournamentList';


class TournamentPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tournaments: [
        {
          name: 'Tobias sin rekeaften',
          host: 'Tobias',
          date: '10.10.2010',
          id: 1,
        },
        {
          name: 'Halvors taconight',
          host: 'Halvor',
          date: '10.10.2010',
          id: 2,
        },
      ],
    };

    this.tournamentAdded = this.tournamentAdded.bind(this);
  }

  tournamentAdded(tournament) {
    console.log(tournament);
    const copy = this.state.tournaments.slice();
    copy.push(tournament);
    this.setState({
      tournaments: copy,
    });
  }

  render() {
    return (
      <div>
        <TournamentRegistration callback={this.tournamentAdded} />
        <TournamentList tournaments={this.state.tournaments} />
      </div>);
  }
}

module.exports = TournamentPage;
