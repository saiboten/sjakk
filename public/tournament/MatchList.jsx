import React from 'react';

class MatchList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matches: [{
        id: 0,
        white: 'Lars',
        black: 'Halvor',
        whiteInitialRating: 1200,
        blackInitialRating: 1320,
      },
      {
        id: 1,
        white: 'Tobias',
        black: 'Torje',
        result: '1/2 - 1/2',
        whiteInitialRating: 666,
        blackInitialRating: 1337,
        whiteRatingChange: 5,
        blackRatingChange: -10,
      }],
    };
  }

  render() {
    const matchList = this.state.matches.map((match) => {
      let matchJsx;
      if (match.result) {
        matchJsx = (<li key={match.id}>
          {match.white} ({match.whiteInitialRating + match.whiteRatingChange} {match.whiteRatingChange > 0 ? `+${match.whiteRatingChange}` : match.whiteRatingChange})
          - {match.result} -
          {match.black} ({match.blackInitialRating + match.blackRatingChange} {match.blackRatingChange > 0 ? `+${match.blackRatingChange}` : match.blackRatingChange}):
        </li>);
      } else {
        matchJsx = (<li key={match.id}>
          {match.white} ({match.whiteInitialRating})
          vs {match.black} ({match.blackInitialRating}): </li>);
      }
      return matchJsx;
    });

    return (
      <ul>
        {matchList}
      </ul>
    );
  }
}

export default MatchList;
