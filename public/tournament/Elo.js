class Elo {
  static getRatingDelta(myRating, opponentRating, myGameResult) {
    if ([0, 0.5, 1].indexOf(myGameResult) === -1) {
      return null;
    }

    const myChanceToWin = 1 / (1 + Math.pow(10, ((opponentRating - myRating) / 400)));

    return Math.round(32 * (myGameResult - myChanceToWin));
  }

  getNewRating(myRating, opponentRating, myGameResult) {
    return myRating + this.getRatingDelta(myRating, opponentRating, myGameResult);
  }
}

export default Elo;
