import Vue from "vue";
import Vuex from "vuex";
import Player from "./player";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    game: "",
    segments: [...Array(21).keys()].reverse().slice(0, 20),
    darts: [],
    currentDart: 1,
    currentPlayer: 0,
    showSingles: false,
    log: [],
    categories: [
      { name: "Single", multiplyer: 1 },
      { name: "Double", multiplyer: 2 },
      { name: "Treble", multiplyer: 3 },
      { name: "Outer Bull", score: 25, multiplyer: 1 },
      { name: "Bull", score: 50, multiplyer: 1 },
      { name: "Miss", score: 0, multiplyer: 1 }
    ],
    multiplyer: 1
  },

  getters: {
    throwScore(state) {
      return state.darts.reduce((carry, item) => carry + parseInt(item), 0);
    },

    canStartGame(state) {
      return state.players.length > 0 && state.game;
    },

    displayDarts(state) {
      return state.darts.join("+");
    }
  },

  mutations: {
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

    addThrow(state, score) {
      if (state.darts[state.currentDart - 1]) {
        return state.darts.splice(
          state.currentDart - 1,
          1,
          score * state.multiplyer
        );
      }

      if (state.darts.length < 3) {
        state.darts.push(score * state.multiplyer);
      }
    },

    updatePlayerScore(state, score) {
      state.players[state.currentPlayer].score(score);
    },

    setPlayers(state, count) {
      [...Array(count).keys()].forEach(p => {
        state.players.push(new Player(`Player ${p + 1}`));
      });
    },

    setGame(state, game) {
      state.players.forEach(p => p.setRemainingInLeg(game));
      state.game = game;
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
      state.players[state.currentPlayer].logDarts(state.darts);
    },

    resetDarts(state) {
      state.darts = [];
      state.currentDart = 1;
    },

    switchPlayer(state) {
      if (state.players.length == 2) {
        state.currentPlayer = state.currentPlayer == 0 ? 1 : 0;
      }
    }
  },

  actions: {
    recordThrow({ commit }, score) {
      commit("updatePlayerScore", score);
      commit("addThrow", score);
      commit("incrementDart");
      commit("clearSingles");
      commit("setMultiplyer", 1);
    },

    selectSegment({ commit }, multiplyer) {
      commit("toggleSingles");
      commit("setMultiplyer", multiplyer);
    },

    reset({ commit }) {
      commit("setPlayers", 0);
      commit("setGame", null);
    },

    endTurn({ commit }) {
      commit("logDarts");
      commit("switchPlayer");
      commit("resetDarts");
    }
  }
});
