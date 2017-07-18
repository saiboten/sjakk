import React from 'react';
import PropTypes from 'prop-types'; // ES6

import MatchList from './MatchList';
import MatchRegistration from './MatchRegistration';
import firebase from '../firebase/FirebaseInit';
import Container from '../container/Container';

require('./tournament.css');

const debug = require('debug')('Tournament');
const uuidv1 = require('uuid/v1');

class Tournament extends React.Component {

  static storeMatchInUserList(player, matchId) {
    const whiteMatchesList = firebase.database().ref(`users/${player}/matches`);

    whiteMatchesList.once('value', (snapshot) => {
      debug('Got white matches list: ', snapshot.val());
      if (snapshot.val()) {
        const matches = snapshot.val();
        matches.push(matchId);
        firebase.database().ref(`users/${player}/matches`).set(matches);
      } else {
        const matches = [];
        matches.push(matchId);
        firebase.database().ref(`users/${player}/matches`).set(matches);
      }
    });
  }

  static storeNewMatch(newMatch) {
    firebase.database().ref(`matches/${newMatch.id}`).set(newMatch);
  }

  constructor(props) {
    super(props);
    this.state = {
      users: {},
      matches: [],
    };
  }

  componentDidMount() {
    this.getUsers();
    this.setUpMatchesAndTournamentListener();
    this.addMatch = this.addMatch.bind(this);
    this.setMatchList = this.setMatchList.bind(this);
  }

  componentWillUnmount() {
    this.fireBaseUsers.off();
    this.allMatchesFb.off();
    this.tournamentMatchesFb.off();
  }

  getUsers() {
    this.fireBaseUsers = firebase.database().ref('users');
    this.fireBaseUsers.on('value', (snapshot) => {
      debug('Got users: ', snapshot.val());

      if (snapshot.val()) {
        const users = snapshot.val();
        this.setState({
          users,
          white: Object.values(users)[0].id,
          black: Object.values(users)[0].id,
        });
      }
    });
  }

  setUpMatchesAndTournamentListener() {
    this.allMatchesFb = firebase.database().ref('matches');
    this.allMatchesFb.on('value', (snapshot) => {
      const allMatches = snapshot.val();

      debug('All matches list changed', allMatches);
      if (allMatches) {
        this.allMatches = allMatches;
      } else {
        this.allMatches = undefined;
      }
      this.setMatchList();
    });

    this.tournamentMatchesFb = firebase.database().ref(`tournaments/${this.props.match.params.id}/matches`);
    this.tournamentMatchesFb.on('value', (snapshot) => {
      const tournamentMatchesIDList = snapshot.val();
      debug('List of matches in this tournament: ', tournamentMatchesIDList);
      if (tournamentMatchesIDList) {
        this.tournamentMatchesIDList = tournamentMatchesIDList;
        this.setMatchList();
      }
    });
  }

  setMatchList() {
    if (this.tournamentMatchesIDList && this.allMatches) {
      const matchList = this.tournamentMatchesIDList.map(matchId => (
        this.allMatches[matchId]
      )).filter(match => (match));

      debug('Match list after filtering and stuff', matchList);

      this.setState({
        matches: matchList,
      });
    } else {
      this.setState({
        matches: [],
      });
    }
  }

  addMatch(matchData) {
    debug('New match data: ', matchData);

    const whitePlayer = this.state.users[matchData.white];
    const blackPlayer = this.state.users[matchData.black];

    const newMatch = {
      id: uuidv1(),
      white: whitePlayer.id,
      black: blackPlayer.id,
      tournament: this.props.match.params.id,
    };

    debug('New match data: ', newMatch);

    Tournament.storeMatchInUserList(matchData.white, newMatch.id);
    Tournament.storeMatchInUserList(matchData.black, newMatch.id);
    Tournament.storeNewMatch(newMatch);

    const tournamentMatches = firebase.database().ref(`tournaments/${this.props.match.params.id}/matches`);

    tournamentMatches.once('value', (snapshot) => {
      debug('Got tournament matches list: ', snapshot.val());
      if (snapshot.val()) {
        const matchIdList = snapshot.val();
        matchIdList.push(newMatch.id);
        firebase.database().ref(`tournaments/${this.props.match.params.id}/matches`).set(matchIdList);
      } else {
        const matchIdList = [];
        matchIdList.push(newMatch.id);
        firebase.database().ref(`tournaments/${this.props.match.params.id}/matches`).set(matchIdList);
      }
    });
  }

  render() {
    return (<Container>
      <h1>Registrer kamp</h1>
      <MatchRegistration callback={this.addMatch} />
      <h1>Kampliste</h1>
      <MatchList
        tournament={this.props.match.params.id}
        users={this.state.users}
        matches={Object.values(this.state.matches)}
      />
    </Container>);
  }
}

Tournament.propTypes = {
  match: PropTypes.object,
};

export default Tournament;
