import React from 'react';
import PropTypes from 'prop-types'; // ES6

import firebase from '../firebase/FirebaseInit';
import Container from '../container/Container';
import UserMatchesList from './UserMatchesList';

const debug = require('debug')('UserStatistics');

class UserStatistics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      users: {},
      matchesPlayed: 0,
      matches: undefined,
    };
  }

  componentDidMount() {
    this.usersfb = firebase.database().ref('users').on('value', (snapshot) => {
      const users = snapshot.val();
      debug('Users', users);
      this.setState({
        users,
        user: users[this.props.match.params.id],
        matchesPlayed: users[this.props.match.params.id].matches.length,
      });
    });

    this.matchesfb = firebase.database().ref('matches').on('value', (snapshot) => {
      const matches = snapshot.val();
      debug('Matches', matches);
      this.setState({
        matches,
      });
    });
  }

  componentWillUnmount() {
    this.usersfb.off();
    this.matchesfb.off();
  }

  render() {
    let matches = 0;
    let wins = 0;
    let losses = 0;
    let ties = 0;
    let winsAsWhite = 0;
    let winsAsBlack = 0;

    if (this.state.matches && this.state.users) {
      let userMatches = this.state.users[this.props.match.params.id].matches.map(match => (
        this.state.matches[match]
      ));

      userMatches = userMatches.filter(match => (match.completed));

      debug('User matches: ', userMatches);

      wins = userMatches.reduce((wonMatches, match) => {
        let won = 0;
        if (match.white === this.props.match.params.id && match.whiteWon) {
          won = 1;
        } else if (match.black === this.props.match.params.id && match.blackWon) {
          won = 1;
        }
        return wonMatches + won;
      }, 0);

      losses = userMatches.reduce((lostMatches, match) => {
        let lost = 0;
        if (match.white === this.props.match.params.id && match.blackWon) {
          lost = 1;
        } else if (match.black === this.props.match.params.id && match.whiteWon) {
          lost = 1;
        }
        return lostMatches + lost;
      }, 0);

      ties = userMatches.reduce((tiedMatches, match) => (
        tiedMatches + (match.remis ? 1 : 0)
      ), 0);

      winsAsBlack = userMatches.reduce((gamesTotal, match) => (
        gamesTotal + (match.black === this.props.match.params.id && match.blackWon ? 1 : 0)
      ), 0);

      winsAsWhite = userMatches.reduce((gamesTotal, match) => (
        gamesTotal + (match.white === this.props.match.params.id && match.whiteWon ? 1 : 0)
      ), 0);

      matches = this.state.matches.length;
    }

    return (
      <Container>
        <h1>Brukerstatistikk for {this.state.user.name}</h1>
        <ul className="flex-column">
          <li>Rating: {this.state.user.rating}</li>
          <li>Antall kamper: {matches}</li>
          <li>Seire: {wins}</li>
          <li>Tap: {losses}</li>
          <li>Remis: {ties}</li>
          <br />
          <li>Seire som hvit: {winsAsWhite}</li>
          <li>Seire som sort: {winsAsBlack}</li>
        </ul>

        <ul>
          <h1>Kamper</h1>
          <UserMatchesList matches={this.state.matches} users={this.state.users} user={this.props.match.params.id} />
        </ul>

      </Container>);
  }
}

UserStatistics.propTypes = {
  match: PropTypes.object,
};

module.exports = UserStatistics;
