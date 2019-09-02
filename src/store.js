import Vue from "vue";
import Vuex from "vuex";
import Player from "./player";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    game: "",
    segments: [...Array(21).keys()].reverse().slice(0, 20),
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
    canStartGame(state) {
      return state.players.length && state.game;
    },

    player(state) {
      return state.players[state.currentPlayer];
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

    addThrownDart(state, score) {
      return state.players[state.currentPlayer].scoreDart(
        state.currentDart - 1,
        score * state.multiplyer
      );
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
      state.players[state.currentPlayer].logDarts();
    },

    resetDarts(state) {
      state.currentDart = 1;
    },

    switchPlayer(state) {
      // We only want to switch the players if there are 2 players
      if (state.players.length == 2) {
        state.currentPlayer = state.currentPlayer == 0 ? 1 : 0;
      }
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
