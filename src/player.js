import uuid from "uuid/v4";

class Player {
  constructor(name) {
    this.uuid = uuid();
    this.name = name;
    this.sets = 0;
    this.legs = 0;
    this.remainingInLeg = 0;
    this.darts = [null, null, null];
    this.matchRounds = [];
    this.legRounds = [];
    this.allRounds = [];
  }

  get roundScore() {
    return this.darts
      .filter(x => x)
      .reduce((carry, item) => carry + item.score, 0);
  }

  get dartsThrownInLeg() {
    return [].concat(...this.legRounds, this.darts.filter(x => x)).length;
  }

  get remaining() {
    return this.remainingInLeg - this.roundScore;
  }

  get hasHadTurn() {
    return this.darts.filter(x => x).length === 3;
  }

  get hasBust() {
    if (this.hasWonLeg) {
      return false;
    }

    return this.remaining < 2;
  }

  get hasWonLeg() {
    return this.remaining === 0;
  }

  // get average() {
  //   if (this.allRounds.length === 0) {
  //     return 0;
  //   }

  //   let rounds = this.allRounds.map(round => {
  //     return round
  //       .filter(x => x)
  //       .reduce((carry, item) => carry + item.score, 0);
  //   });

  //   return (
  //     (rounds.reduce((carry, item) => carry + item, 0) + this.roundScore) /
  //     rounds.length
  //   );
  // }

  setRemainingInLeg(points) {
    this.remainingInLeg = points;
  }

  addDart(roundDart, dart) {
    this.darts.splice(roundDart, 1, dart);
  }

  logRound() {
    // So we don't remove the score from what's remaining,
    // if the player has bust we'll reset the darts
    if (this.hasBust) {
      this.resetRound();
    }

    this.legRounds.push(this.darts);
    this.allRounds.push(this.darts);
    this.setRemainingInLeg(this.remainingInLeg - this.roundScore);
    this.resetRound();
  }

  resetLegsWon() {
    this.legs = 0;
    this.resetRound();
  }

  resetRound() {
    this.darts = [null, null, null];
  }

  addLeg() {
    this.legs += 1;
  }

  logMatchRounds() {
    this.matchRounds.push(this.legRounds);
    this.legRounds = [];
  }

  addSet() {
    this.sets += 1;
  }
}

export default Player;
