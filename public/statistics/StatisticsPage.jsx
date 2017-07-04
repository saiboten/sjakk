import React from 'react';

import {
  Link,
} from 'react-router-dom';


class StatisticsPage extends React.Component {

  static getUsers() {
    return [{
      id: '0',
      name: 'Tobias',
    },
    {
      id: '1',
      name: 'Lars',
    }];
  }

  constructor(props) {
    super(props);
    this.state = {
      users: StatisticsPage.getUsers(),
    };
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
      <div className="flex-row space-between"><h1>Velg bruker</h1>
        <ul>{users}</ul>
      </div>);
  }
}

module.exports = StatisticsPage;
