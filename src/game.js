import checkouts from "./checkouts";

class Game {
  constructor(players, type) {
    this.players = players;
    this.type = type;
    this.currentDart = 0;
    this.currentPlayer = 0;
    this.inProgress = false;

    this.playerWithArrowsInSet;
    this.playerWithArrowsInLeg;
    this._setPlayerWithArrowsInSet(0);
    this._setPlayerWithArrowsInLeg(0);
    this._resetLegStartingScore();
  }

  get canStart() {
    return this.players.length > 0;
  }

  get isPractice() {
    return this.players.length === 1;
  }

  get onOche() {
    return this.player;
  }

  get player() {
    return this.players[this.currentPlayer];
  }

  get checkout() {
    return this.inProgress
      ? checkouts[this.players[this.currentPlayer].remaining]
      : false;
  }

  get legHasWinner() {
    return this.player.remaining === 0;
  }

  get setHasWinner() {
    return this.player.legs === 3;
  }

  get isSetWon() {
    return this.players.filter(p => p.legs === 3).length;
  }

  addScore(dart) {
    this.player.addDart(this.currentDart, dart);

    // if (this.player.hasBust()) {
    //   this.player.resetRound()
    //   this._switchPlayers()
    // }

    this._incrementCurrentDart();
  }

  endTurn() {
    if (this.legHasWinner) {
      this.player.addLeg();
    }

    if (this.setHasWinner) {
      this.player.addSet();
    }

    this._switchPlayers();
  }

  _switchPlayers() {
    this._setCurrentDart();
    this.player.logRound();

    if (this.players.length === 1) {
      return;
    }

    if (this.setHasWinner) {
      this.currentPlayer = this.playerWithArrowsInSet ? 0 : 1;
      this.players.forEach(p => p.resetLegsWon());
      this._resetLegStartingScore();
      return this._setPlayerWithArrowsInSet(this.currentPlayer);
    }

    if (this.legHasWinner) {
      this.currentPlayer = this.playerWithArrowsInLeg ? 0 : 1;
      this._resetLegStartingScore();
      this.players.forEach(p => p.logMatchRounds());
      return this._setPlayerWithArrowsInLeg(this.currentPlayer);
    }

    this.currentPlayer = this.currentPlayer ? 0 : 1;
  }

  _setCurrentDart(n = 0) {
    this.currentDart = n;
  }

  start() {
    this.inProgress = true;
  }

  quit() {
    this.inProgress = false;
  }

  _incrementCurrentDart() {
    if (this.currentDart < 2) {
      this.currentDart += 1;
    }
  }

  _setPlayerWithArrowsInSet(player) {
    this.playerWithArrowsInSet = player;
  }

  _setPlayerWithArrowsInLeg(player) {
    this.playerWithArrowsInLeg = player;
  }

  _resetLegStartingScore() {
    this.players.forEach(p => p.setRemainingInLeg(this.type));
  }
}

export default Game;
