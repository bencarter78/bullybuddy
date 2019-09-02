class Player {
  constructor(name) {
    this.name = name;
    this.sets = 0;
    this.legs = 0;
    this.remainingInLeg = 0;
    this.logs = [];
  }

  setRemainingInLeg(points) {
    this.remainingInLeg = points;
  }

  score(points) {
    this.remainingInLeg -= points;
  }

  logDarts(darts) {
    this.logs.push(darts);
  }
}

export default Player;
