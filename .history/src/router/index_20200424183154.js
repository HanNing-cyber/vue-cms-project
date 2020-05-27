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
    component:Layout,
    children: [
      {
        path: "list",
        name: "GoodsList",
        meta:{requiresAuth:true},
        component: () => import("@/views/Goods/List.vue"),
      },
      {
        path: "release",
        name: "GoodsRelease",
        meta:{requiresAuth:true},
        component: () => import("@/views/Goods/Release.vue"),
      },
      {
        path: "category",
        name: "GoodsCategory",
        meta:{requiresAuth:true},
        props: true,
        component: () => import("@/views/Goods/Category.vue"),
      },
    ],
  },
  {
    path:'/order',
    name:'Order',
    component:Layout,
    children: [
      {
        path: "list",
        name: "OrderList",
        meta:{requiresAuth:true},
        component: () => import("@/views/Order/List.vue"),
      },
    ],
  },
  {
    path:'/admin',
    name:'Admin',
    component:Layout,
    children: [
      {
        path: "setting",
        name: "OrderList",
        meta:{requiresAuth:true},
        component: () => import("@/views/Order/List.vue"),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
