<template>
  <ul class="list-reset flex justify-between items-center -mx-2">
    <li
      v-for="n in [1, 2, 3]"
      :key="n"
      @click="setCurrentDart(n)"
      class="w-full border border-gray-700 text-center px-3 py-1 rounded text-gray-100 mx-2"
      :class="{
        'bg-gray-700 border-gray-700': currentDart == n
      }"
    >
      <span v-if="typeof player.darts[n - 1] === 'number'">
        {{ player.darts[n - 1] }}
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
