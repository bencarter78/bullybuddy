class Player {
  constructor(name) {
    this.name = name;
    this.sets = 0;
    this.legs = 0;
    this.remainingInLeg = 0;
    this.darts = [null, null, null];
    this.matchRounds = [];
    this.legRounds = [];
  }

  setRemainingInLeg(points) {
    this.remainingInLeg = points;
  }

  get throwScore() {
    return this.darts
      .filter(Number)
      .reduce((carry, item) => carry + parseInt(item), 0);
  }

  get dartsThrown() {
    return [].concat(
      ...this.matchRounds,
      this.darts.filter(x => typeof x === "number")
    ).length;
  }

  get remaining() {
    return this.remainingInLeg - this.throwScore;
  }

  scoreDart(dart, score) {
    this.darts.splice(dart, 1, score);
  }

  logLegRounds() {
    // So we don't remove the score from what's remaining,
    // if the player has bust we'll reset the darts
    if (this.hasBust) {
      this.resetDarts();
    }

    this.legRounds.push(this.darts);
    this.setRemainingInLeg(this.remainingInLeg - this.throwScore);
    this.resetDarts();
  }

  resetDarts() {
    this.darts = [null, null, null];
  }

  resetLegs() {
    this.legs = 0;
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

  get hasHadTurn() {
    return this.darts.filter(x => typeof x === "number").length === 3;
  }

  addLeg() {
    this.legs += 1;

    if (this.legs === 3) {
      this.sets += 1;
    }
  }
}

export default Player;
