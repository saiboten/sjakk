import React from 'react';

import {
  Link,
} from 'react-router-dom';

import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('StatisticsPage');

class StatisticsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.getUsers = this.getUsers.bind(this);
    this.getUsers();
  }

  getUsers() {
    const users = firebase.database().ref('users');
    users.on('value', (snapshot) => {
      debug('Got data: ', snapshot.val());
      if (snapshot.val()) {
        this.setState({
          users: snapshot.val(),
        });
      }
    });
  }

  render() {
    const users = this.state.users.map(user => (
      <Link
        key={user.id}
        to={`/user/${user.id}`
      }
      >
        {user.name}
      </Link>
    ));

    return (
      <div><h1>Velg bruker</h1>
        <div className="flex-column space-between">
          {users}
        </div>
      </div>);
  }
}

module.exports = StatisticsPage;
