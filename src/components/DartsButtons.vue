<template>
  <ul class="list-reset flex justify-between items-center -mx-1">
    <li
      v-for="n in [1, 2, 3]"
      :key="n"
      @click="setCurrentDart(n)"
      class="w-full border border-green-700 text-center px-3 py-1 rounded text-gray-500 mx-1"
      :class="{
        'text-green-100 bg-green-700 border-green-700': currentDart == n
      }"
    >
      <span v-if="player.darts.length >= n">
        D{{ n }}: {{ player.darts[n - 1] }}
      </span>

      <span v-else> Dart {{ n }} </span>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentDart"]),
    ...mapGetters(["player"])
  },

  methods: {
    ...mapMutations(["setCurrentDart"])
  }
};
</script>
