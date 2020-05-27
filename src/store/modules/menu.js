export default {
    namespaced: true,
    state: {
        //侧边栏导航的显示隐藏
        isCollapse: false,
    },
    mutations: {
        //导航栏 布尔值取反
        toggleMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
    },
    actions: {

    },
    getters: {

    },

}