import React from 'react';
import User from './User';
import AddUserForm from './AddUserForm';
import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('AddUserPage');
const uuidv1 = require('uuid/v1');

class AddUserPage extends React.Component {

  static nameAdded(name) {
    const user = {
      name,
      id: uuidv1(),
      rating: 1200,
    };

    firebase.database().ref(`users/${user.id}`).set(user);
  }

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.loadUsers = this.loadUsers.bind(this);
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers() {
    const users = firebase.database().ref('users');
    users.on('value', (snapshot) => {
      debug('Got data: ', snapshot.val());
      if (snapshot.val()) {
        this.setState({
          users: Object.values(snapshot.val()),
        });
      }
    });
  }

  render() {
    return (
      <div>
        <AddUserForm callback={AddUserPage.nameAdded} />
        <ul>
          {this.state.users.map(user => (
            <User key={user.id} name={user.name} />
         ))}
        </ul>
      </div>
    );
  }
}

module.exports = AddUserPage;
