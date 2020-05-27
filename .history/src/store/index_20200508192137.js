import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import test from "./modules/test";
import menu from "./modules/menu";
import user from "./modules/user"
import createPersistedState from "vuex-persistedstate"

export default new Vuex.Store({
  state: {
  },
  mutations: {
    toggleMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 储存账户资料
    setProfile(state, payload) {
      state.profile = payload;
    },
  },
  actions: {
    async loadProfile(context, id) {
      let { status, data } = await Admin.info({ id });
      // 提交mutation
      context.commit('setProfile', data);
    },
    async updateProfile(context, payload) {
      let { status, msg } = await Admin.edit(payload);
      if (status) {
        //提交mutation 更新state
        context.commit('setProfile', payload);
        return msg;
      }
    },
  },
  modules: {
    menu,
    user,
  },
});

