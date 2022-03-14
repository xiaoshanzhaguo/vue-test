import axios from "axios";
import Vue from "vue";

const http = axios.create({
    // 这里是指向的接口地址。3000表示后台的接口地址，它的api加一个前缀，放到admin/api下面。
    baseURL: 'http://localhost:3000/admin/api'
})

// 【登录接口】 1. 在http里全局捕获 下面就是给整个http请求加一个拦截器(查看官方文档，npm axios包)
http.interceptors.response.use(res => {
    // 2. res做一件事情
    return res
}, err => {
    // 3. 如果报错了，err就是做另外一件事情。错误的请求，不是200状态码，>=400它都会进入err这里
    // console.log(err.name); // 看一下err.name是什么
    // console.log(err.response);  // err的错误对象上有个返回对象 响应对象
    // console.log(err.response.data); // err.response.data表示的是响应数据
    // console.log(err.response.data.message);
    // 如果我们以后跟服务端约定一个规则，如果服务端发生了报错，我们就统一返回一个json，
    // 里面有一个message表示或让客户端显示什么文字。那我们就可以在客户端里统一监听这个错误，

    /* 4. 然后用Vue的prototype实例的$message.error去弹出这个错误
    这里是用elementui里的$message方法去显示一个提示
    因此这里就是一个通用的处理方案，当服务端返回了错误代码，而且有一个message的话，我们就把它拿出来。 */

    /* 5. 这里要保险点，再做点判断
    有内容的话，就自动弹出这个内容，那我们就不需要在每一个页面去监听有什么错误，再去弹出什么错误内容。 */
    if (err.response.data.message) {
        // ！！！下面没有return
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message // ！！！ 注意这里的值
        })
    }

    // ！！！别忘了下面这一步
    return Promise.reject(err)
})


// 导出变量
export default http