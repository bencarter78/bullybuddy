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
              class="bg-red-500 py-4 text-red-100 text-center rounded mt-16"
            >
              1 Player
            </button>

            <button
              @click="setPlayers(2)"
              class="bg-red-500 py-4 text-red-100 text-center rounded mt-4"
            >
              2 Players
            </button>
          </div>

          <div v-if="players.length > 0 && !game" class="flex flex-col">
            <button
              v-for="g in [501, 301, 201]"
              :key="g"
              @click="setGame(g)"
              class="bg-red-500 py-4 text-red-100 text-center rounded mt-4"
            >
              {{ g }}
            </button>
          </div>

          <div v-if="canStartGame" class="flex flex-col">
            <router-link
              :to="{ name: 'game' }"
              class="bg-green-500 py-4 text-green-100 text-center rounded mt-16"
            >
              Play
            </router-link>
          </div>

          <div v-if="players.length" class="mt-4 text-gray-100 text-center">
            <a @click="reset">Reset</a>
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
