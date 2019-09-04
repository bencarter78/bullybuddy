<template>
  <div>
    <div class="flex justify-between">
      <div
        class="w-1/3 text-center border-b border-t py-1"
        :class="
          isOnOche(0)
            ? 'text-gray-100 border-gray-100'
            : 'text-gray-500 border-gray-500'
        "
      >
        <span v-if="isOnOche(0)">
          &bull;
        </span>
        {{ players[0].name }}
        <span v-if="isOnOche(0)">
          &bull;
        </span>
      </div>

      <div class="w-1/3 text-center"></div>

      <div
        class="w-1/3 text-center border-b border-t py-1"
        :class="
          isOnOche(1)
            ? 'text-gray-100 border-gray-100'
            : 'text-gray-500 border-gray-500'
        "
      >
        <span v-if="isOnOche(1)">
          &bull;
        </span>
        {{ players[1].name }}
        <span v-if="isOnOche(1)">
          &bull;
        </span>
      </div>
    </div>

    <div class="flex justify-between mt-2">
      <div class="w-1/3 text-center">
        {{ players[0].remaining }}
      </div>

      <div class="w-1/3 text-center text-gray-500">
        Score
      </div>

      <div class="w-1/3 text-center">
        {{ players[1].remaining }}
      </div>
    </div>

    <div class="flex justify-between mt-2">
      <div class="w-1/3 text-center">
        {{ players[0].legs }}
      </div>

      <div class="w-1/3 text-center text-gray-500">
        Legs
      </div>

      <div class="w-1/3 text-center">
        {{ players[1].legs }}
      </div>
    </div>

    <div class="flex justify-between mt-2">
      <div class="w-1/3 text-center">
        {{ players[0].sets }}
      </div>

      <div class="w-1/3 text-center text-gray-500">
        Sets
      </div>

      <div class="w-1/3 text-center">
        {{ players[1].sets }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentPlayer", "players"])
  },

  methods: {
    isOnOche(player) {
      return this.currentPlayer === player;
    }
  }
};
</script>
