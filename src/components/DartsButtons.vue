<template>
  <ul class="list-reset flex justify-between items-center -mx-2">
    <li
      v-for="n in [1, 2, 3]"
      :key="n"
      @click="setCurrentDart(n)"
      class="w-full border border-gray-700 text-center text-sm px-3 py-1 rounded text-gray-500 mx-2"
      :class="{
        'bg-blue-700 border-blue-700 text-blue-100': currentDart == n
      }"
    >
      <div v-if="showSingles && currentDart === n">
        Cancel
      </div>
      <div v-else>
        <span v-if="typeof player.darts[n - 1] === 'number'">
          {{ player.darts[n - 1] }}
        </span>

        <span v-else> Dart {{ n }} </span>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentDart", "showSingles"]),
    ...mapGetters(["player"])
  },

  methods: {
    ...mapMutations(["setCurrentDart"])
  }
};
</script>
