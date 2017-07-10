import React from 'react';
import PropTypes from 'prop-types';

const debug = require('debug')('UpcomingMatch');

class UpcomingMatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      winner: 'remis',
    };

    this.changeWinner = this.changeWinner.bind(this);
    this.storeWinner = this.storeWinner.bind(this);
  }

  changeWinner(e) {
    debug('New vinner: ', e.target.value);
    this.setState({
      winner: e.target.value,
    });
  }

  storeWinner(e) {
    e.preventDefault();
    debug('Winner is ', this.state.winner);
    this.props.callback(this.state.winner);
  }

  render() {
    const match = this.props.match;

    return (<li key={match.id}>
      {match.white} ({match.whiteInitialRating})
      vs {match.black} ({match.blackInitialRating}):
      <form onSubmit={this.storeWinner}>
        <select value={this.state.winner} onChange={this.changeWinner}>
          <option value="white">Hvit vant</option>
          <option value="black">Svart vant</option>
          <option value="remis">Remis/Uavgjort</option>
        </select>
        <input type="submit" value="Lagre" />
      </form>
    </li>);
  }
}

UpcomingMatch.propTypes = {
  match: PropTypes.object,
  callback: PropTypes.func,
};

export default UpcomingMatch;
