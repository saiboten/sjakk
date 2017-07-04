// @flow
/* global document b:true*/
import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router, Route, Link,
} from 'react-router-dom';

import TournamentPage from './tournament/TournamentPage';
import AddUserPage from './adduser/AddUserPage';
import ChoosePath from './choosepath/ChoosePath';
import StatisticsPage from './statistics/StatisticsPage';
import Tournament from './tournament/Tournament';
import UserStatistics from './statistics/UserStatistics';


require('./global.css');
/*eslint-disable */
require('babel-polyfill');
/*eslint-enable */

render((
  <Router>
    <div>
      <Route path="/" component={ChoosePath} />
      <Route path="/tournaments" component={TournamentPage} />
      <Route path="/adduser" component={AddUserPage} />
      <Route path="/statistics" component={StatisticsPage} />
      <Route path="/tournament/:id" component={Tournament} />
      <Route path="/user/:id" component={UserStatistics} />
    </div>
  </Router>
), document.getElementById('wrapper'));
