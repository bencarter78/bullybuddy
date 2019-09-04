<template>
  <div v-if="player">
    <div class="h-screen text-gray-100 px-8 py-4">
      <div>
        <div class="flex justify-center font-logo text-3xl">
          <router-link :to="{ name: 'home' }">
            BullyBuddy
          </router-link>
        </div>
      </div>

      <div>
        <LegScore />
      </div>

      <div class="mt-8 bg-gray-800">
        <ThrowScore />
      </div>

      <div class="mt-4">
        <ScorePad />
      </div>

      <div class="mt-8">
        <Scoreboard />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scoreboard from "@/components/Scoreboard";
import ThrowScore from "@/components/ThrowScore";
import ScorePad from "@/components/ScorePad";
import LegScore from "@/components/LegScore";

export default {
  components: { Scoreboard, ThrowScore, LegScore, ScorePad },

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
