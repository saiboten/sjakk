import React from 'react';
import PropTypes from 'prop-types'; // ES6

import User from './User';

class AddUserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };

    this.nameChange = this.nameChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.callback(this.state.name);
    this.setState({
      name: '',
    });
  }

  nameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="flex-column space-between">
          <h1>Legg til bruker</h1>
          <label htmlFor="name">Navn</label><input onChange={this.nameChange} id="name" value={this.state.name} />
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
