import Vue from "vue";
import Vuex from "vuex";
import Player from "./player";
import Game from "./game";
import { Single, OuterBull, Bull, Miss, Double, Treble } from "./darts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    game: "",
    segments: [...Array(21).keys()].reverse().slice(0, 20),
    singlesType: false,
    categories: [
      { name: "Single" },
      { name: "Double" },
      { name: "Treble" },
      { name: "25", value: 25 },
      { name: "50", value: 50 },
      { name: "-", value: 0 }
    ]
  },

  getters: {
    canStartGame(state) {
      return state.game ? state.game.canStart : false;
    },

    player(state) {
      return state.game.onOche;
    },

    isPractice(state) {
      return state.game.isPractice;
    },

    checkout(state) {
      return state.game.checkout;
    },

    currentDart(state) {
      return state.game.currentDart;
    },

    playerWithDarts(state) {
      return state.game.playerWithArrowsInSet;
    }
  },

  mutations: {
    startMatch(state) {
      if (state.game) {
        state.game.start();
      }
    },

    quitMatch(state) {
      if (state.game) {
        state.game.quit();
      }
    },

    addThrownDart(state, { type, value }) {
      let dart;

      switch (type) {
        case "Miss":
          dart = new Miss(value);
          break;
        case "Double":
          dart = new Double(value);
          break;
        case "Treble":
          dart = new Treble(value);
          break;
        case "25":
          dart = new OuterBull(value);
          break;
        case "50":
          dart = new Bull(value);
          break;
        default:
          dart = new Single(value);
      }

      state.game.addScore(dart);
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

    setSinglesType(state, type) {
      state.singlesType = type;
    },

    clearSinglesType(state) {
      state.singlesType = "";
    },

    endTurn(state) {
      state.game.endTurn();
    }
  },

  actions: {
    recordThrow({ commit }, { type, value }) {
      commit("addThrownDart", { type, value });
      commit("clearSinglesType");
    },

    endTurn({ commit }) {
      commit("endTurn");
    },

    selectSegment({ commit }, type) {
      commit("setSinglesType", type.name);
    },

    reset({ commit }) {
      commit("quitMatch");
      commit("setPlayers");
      commit("clearGame");
    }
  }
});
