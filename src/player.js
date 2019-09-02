class Player {
  constructor(name) {
    this.name = name;
    this.sets = 0;
    this.legs = 0;
    this.remainingInLeg = 0;
    this.darts = [null, null, null];
    this.logs = [];
  }

  setRemainingInLeg(points) {
    this.remainingInLeg = points;
  }

  get throwScore() {
    return this.darts
      .filter(Number)
      .reduce((carry, item) => carry + parseInt(item), 0);
  }

  get remaining() {
    return this.remainingInLeg - this.throwScore;
  }

  scoreDart(dart, score) {
    this.darts.splice(dart, 1, score);
  }

  logDarts() {
    if (this.hasBust) {
      this.resetDarts();
    }

    this.logs.push(this.darts);
    this.setRemainingInLeg(this.remainingInLeg - this.throwScore);
    this.resetDarts();
  }

  resetDarts() {
    this.darts = [null, null, null];
  }

  get hasBust() {
    if (this.hasCheckedOut) {
      return false;
    }

    return this.remaining < 2;
  }

  get hasCheckedOut() {
    return this.remaining === 0;
  }

  get hasHadTurn() {
    return this.darts.filter(Number).length === 3;
  }
}

export default Player;
