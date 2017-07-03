import React from 'react';
import PropTypes from 'prop-types'; // ES6

import MatchList from './MatchList';
import MatchRegistration from './MatchRegistration';


class Tournament extends React.Component {
  render() {
    return (<div>Tournament {this.props.match.params.id}
      <MatchRegistration />
      <MatchList />
    </div>);
  }
}

Tournament.propTypes = {
  match: PropTypes.object,
};

export default Tournament;
