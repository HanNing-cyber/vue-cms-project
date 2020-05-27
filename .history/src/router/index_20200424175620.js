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
    alias: "/login",
    meta:{requiresAuth:false},
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    meta:{requiresAuth:false},
    component: Register,
  },
  {
    path:'/goods',
    name:'Goods',
    meta:{requiresAuth:true},
    component:Layout,
    children: [
      {
        path: "list",
        name: "ArticleList",
        meta:{requiresAuth:true},
        component: () => import("@/views/Article/List.vue"),
      },
      {
        path: "release",
        name: "ArticleRelease",
        meta:{requiresAuth:true},
        component: () => import("@/views/Article/Release.vue"),
      },
      {
        path: "edit/:id",
        name: "ArticleEdit",
        meta:{requiresAuth:true},
        props: true,
        component: () => import("@/views/Article/Edit.vue"),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
