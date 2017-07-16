import React from 'react';

import {
  Link,
} from 'react-router-dom';

import firebase from '../firebase/FirebaseInit';
import Container from '../container/Container';
import ScoreBoard from './ScoreBoard';
import AddUserForm from './AddUserForm';

const debug = require('debug')('StatisticsPage');

class UsersPage extends React.Component {

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

  componentWillUnmount() {
    this.fireBaseUser.off();
  }

  getUsers() {
    this.fireBaseUser = firebase.database().ref('users');
    this.fireBaseUser.on('value', (snapshot) => {
      debug('Got data: ', snapshot.val());
      if (snapshot.val()) {
        this.setState({
          users: Object.values(snapshot.val()),
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
      <Container>
        <ScoreBoard />
        <AddUserForm />
        <h1>Brukere</h1>
        <div className="flex-column space-between">
          {users}
        </div>
      </Container>);
  }
}

module.exports = UsersPage;
