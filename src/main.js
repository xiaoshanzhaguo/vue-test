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
  Submenu,
  Message,
  MessageBox,
  Form,
  FormItem,
  Input,
  Button,
  Dialog,
  Col,
  Table,
  TableColumn,
  Row
} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import http from './http'

Vue.use(Header)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)

Vue.config.productionTip = false

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$http = http

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