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
  // 商品管理
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
  // 订单管理
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
  // 账户设置
  {
    path:'/admin',
    name:'Admin',
    component:Layout,
    children: [
      {
        path: "setting",
        name: "AdminSetting",
        meta:{requiresAuth:true},
        component: () => import("@/views/Admin/Setting.vue"),
      },
    ],
  },
  // 用户管理
  {
    path:'/user',
    name:'User',
    component:Layout,
    children: [
      {
        path: "list",
        name: "UserList",
        meta:{requiresAuth:true},
        component: () => import("@/views/User/List.vue"),
      },
    ],
  },
  // 权限管理
  {
    path:'/auth',
    name:'Auth',
    component:Layout,
    children: [
      {
        path: "role",
        name: "AuthRole",
        meta:{requiresAuth:true},
        component: () => import("@/views/Auth/Role.vue"),
      },
      {
        path: "release",
        name: "GoodsRelease",
        meta:{requiresAuth:true},
        component: () => import("@/views/Auth/Menu.vue"),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
