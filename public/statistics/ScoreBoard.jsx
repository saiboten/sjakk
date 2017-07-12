import React from 'react';
import PropTypes from 'prop-types'; // ES6

import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('ScoreBoard');

class ScoreBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    firebase.database().ref('users').on('value', (snapshot) => {
      const users = snapshot.val();
      debug('User', users);
      this.setState({
        users: Object.values(users),
      });
    });
  }

  render() {
    const copyList = this.state.users.slice();

    copyList.sort((a, b) => (
      a.rating < b.rating
    ));

    const scoreboardlist = copyList.map(user => (
      (<li>{user.name} - {user.rating}</li>)
    ));

    return (
      <div>
        <h1>Scoreboard</h1>
        <ul className="flex-column">
          {scoreboardlist}
        </ul>
      </div>);
  }
}

module.exports = ScoreBoard;
