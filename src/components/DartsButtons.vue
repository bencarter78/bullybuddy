<template>
  <ul class="list-reset flex justify-between items-center -mx-2">
    <li
      v-for="n in [0, 1, 2]"
      :key="n"
      @click="setCurrentDart(n)"
      class="w-full border border-gray-700 text-center text-sm px-3 py-1 rounded text-gray-500 mx-2"
      :class="{
        'bg-blue-700 border-blue-700 text-blue-100': currentDart == n
      }"
    >
      <span v-if="player.darts[n]">
        {{ player.darts[n].score }}
      </span>

      <span v-else> Dart {{ n + 1 }} </span>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["currentDart", "player"])
  },

  methods: {
    ...mapMutations(["setCurrentDart"])
  }
};
</script>
