<template>
  <div>
    <div class="flex flex-wrap mt-4 -mx-2">
      <div class="w-1/4 p-2" v-for="n in segments" :key="n">
        <button
          @click="recordThrow({ type: singlesType, value: n })"
          class="text-center w-full bg-gray-700 rounded py-4 text-gray-100"
        >
          {{ n }}
        </button>
      </div>
    </div>
    <div class="text-center">
      <button @click="clearSingles">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["segments", "singlesType"])
  },

  methods: {
    ...mapMutations(["clearSingles"]),
    ...mapActions(["recordThrow"])
  }
};
</script>
