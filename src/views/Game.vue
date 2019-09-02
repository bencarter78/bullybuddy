<template>
  <div v-if="player">
    <div class="text-gray-100 px-8 py-4">
      <div class="flex justify-center font-logo text-3xl">
        <router-link :to="{ name: 'home' }">
          BullyBuddy
        </router-link>
      </div>

      <div class="mt-4">
        <Scoreboard />
      </div>

      <div class="mt-8">
        <DartsButtons />
      </div>

      <div class="mt-4">
        <ScorePad />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scoreboard from "@/components/Scoreboard";
import DartsButtons from "@/components/DartsButtons";
import ScorePad from "@/components/ScorePad";

export default {
  components: { Scoreboard, DartsButtons, ScorePad },

  mounted() {
    if (!this.player) {
      this.$router.push("/");
    }
  },

  computed: {
    ...mapGetters(["player"])
  }
};
</script>
