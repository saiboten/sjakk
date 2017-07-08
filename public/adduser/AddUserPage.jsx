import React from 'react';
import User from './User';
import AddUserForm from './AddUserForm';
import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('AddUserPage');
const uuidv1 = require('uuid/v1');

class AddUserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.loadUsers = this.loadUsers.bind(this);
    this.nameAdded = this.nameAdded.bind(this);
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
          users: snapshot.val(),
        });
      }
    });
  }

  nameAdded(name) {
    debug(this.state.users);
    const newList = this.state.users.slice();
    newList.push({
      name,
      id: uuidv1(),
      rating: 1200,
    });

    firebase.database().ref('users').set(newList);
  }

  render() {
    return (
      <div>
        <AddUserForm callback={this.nameAdded} />
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
