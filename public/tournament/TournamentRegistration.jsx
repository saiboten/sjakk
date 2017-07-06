import React from 'react';
import PropTypes from 'prop-types'; // ES6
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const debug = require('debug')('TournamentRegistration');

class TournamentRegistration extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      host: '',
      date: moment(),
    };

    this.submit = this.submit.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
    this.hostChanged = this.hostChanged.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
  }

  dateChanged(date) {
    debug('date changed, new date: ', date);
    this.setState({
      date,
    });
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
    this.props.callback({
      date: this.state.date.format(),
      host: this.state.host,
      name: this.state.name,
    });
  }

  render() {
    return ((<form onSubmit={this.submit}>
      <div className="flex-row space-between"><label htmlFor="name">Navn</label><input id="name" onChange={this.nameChanged} value={this.state.name} /></div>
      <div className="flex-row space-between"><label htmlFor="host">Host</label><input id="host" onChange={this.hostChanged} value={this.state.host} /></div>
      <DatePicker
        selected={this.state.startDate}
        onChange={this.dateChanged}
      />;
      <input className="button" type="submit" value="Legg til" />
    </form>));
  }
}

TournamentRegistration.propTypes = {
  callback: PropTypes.func,
};

export default TournamentRegistration;
