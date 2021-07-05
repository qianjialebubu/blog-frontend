import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import './assets/css/global.css'
import './assets/css/myStyle.css'
import './assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import '@/assets/css/prism.css'

// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })


Vue.prototype.$http = axios

const blog = axios.create({ // 博客后台api地址
  baseURL: 'http://localhost:8090'
})

const picture = axios.create({ // 图片服务器api地址
  baseURL: 'http://hikari.top/pic_server'
})

Vue.prototype.$blog = blog
Vue.prototype.$picture = picture

Vue.config.productionTip = false
Vue.use(Element)

Vue.filter('dataFormat',function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate() + 1 + '').padStart(2,'0')
  return `${y}-${m}-${d}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
