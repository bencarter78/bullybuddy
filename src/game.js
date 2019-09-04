class Game {
  constructor(players, type) {
    this.players = players;
    this.type = type;
    this.playerWithArrowsInSet;
    this.playerWithArrowsInLeg;

    this.setPlayerWithArrowsInSet(0);
    this.setPlayerWithArrowsInLeg(0);
    this.resetLeg();
  }

  setPlayerWithArrowsInSet(player) {
    this.playerWithArrowsInSet = player;
  }

  setPlayerWithArrowsInLeg(player) {
    this.playerWithArrowsInLeg = player;
  }

  resetLeg() {
    this.players.forEach(p => p.setRemainingInLeg(this.type));

    if (this.isSetWon()) {
      this.players.forEach(p => p.resetLegs());
    }
  }

  isLegWon() {
    return this.players.filter(p => p.remainingInLeg === 0).length;
  }

  isSetWon() {
    return this.players.filter(p => p.legs === 3).length;
  }
}

export default Game;
