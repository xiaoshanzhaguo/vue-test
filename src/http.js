import axios from "axios";

const http = axios.create({
    // 这里是指向的接口地址。3000表示后台的接口地址，它的api加一个前缀，放到admin/api下面。
    baseURL: 'http://localhost:3000/admin/api'
})

// 导出变量
export default http