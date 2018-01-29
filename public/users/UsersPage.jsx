import React from 'react';
import { array } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import firebase from '../firebase/FirebaseInit';
import Container from '../container/Container';
import ScoreBoard from './ScoreBoard';
import AddUserForm from './AddUserForm';

const debug = require('debug')('StatisticsPage');

const UsersPage = ({ users }) => {
  const usersElements = users.map(user => (
    <li key={user.id}><Link
      key={user.id}
      to={`/user/${user.id}`
    }
    >
      {user.name}
    </Link></li>
  ));

  return (
    <Container>
      <ScoreBoard />
      <AddUserForm />
      <h1>Brukere</h1>
      <ul className="flex-column space-between">
        {usersElements}
      </ul>
    </Container>);
};

UsersPage.propTypes = {
  users: array,
};

UsersPage.defaultProps = {
  users: [],
};

export default connect(state => ({}), dispatch => ({}))(UsersPage);
