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

      <div v-if="!isPractice" class="mt-4">
        <Scoreboard />
      </div>

      <div v-if="showSingles">
        <SinglesButtons />
      </div>

      <div v-else>
        <div class="mt-12 bg-gray-800">
          <ThrowScore />
        </div>

        <div class="mt-4">
          <ScorePad />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import Scoreboard from "@/components/Scoreboard";
import ThrowScore from "@/components/ThrowScore";
import ScorePad from "@/components/ScorePad";
import SinglesButtons from "@/components/SinglesButtons";

export default {
  components: { Scoreboard, ScorePad, SinglesButtons, ThrowScore },

  mounted() {
    if (!this.player) {
      this.$router.push("/");
    }

    this.startMatch();
  },

  computed: {
    ...mapState(["showSingles", "segments"]),
    ...mapGetters(["player", "isPractice"])
  },

  methods: {
    ...mapMutations(["clearSingles", "startMatch"])
  }
};
</script>
