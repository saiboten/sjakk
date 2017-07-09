import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('MatchRegistration');

class MatchRegistration extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      black: undefined,
      white: undefined,
      date: moment(),
      users: [],
    };

    this.submit = this.submit.bind(this);
    this.whiteChanged = this.whiteChanged.bind(this);
    this.blackChanged = this.blackChanged.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    const usersObject = firebase.database().ref('users');
    usersObject.on('value', (snapshot) => {
      debug('Got data: ', snapshot.val());
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

  whiteChanged(e) {
    debug('White changed', e.target.value);
    this.setState({
      white: e.target.value,
    });
  }

  blackChanged(e) {
    debug('Black changed', e.target.value);
    this.setState({
      black: e.target.value,
    });
  }

  submit(e) {
    e.preventDefault();
    debug('Submit', this.state);
    this.props.callback({
      white: this.state.white,
      black: this.state.black,
      date: this.state.date.format(),
    });
  }

  render() {
    const options = this.state.users.map(user => (
      (<option key={user.id} value={user.id}>{user.name}</option>)
    ));

    return (<form onSubmit={this.submit}>
      <div className="flex-column space-between smallspace">
        <label className="smallspace" htmlFor="white">Hvit</label><select value={this.state.white} onChange={this.whiteChanged}>
          {options}
        </select>
        <label className="smallspace" htmlFor="black">Svart</label><select value={this.state.black} onChange={this.blackChanged}>
          {options}
        </select>
      </div>
      <input className="button" type="submit" value="Legg til kamp" />
    </form>);
  }
}

MatchRegistration.propTypes = {
  callback: PropTypes.func,
};

export default MatchRegistration;
