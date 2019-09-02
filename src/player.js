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

  throwScore() {
    return this.darts.reduce(
      (carry, item) => (item === null ? 0 : carry + parseInt(item)),
      0
    );
  }

  get inThrowScore() {
    return this.darts.reduce(
      (carry, item) => (item === null ? 0 : carry + parseInt(item)),
      0
    );
  }

  scoreDart(dart, score) {
    this.darts.splice(dart, 1, score);
  }

  logDarts() {
    this.logs.push(this.darts);
    this.setRemainingInLeg(this.remainingInLeg - this.throwScore());
    this.darts = [null, null, null];
  }

  hasBust() {
    if (this.hasCheckedOut()) {
      return false;
    }

    return this.remainingInLeg < 2;
  }

  hasCheckedOut() {
    return this.remainingInLeg === 0;
  }

  hasHadTurn() {
    return this.darts.filter(Number).length === 3;
  }
}

export default Player;
