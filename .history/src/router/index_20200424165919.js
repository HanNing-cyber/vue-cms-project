import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    meta:{requiresAuth:false},
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    meta:{requiresAuth:false},
    component: Register,
  }..
]

const router = new VueRouter({
  routes
})

export default router
