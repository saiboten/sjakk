// @flow
/* global document b:true*/
import React from 'react';

import {
  BrowserRouter as Router, Route, Link,
} from 'react-router-dom';

import Login from './login/Login';
import TournamentPage from './tournament/TournamentPage';
import ChoosePath from './choosepath/ChoosePath';
import UsersPage from './users/UsersPage';
import Tournament from './tournament/Tournament';
import UserStatistics from './users/UserStatistics';

require('./global.css');
/*eslint-disable */
require('babel-polyfill');
/*eslint-enable */

const App = () => (
  <Router>
    <div>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/choosepath" component={ChoosePath} />
      <Route path="/tournaments" component={TournamentPage} />
      <Route path="/users" component={UsersPage} />
      <Route path="/tournament/:id" component={Tournament} />
      <Route path="/user/:id" component={UserStatistics} />
    </div>
  </Router>
);

export default App;
