import React from 'react';
import PropTypes from 'prop-types'; // ES6

import MatchList from './MatchList';
import MatchRegistration from './MatchRegistration';
import firebase from '../firebase/FirebaseInit';

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
    const whiteMatchesList = firebase.database().ref(`matches/${newMatch.id}`);
    whiteMatchesList.once('value', (snapshot) => {
      debug('Got white matches list: ', snapshot.val());
      if (snapshot.val()) {
        const matches = snapshot.val();
        matches.push(newMatch);
        firebase.database().ref(`matches/${newMatch.id}`).set(matches);
      } else {
        const matches = [];
        matches.push(newMatch);
        firebase.database().ref(`matches/${newMatch.id}`).set(matches);
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      matches: [],
    };

    /* {
      id: 0,
      white: 'Lars',
      black: 'Halvor',
      whiteInitialRating: 1200,
      blackInitialRating: 1320,
    },
    {
      id: 1,
      white: 'Tobias',
      black: 'Torje',
      result: '1/2 - 1/2',
      whiteInitialRating: 666,
      blackInitialRating: 1337,
      whiteRatingChange: 5,
      blackRatingChange: -10,
    } */
  }

  componentDidMount() {
    this.getUsers();
    this.getMatches();
    this.addMatch = this.addMatch.bind(this);
  }

  getUsers() {
    const usersObject = firebase.database().ref('users');
    usersObject.on('value', (snapshot) => {
      debug('Got users: ', snapshot.val());

      if (snapshot.val()) {
        const users = Object.values(snapshot.val());
        this.setState({
          users,
          white: users[0].id,
          black: users[0].id,
        });
      }
    });
  }

  getMatches() {
    const users = firebase.database().ref(`tournaments/${this.props.match.params.id}/matches`);
    users.on('value', (snapshot) => {
      debug('Got matches: ', snapshot.val());
      if (snapshot.val()) {
        /* this.setState({
          matches: snapshot.val(),
        });*/
      }
    });
  }

  addMatch(matchData) {
    debug('New match data: ', matchData);

    const whitePlayer = this.state.users.filter(user => (
      user.id === matchData.white
    ))[0];

    const blackPlayer = this.state.users.filter(user => (
      user.id === matchData.black
    ))[0];

    const newMatch = {
      id: uuidv1(),
      white: whitePlayer.name,
      black: blackPlayer.name,
      whiteInitialRating: whitePlayer.rating,
      blackInitialRating: blackPlayer.rating,
    };

    Tournament.storeNewMatch(newMatch);
    Tournament.storeMatchInUserList(matchData.white, newMatch.id);
    Tournament.storeMatchInUserList(matchData.black, newMatch.id);

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
    return (<div>Tournament {this.props.match.params.id}
      <MatchRegistration callback={this.addMatch} />
      <MatchList matches={Object.values(this.state.matches)} />
    </div>);
  }
}

Tournament.propTypes = {
  match: PropTypes.object,
};

export default Tournament;
