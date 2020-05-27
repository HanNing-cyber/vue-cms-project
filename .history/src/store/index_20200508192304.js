import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import menu from "./modules/menu";
import user from "./modules/user"
import createPersistedState from "vuex-persistedstate"

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    menu,
    user,
  },
  plugins:[createPersistedState()]
});

