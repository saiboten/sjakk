
import React from 'react';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types'; // ES6

import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('SelectUser');

class Login extends React.Component {

  constructor(props) {
    super();
    debug('constructor');
    this.state = {
      user: '',
      password: '',
      feedback: '',
      loggedin: false,
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.updatePasswordState = this.updatePasswordState.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.authChangeListener = this.authChangeListener.bind(this);

    this.authChangeListener();
  }

  componentDidMount() {
    debug('componentDidMount');
  }

  updateUserState(e) {
    debug('updateUserState', e);

    this.setState({
      user: e.target.value,
    });
  }

  updatePasswordState(e) {
    debug('updatePasswordState', e);

    this.setState({
      password: e.target.value,
    });
  }

  logIn(e) {
    debug('logIn', e);

    debug('Logging user in with the following credentials: ', this.state.user, this.state.password);
    e.preventDefault();

    this.setState({
      feedback: '',
    });

    firebase.auth().signInWithEmailAndPassword(this.state.user, this.state.password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      debug('Errorcode: ', errorCode, 'errorMessage', errorMessage);

      if (errorCode) {
        this.setState({
          feedback: 'Klarte ikke å logge deg inn, beklager det.',
        });
      }
    });
  }

  logOut(e) {
    debug('logOut', e);

    e.preventDefault();

    this.setState({
      feedback: '',
      password: '',
    });

    firebase.auth().signOut().then(() => {
      this.setState({
        feedback: 'Du er nå logget ut',
      });
    }, (error) => {
      this.setState({
        feedback: 'Klarte ikke å logge deg ut, beklager det!',
      });
    });
  }

  authChangeListener() {
    firebase.auth().onAuthStateChanged((user) => {
      debug('onAuthStateChanged. User logged in: ', user);
      this.setState({
        loggedIn: true,
      });
    });
  }

  render() {
    const continuePlease = (<div className="flex-row">
      <Link className="smallspace button" to="/adduser">Brukere</Link>
      <Link className="smallspace button" to="/tournaments">Turneringer</Link>
      <Link className="smallspace button" to="/statistics">Statistikk</Link>
      <Link className="smallspace button" to="/login">Logg ut</Link>
    </div>);

    const loginForm = (<form className="select-user__form" onSubmit={this.logIn} >
      <div className="smallspace">Brukernavn</div>
      <input className="smallspace" value={this.state.user} onChange={this.updateUserState} />
      <div className="smallspace">Passord</div>
      <input
        type="password"
        className="smallspace"
        value={this.state.password}
        onChange={this.updatePasswordState}
      />
      <div className="flex-row space-between">
        <input className="button" type="submit" value="Logg inn" />
      </div>
    </form>);

    return (<div>
      <h1>Logg inn</h1>

      {this.state.loggedIn ? continuePlease : loginForm}
      {this.state.feedback}

    </div>);
  }
}

Login.propTypes = {
  history: PropTypes.object,
};

module.exports = Login;
