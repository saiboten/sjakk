import React from 'react';
import User from './User';

class AddUserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: ['Tobias', 'Lars', 'Torje', 'Halvor'],
    };
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(name => (
            <User key={name} name={name} />
         ))}
        </ul>
      </div>
    );
  }
}

module.exports = AddUserPage;
