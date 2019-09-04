<template>
  <div>
    <div class="flex justify-between mt-4">
      <div
        v-for="(p, index) in players"
        :key="index"
        class="w-1/4 text-center"
        :class="{ 'text-gray-500 ': currentPlayer !== index }"
      >
        <div class="uppercase text-xs border-t border-b py-1 mb-1">
          {{ p.name }}
        </div>
        <div class="text-center font-bold">
          <span v-if="p.hasBust" class="uppercase">
            Bust
          </span>
          <span v-else>
            {{ p.remaining }}
          </span>
          <div v-if="p.dartsThrown > 0" class="font-normal text-xs">
            ({{ p.dartsThrown }})
          </div>
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
