<template>
  <div>
    <div class="text-gray-100 px-8 py-4">
      <div>
        <ul class="list-reset flex justify-between items-center">
          <li class="border-b-2 border-gray-100">Player 1</li>
          <li class="font-logo text-3xl">
            <router-link :to="{ name: 'home' }">
              BullyBuddy
            </router-link>
          </li>
          <li class="text-gray-500">Player 2</li>
        </ul>
      </div>

      <div class="mt-4">
        <div
          class="flex justify-end items-baseline border-b border-gray-700 text-5xl text-gray-300"
        >
          <div class="text-lg mr-2">
            {{ displayDarts }}
          </div>

          <div>
            {{ throwScore }}
          </div>
        </div>
      </div>

      <div class="mt-4">
        <ul class="list-reset flex justify-between">
          <li
            v-for="n in [1, 2, 3]"
            :key="n"
            @click="setCurrentDart(n)"
            class="w-1/3 text-center px-3 py-1 rounded text-gray-500"
            :class="{ 'text-green-100 bg-green-700': currentDart == n }"
          >
            <span v-if="darts.length >= n"> D{{ n }}: {{ darts[n - 1] }} </span>

            <span v-else> Dart {{ n }} </span>
          </li>
        </ul>
      </div>

      <div class="">
        <div class="flex flex-col">
          <div v-if="showSingles" class="flex flex-wrap mt-4">
            <div class="w-1/4 p-2" v-for="n in segments" :key="n">
              <button
                @click="recordThrow(n)"
                class="text-center w-full bg-gray-700 rounded py-4 text-gray-100"
              >
                {{ n }}
              </button>
            </div>
          </div>

          <div v-else>
            <div v-for="(c, index) in categories" :key="index">
              <div v-if="!c.hasOwnProperty('score')">
                <button
                  @click="selectSegment(c.multiplyer)"
                  class="w-full py-4 mx-auto rounded text-gray-100 bg-gray-700 mt-4 text-center uppercase tracking-wider"
                >
                  {{ c.name }}
                </button>
              </div>
              <button
                v-else
                @click="recordThrow(c.score)"
                class="w-full py-4 mx-auto rounded text-gray-100 bg-gray-700 mt-4 text-center uppercase tracking-wider"
              >
                {{ c.name }}
              </button>
            </div>
          </div>

          <div>
            <button
              v-if="darts.length == 3"
              class="w-full py-4 mx-auto rounded text-green-100 bg-green-700 mt-4 text-center uppercase tracking-wider"
            >
              End Turn
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState([
      "categories",
      "currentDart",
      "game",
      "players",
      "segments",
      "total",
      "darts",
      "showSingles"
    ]),
    ...mapGetters(["displayDarts", "throwScore"])
  },

  methods: {
    ...mapMutations(["incrementDart", "decrementDart", "setCurrentDart"]),
    ...mapActions(["recordThrow", "selectSegment"])
  }
};
</script>
