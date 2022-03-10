import Vue from 'vue'
import App from './App.vue'
import { Header, Container, Main, Aside } from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";

Vue.use(Header)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
