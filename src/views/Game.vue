<template>
  <div v-if="player">
    <div class="h-screen text-gray-100 px-8 py-4">
      <div>
        <div class="flex justify-center font-logo text-4xl">
          <router-link :to="{ name: 'home' }">
            BullyBuddy
          </router-link>
        </div>
      </div>

      <div v-if="!isPractice">
        <LegScore />
      </div>

      <div class="mt-8 bg-gray-800">
        <ThrowScore />
      </div>

      <div class="mt-4">
        <ScorePad />
      </div>

      <div v-if="!isPractice" class="mt-8">
        <Scoreboard />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
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

    this.startMatch();
  },

  computed: {
    ...mapGetters(["player", "isPractice"])
  },

  methods: {
    ...mapMutations(["startMatch"])
  }
};
</script>
