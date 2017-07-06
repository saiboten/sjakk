import React from 'react';

import TournamentRegistration from './TournamentRegistration';
import TournamentList from './TournamentList';
import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('TournamentPage');

class TournamentPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
    };

    this.tournamentAdded = this.tournamentAdded.bind(this);
  }

  componentDidMount() {
    this.setupTournamentListener();
  }

  setupTournamentListener() {
    const tournaments = firebase.database().ref('tournaments');
    tournaments.on('value', (snapshot) => {
      debug('Got data: ', snapshot.val());
      if (snapshot.val()) {
        this.setState({
          tournaments: snapshot.val(),
        });
      }
    });
  }

  tournamentAdded(tournament) {
    debug('Adding tournament: ', tournament);
    const copy = this.state.tournaments.slice();
    copy.push(tournament);
    firebase.database().ref('tournaments').set(copy);
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
