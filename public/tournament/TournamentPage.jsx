import React from 'react';

import TournamentRegistration from './TournamentRegistration';
import TournamentList from './TournamentList';
import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('TournamentPage');

class TournamentPage extends React.Component {

  static tournamentAdded(tournament) {
    debug('Adding tournament: ', tournament);
    firebase.database().ref(`tournaments/${tournament.id}`).set(tournament);
  }

  constructor(props) {
    super(props);
    this.state = {
      tournaments: {},
    };
  }

  componentDidMount() {
    this.setupTournamentListener();
  }

  componentWillUnmount() {
    this.tournaments.off();
  }

  setupTournamentListener() {
    this.tournaments = firebase.database().ref('tournaments');
    this.tournaments.on('value', (snapshot) => {
      debug('Got data: ', snapshot.val());
      if (snapshot.val()) {
        this.setState({
          tournaments: snapshot.val(),
        });
      }
    });
  }

  render() {
    return (
      <div>
        <TournamentRegistration callback={TournamentPage.tournamentAdded} />
        <TournamentList tournaments={Object.values(this.state.tournaments)} />
      </div>);
  }
}

module.exports = TournamentPage;
