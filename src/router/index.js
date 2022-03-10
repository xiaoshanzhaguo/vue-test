import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) // 全局引入别忘了

const routes = [{
  path: '/',
  name: 'main',
  component: () => import('../views/Main.vue'),
  redirect: '/home',
  children: [{
      path: '/home',
      name: 'home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/user/index.vue')
    },
    {
      path: '/food',
      name: 'food',
      component: () => import('../views/food/index.vue')
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('../views/chart/index.vue')
    }
  ]
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router