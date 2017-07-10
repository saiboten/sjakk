import React from 'react';
import PropTypes from 'prop-types'; // ES6

import User from './User';

class AddUserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };

    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.callback({
      name: this.state.name,
      email: this.state.email,
    });
    this.setState({
      name: '',
      email: '',
    });
  }

  nameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  emailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="flex-column space-between">
          <h1>Legg til bruker</h1>
          <label htmlFor="name">Navn</label><input onChange={this.nameChange} id="name" value={this.state.name} />
          <label htmlFor="email">Email</label><input onChange={this.emailChange} id="email" value={this.state.email} />

        </div>
        <input className="button" type="submit" value="Legg til bruker" />
      </form>
    );
  }
}

AddUserForm.propTypes = {
  callback: PropTypes.func,
};

module.exports = AddUserForm;
