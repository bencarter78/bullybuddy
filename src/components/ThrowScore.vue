<template>
  <div>
    <div class="flex justify-center items-baseline">
      <div class="text-right text-6xl leading-none font-score font-bold mr-2">
        <span v-if="player.hasBust" class="uppercase">
          Bust
        </span>
        <span v-else>
          {{ player.remaining }}
        </span>
      </div>
    </div>

    <div v-show="canCheckout" class="flex justify-center">
      <div
        v-for="(d, index) in canCheckout"
        :key="index"
        class="mx-2 text-4xl text-gray-500"
      >
        {{ d }}
      </div>
    </div>
    <DartsButtons class="mt-8" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DartsButtons from "@/components/DartsButtons";

export default {
  components: { DartsButtons },
  computed: {
    ...mapGetters(["canCheckout", "player"])
  }
};
</script>
