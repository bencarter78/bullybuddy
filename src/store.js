import Vue from "vue";
import Vuex from "vuex";
import Player from "./player";
import checkouts from "./checkouts";
import Game from "./game";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    game: "",
    segments: [...Array(21).keys()].reverse().slice(0, 20),
    currentDart: 1,
    currentPlayer: 0,
    showSingles: false,
    inProgress: false,
    log: [],
    categories: [
      { name: "Single", multiplyer: 1 },
      { name: "Double", multiplyer: 2 },
      { name: "Treble", multiplyer: 3 },
      { name: "25", score: 25, multiplyer: 1 },
      { name: "50", score: 50, multiplyer: 1 },
      { name: "-", score: 0, multiplyer: 1 }
    ],
    multiplyer: 1
  },

  getters: {
    canStartGame(state) {
      return state.players.length && state.game;
    },

    player(state) {
      return state.players[state.currentPlayer];
    },

    isPractice(state) {
      return state.players.length === 1;
    },

    canCheckout(state) {
      return state.inProgress
        ? checkouts[state.players[state.currentPlayer].remaining]
        : false;
    }
  },

  mutations: {
    startMatch(state) {
      state.inProgress = true;
    },

    quitMatch(state) {
      state.inProgress = false;
    },

    incrementDart(state) {
      if (state.currentDart < 3) {
        state.currentDart += 1;
      }
    },

    decrementDart(state) {
      if (state.currentDart > 0) {
        state.currentDart -= 1;
      }
    },

    setCurrentDart(state, dart) {
      state.currentDart = dart;
      state.showSingles = false;
    },

    addThrownDart(state, score) {
      return state.players[state.currentPlayer].scoreDart(
        state.currentDart - 1,
        score * state.multiplyer
      );
    },

    setPlayers(state, count) {
      if (!count) {
        state.players = [];
        return;
      }

      [...Array(count).keys()].forEach(p =>
        state.players.push(new Player(`Player ${p + 1}`))
      );
    },

    setGame(state, type) {
      state.game = new Game(state.players, type);
    },

    clearGame(state) {
      state.game = "";
    },

    toggleSingles(state) {
      state.showSingles = !state.showSingles;
    },

    clearSingles(state) {
      state.showSingles = false;
    },

    setMultiplyer(state, value) {
      state.multiplyer = value;
    },

    logDarts(state) {
      state.players[state.currentPlayer].logLegRounds();
    },

    resetDarts(state) {
      state.currentDart = 1;
    },

    resetLeg(state) {
      state.game.resetLeg();
    },

    switchPlayer(state) {
      if (state.players.length === 1) {
        return;
      }

      if (state.game.isSetWon()) {
        state.currentPlayer = state.game.playerWithArrowsInSet ? 0 : 1;
        return state.game.setPlayerWithArrowsInSet(state.currentPlayer);
      }

      if (state.game.isLegWon()) {
        state.currentPlayer = state.game.playerWithArrowsInLeg ? 0 : 1;
        return state.game.setPlayerWithArrowsInLeg(state.currentPlayer);
      }

      state.currentPlayer = state.currentPlayer ? 0 : 1;
    },

    addLegToPlayer(state) {
      state.players[state.currentPlayer].addLeg();
    }
  },

  actions: {
    recordThrow({ commit }, score) {
      commit("addThrownDart", score);
      commit("incrementDart");
      commit("clearSingles");
      commit("setMultiplyer", 1);
    },

    selectSegment({ commit }, multiplyer) {
      commit("toggleSingles");
      commit("setMultiplyer", multiplyer);
    },

    reset({ commit }) {
      commit("quitMatch");
      commit("setPlayers");
      commit("clearGame");
    },

    endTurn({ commit }) {
      commit("logDarts");
      commit("switchPlayer");
      commit("resetDarts");
    },

    legWon({ dispatch, commit }) {
      commit("addLegToPlayer");
      dispatch("endTurn");
      commit("resetLeg");
    }
  }
});
