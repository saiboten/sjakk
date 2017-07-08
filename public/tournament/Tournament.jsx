import React from 'react';
import PropTypes from 'prop-types'; // ES6

import MatchList from './MatchList';
import MatchRegistration from './MatchRegistration';
import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('Tournament');
const uuidv1 = require('uuid/v1');

class Tournament extends React.Component {

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
    this.addMatch = this.addMatch.bind(this);
  }

  getUsers() {
    const users = firebase.database().ref('users');
    users.on('value', (snapshot) => {
      debug('Got data: ', snapshot.val());
      if (snapshot.val()) {
        this.setState({
          users: snapshot.val(),
          white: snapshot.val()[0].id,
          black: snapshot.val()[0].id,
        });
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

    const newMatchList = this.state.matches.slice();

    newMatchList.push(newMatch);

    this.setState({
      matches: newMatchList,
    });
  }

  render() {
    return (<div>Tournament {this.props.match.params.name}
      <MatchRegistration callback={this.addMatch} />
      <MatchList matches={this.state.matches} />
    </div>);
  }
}

Tournament.propTypes = {
  match: PropTypes.object,
};

export default Tournament;
