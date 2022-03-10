import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) // 全局引入别忘了

const routes = [{
  path: '/',
  name: 'home',
  component: () => import('../views/Home.vue')
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router