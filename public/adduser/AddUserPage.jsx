import React from 'react';
import User from './User';
import AddUserForm from './AddUserForm';

class AddUserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: ['Tobias', 'Lars', 'Torje', 'Halvor'],
    };
    this.nameAdded = this.nameAdded.bind(this);
  }

  nameAdded(name) {
    console.log(this.state.users);
    const newList = this.state.users.slice();
    newList.push(name);

    this.setState({
      users: newList,
    });
  }

  render() {
    return (
      <div>
        <AddUserForm callback={this.nameAdded} />
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
