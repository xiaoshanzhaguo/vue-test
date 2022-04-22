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
  Row,
  Dropdown,
  DropdownItem,
  DropdownMenu
} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/iconfont.css'
import router from "./router";
import http from './http'
import store from './store'

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
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)

Vue.config.productionTip = false

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$http = http

// 下面这个方法就可以实现路由的监听，它接收一个函数(有三个参数,to, from, next)
router.beforeEach((to, from, next) => {
  const token = localStorage.token
  // 拿到token后进行判断。如果token不存在并且它不是登录页，就不能让它登录系统
  // 添加：判断要去的页面是否为登录
  if (!token && to.name !== 'login' && to.name !== 'register') {
    next({
      name: 'login'
    })
  } else if (token && to.name === 'login') {
    next({
      name: 'home' // 重定向到首页
    })
  } else {
    // 登录成功的情况，就让它继续往下走
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')