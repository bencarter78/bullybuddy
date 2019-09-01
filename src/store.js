import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: 0,
    game: "",
    segments: [...Array(21).keys()].reverse().slice(0, 20),
    darts: [],
    currentDart: 1,
    showSingles: false,
    total: 0,
    log: [],
    categories: [
      { name: "Single" },
      { name: "Double" },
      { name: "Treble" },
      { name: "Outer Bull", score: 25 },
      { name: "Bull", score: 50 },
      { name: "Miss", score: 0 }
    ],
    multiplyer: 1
  },

  getters: {
    throwScore(state) {
      return state.darts.reduce((carry, item) => carry + parseInt(item), 0);
    },

    canStartGame(state) {
      return state.players > 0 && state.game;
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

    setPlayers(state, count) {
      state.players = count;
    },

    setGame(state, game) {
      state.game = game;
    },

    toggleSingles(state) {
      state.showSingles = !state.showSingles;
    },

    setMultiplyer(state, value) {
      state.multiplyer = value;
    }
  },

  actions: {
    recordThrow({ commit }, score) {
      commit("addThrow", score);
      commit("incrementDart");
      commit("toggleSingles");
      commit("setMultiplyer", 1);
    },

    reset({ commit }) {
      commit("setPlayers", 0);
      commit("setGame", null);
    }
  }
});
