import React from 'react';

import {
  Link,
} from 'react-router-dom';


class TournamentList extends React.Component {

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
  }
  render() {
    return (<div>Turneringer

      <ul>
        {this.state.tournaments.map(tournament => (

          <Link
            key={tournament.host}
            className="smallspace button"
            to={`/tournament/${tournament.id}`
          }

          >
            {tournament.name}
          </Link>
       ))}
      </ul>

    </div>);
  }
}

export default TournamentList;
