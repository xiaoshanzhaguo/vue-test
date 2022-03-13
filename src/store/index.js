// store中引入Vue，Vuex，然后需要将Vuex进行全局的注入。
import Vue from "vue";
import Vuex from 'vuex'
// 在这里会定义我们刚才所需要控制是否展开的state属性
import tab from "./tab"

Vue.use(Vuex)

// export xxx 将store进行暴露。
export default new Vuex.Store({
    // 我们需要通过modules的方式将不同模块的store进行引入。
    modules: {
        // ！！！ 别忘了这里要加{}
        tab
    }
})