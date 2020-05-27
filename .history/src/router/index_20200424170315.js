import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Layout from "@/components/Layout.vue";
import { Message} from 'element-ui'

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
  },
]

const router = new VueRouter({
  routes
})

export default router
