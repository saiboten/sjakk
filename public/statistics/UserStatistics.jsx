import React from 'react';
import PropTypes from 'prop-types'; // ES6

class UserStatistics extends React.Component {

  render() {
    return (
      <div className="flex-row space-between">
        <h1>Brukerstatistikk for {this.props.match.params.id}</h1>
      </div>);
  }
}

UserStatistics.propTypes = {
  match: PropTypes.object,
};

module.exports = UserStatistics;
