import React from 'react';
import PropTypes from 'prop-types'; // ES6

class TournamentRegistration extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      host: '',
      date: undefined,
      id: 3,
    };

    this.submit = this.submit.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
    this.hostChanged = this.hostChanged.bind(this);
  }

  nameChanged(e) {
    this.setState({
      name: e.target.value,
    });
  }

  hostChanged(e) {
    this.setState({
      host: e.target.value,
    });
  }

  submit(e) {
    e.preventDefault();
    this.props.callback(this.state);
  }

  render() {
    return ((<form onSubmit={this.submit}>
      <div className="flex-row space-between"><label htmlFor="name">Navn</label><input id="name" onChange={this.nameChanged} value={this.state.name} /></div>
      <div className="flex-row space-between"><label htmlFor="host">Host</label><input id="host" onChange={this.hostChanged} value={this.state.host} /></div>
      <input className="button" type="submit" value="Legg til" />
    </form>));
  }
}

TournamentRegistration.propTypes = {
  callback: PropTypes.func,
};

export default TournamentRegistration;
