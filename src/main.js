import Vue from 'vue'
import App from './App.vue'
import {
  Header,
  Container,
  Main,
  Aside,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu
} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";

Vue.use(Header)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)

Vue.config.productionTip = false

//添加导航守卫， 一开始就进入home页面
// router.beforeEach((to, from, next) => {
//   if (to.path === '/') {
//     console.log("111");
//     next()
//   }
// })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')