<template>
  <div class="flex flex-col">
    <div v-if="showSingles" class="flex flex-wrap mt-4">
      <div class="w-1/4 p-2" v-for="n in segments" :key="n">
        <button
          @click="recordThrow(n)"
          class="text-center w-full bg-gray-700 rounded py-4 text-gray-100"
        >
          {{ n }}
        </button>
      </div>
    </div>

    <div v-else class="flex flex-wrap -mx-1">
      <div v-for="(c, index) in categories" :key="index" class="w-1/3">
        <div v-if="!c.hasOwnProperty('score')" class="w-full px-1">
          <button
            @click="selectSegment(c.multiplyer)"
            class="w-full py-4 rounded text-gray-100 bg-gray-700 mt-4 text-center uppercase tracking-wider"
          >
            {{ c.name }}
          </button>
        </div>

        <div v-else class="w-full px-1">
          <button
            @click="recordThrow(c.score)"
            class="w-full py-4 rounded text-gray-100 bg-gray-700 mt-4 text-center uppercase tracking-wider"
          >
            {{ c.name }}
          </button>
        </div>
      </div>
    </div>

    <div>
      <button
        v-if="player.hasHadTurn && !player.hasBust"
        @click="endTurn"
        class="w-full py-4 mx-auto rounded text-gray-800 border bg-gray-100 mt-4 text-center uppercase tracking-wider"
      >
        End Turn
      </button>

      <button
        v-if="player.hasBust"
        @click="endTurn"
        class="w-full py-4 mx-auto rounded text-red-100 border bg-red-700 mt-4 text-center uppercase tracking-wider"
      >
        Bust
      </button>

      <button
        v-if="player.hasWonLeg"
        @click="legWon"
        class="w-full py-4 mx-auto rounded text-green-100 border bg-green-700 mt-4 text-center uppercase tracking-wider"
      >
        Game Shot
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["categories", "segments", "showSingles"]),
    ...mapGetters(["player"])
  },

  methods: {
    ...mapActions(["endTurn", "legWon", "recordThrow", "selectSegment"])
  }
};
</script>
