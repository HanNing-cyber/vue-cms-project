import Vue from 'vue'
import Vuex from 'vuex'
import { Admin } from "@/api/index";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //侧边栏导航的显示隐藏
    isCollapse: false,
    //ajax请求的账户资料
    profile: {},
  },
  mutations: {
    add(state, n) {
      state.count += n;
    },
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
  modules: {},
});

