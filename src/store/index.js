import Vue from "vue";
import Vuex from "vuex";

import characters from "../models/characters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    characters,
  },
});
