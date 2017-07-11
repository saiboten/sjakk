import firebase from '../firebase/FirebaseInit';

const debug = require('debug')('ScoreCalculator');

const glicko2 = require('glicko2');

const settings = {
  // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
  //       be tested to decide which value results in greatest predictive accuracy."
  tau: 0.5,
  // rating : default rating
  rating: 1200,
  // rd : Default rating deviation
  //     small number = good confidence on the rating accuracy
  rd: 10,
  // vol : Default volatility (expected fluctation on the player rating)
  vol: 0.06,
};

const ranking = new glicko2.Glicko2(settings);

class ScoreCalculator {
  static calculateScore(white, black, match, winner) {
    debug('Calculating score based on the following input: ', white, black, match, winner);

    const updatedObject = Object.assign({}, match);
    const matches = [];

    const whitePlayerGlick = ranking.makePlayer(white.ranking, 100, 0.06);
    const blackPlayerGlick = ranking.makePlayer(black.ranking, 100, 0.06);

    updatedObject.completed = true;

    updatedObject.whiteInitialRating = white.rating;
    updatedObject.blackInitialRating = black.rating;

    if (winner === 'white') {
      updatedObject.whiteWon = true;
      matches.push([whitePlayerGlick, blackPlayerGlick, 1]);
    } else if (winner === 'black') {
      updatedObject.blackWon = true;
      matches.push([whitePlayerGlick, blackPlayerGlick, 0]);
    } else {
      updatedObject.remis = true;
      matches.push([whitePlayerGlick, blackPlayerGlick, 0.5]);
    }

    ranking.updateRatings(matches);

    updatedObject.blackRatingChange = blackPlayerGlick.getRating() - black.rating;
    updatedObject.whiteRatingChange = whitePlayerGlick.getRating() - white.rating;

    debug('Updated object: ', updatedObject);

    firebase.database().ref(`matches/${match.id}`).set(updatedObject);
    firebase.database().ref(`users/${white.id}`).update({
      rating: whitePlayerGlick.getRating(),
    });

    firebase.database().ref(`users/${black.id}`).update({
      rating: blackPlayerGlick.getRating(),
    });
  }
}

export default ScoreCalculator;
