<template>
  <div>
    <div class="flex flex-col">
      <div class="flex border-b border-gray-700 py-2">
        <div class="w-1/4"></div>
        <div class="w-1/4 text-center">
          Sets
        </div>
        <div class="w-1/4 text-center">
          Legs
        </div>
        <div class="w-1/4 text-center">
          Score
        </div>
      </div>

      <div
        v-for="(p, index) in players"
        :key="index"
        class="flex border-b border-gray-700 py-2"
        :class="{ 'text-gray-500 ': currentPlayer !== index }"
      >
        <div class="w-1/4">
          {{ p.name }}
          <span v-show="currentPlayer == index" class="text-center w-12">
            &bull;
          </span>
        </div>
        <div class="w-1/4 text-center">
          {{ p.sets }}
        </div>
        <div class="w-1/4 text-center">
          {{ p.legs }}
        </div>
        <div class="w-1/4 text-center">
          {{ p.remaining }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentPlayer", "players"])
  }
};
</script>
