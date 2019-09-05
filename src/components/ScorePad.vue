<template>
  <div class="flex flex-col">
    <div>
      <button
        v-if="player.hasHadTurn && !player.hasWonLeg"
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
        @click="endTurn"
        class="w-full py-4 mx-auto rounded text-blue-100 border bg-blue-700 mt-4 text-center uppercase tracking-wider"
      >
        Game Shot
      </button>
    </div>

    <div class="flex flex-wrap -mx-2 mt-2">
      <div
        v-for="(c, index) in categories"
        :key="index"
        class="w-1/3"
      >
        <div
          v-if="c.hasOwnProperty('value')"
          class="w-full px-2"
        >
          <button
            @click="recordThrow({ type: c.name, value: c.value })"
            class="w-full py-4 rounded text-gray-100 bg-gray-700 mt-4 text-center uppercase text-sm"
            :class="index % 2 === 0 ? 'bg-red-500' : 'bg-green-500'"
          >
            {{ c.name }}
          </button>
        </div>

        <div
          v-else
          class="w-full px-2"
        >
          <button
            @click="selectSegment(c)"
            class="w-full py-4 rounded text-gray-100 mt-4 text-center uppercase text-sm"
            :class="index % 2 === 0 ? 'bg-red-500' : 'bg-green-500'"
          >
            {{ c.name }}
          </button>
        </div>
      </div>
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
