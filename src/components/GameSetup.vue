<template>
  <div>
    <div class="flex items-center h-screen">
      <div class="flex flex-col w-full">
        <div class="w-2/3 mx-auto text-gray-100 text-6xl text-center">
          <h1 class="font-logo">
            BullyBuddy
          </h1>
        </div>

        <div class="w-2/3 mx-auto">
          <div v-if="players.length === 0" class="flex flex-col">
            <button
              @click="setPlayers(1)"
              class="bg-red-700 py-4 text-red-100 text-center rounded mt-16"
            >
              1 Player
            </button>

            <button
              @click="setPlayers(2)"
              class="bg-red-700 py-4 text-red-100 text-center rounded mt-8"
            >
              2 Players
            </button>
          </div>

          <div v-if="players.length > 0 && !game.type" class="flex flex-col">
            <button
              @click="setGame(501)"
              class="bg-red-700 py-4 text-red-100 text-center rounded mt-16"
            >
              501
            </button>

            <button
              @click="setGame(50)"
              class="bg-red-700 py-4 text-red-100 text-center rounded mt-8"
            >
              301
            </button>

            <div class="mt-4 text-gray-100 text-center">
              <a @click="reset">Back</a>
            </div>
          </div>

          <div v-if="canStartGame" class="flex flex-col">
            <router-link
              :to="{ name: 'game' }"
              class="bg-green-700 py-4 text-green-100 text-center rounded mt-16"
            >
              Play
            </router-link>

            <div class="mt-4 text-gray-100 text-center">
              <a @click="reset">Reset</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["players", "game"]),
    ...mapGetters(["canStartGame"])
  },

  mounted() {
    this.reset();
    this.setPlayers();
  },

  methods: {
    ...mapMutations([
      "incrementDart",
      "decrementDart",
      "setPlayers",
      "setGame"
    ]),
    ...mapActions(["reset"])
  }
};
</script>
