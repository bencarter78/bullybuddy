<template>
  <div>
    <div class="flex justify-between">
      <div
        class="w-1/3 text-center border-b border-t py-1"
        :class="
          isOnOche(players[0])
            ? 'text-gray-100 border-gray-100'
            : 'text-gray-500 border-gray-500'
        "
      >
        {{ players[0].name }}
        <span v-if="playerHasDarts(0)">
          &bull;
        </span>
      </div>

      <div class="w-1/3 text-center"></div>

      <div
        class="w-1/3 text-center border-b border-t py-1"
        :class="
          isOnOche(players[1])
            ? 'text-gray-100 border-gray-100'
            : 'text-gray-500 border-gray-500'
        "
      >
        {{ players[1].name }}
        <span v-if="playerHasDarts(1)">
          &bull;
        </span>
      </div>
    </div>

    <div class="flex justify-between mt-2">
      <div class="w-1/3 text-center text-gray-500">
        <span v-if="players[0].hasBust" class="uppercase">
          Bust
        </span>
        <span v-else>
          {{ players[0].remaining }}
          ({{ players[0].dartsThrownInLeg }})
        </span>
      </div>

      <div class="w-1/3 text-center text-gray-500 text-gray-500">
        Score
      </div>

      <div class="w-1/3 text-center text-gray-500">
        <span v-if="players[1].hasBust" class="uppercase">
          Bust
        </span>
        <span v-else>
          {{ players[1].remaining }}
          ({{ players[1].dartsThrownInLeg }})
        </span>
      </div>
    </div>

    <div class="flex justify-between mt-2">
      <div class="w-1/3 text-center text-gray-500">
        {{ players[0].legs }}
      </div>

      <div class="w-1/3 text-center text-gray-500 text-gray-500">
        Legs
      </div>

      <div class="w-1/3 text-center text-gray-500">
        {{ players[1].legs }}
      </div>
    </div>

    <div class="flex justify-between mt-2">
      <div class="w-1/3 text-center text-gray-500">
        {{ players[0].sets }}
      </div>

      <div class="w-1/3 text-center text-gray-500 text-gray-500">
        Sets
      </div>

      <div class="w-1/3 text-center text-gray-500">
        {{ players[1].sets }}
      </div>
    </div>

    <!-- <div class="flex justify-between mt-2">
      <div class="w-1/3 text-center text-gray-500">
        {{ players[0].average }}
      </div>

      <div class="w-1/3 text-center text-gray-500 text-gray-500">
        Avg
      </div>

      <div class="w-1/3 text-center text-gray-500">
        {{ players[1].average }}
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["players"]),
    ...mapGetters(["player", "playerWithDarts"])
  },

  methods: {
    isOnOche(player) {
      return this.player.uuid === player.uuid;
    },

    playerHasDarts(player) {
      return this.playerWithDarts === player;
    }
  }
};
</script>
