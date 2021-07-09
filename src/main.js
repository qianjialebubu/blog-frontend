import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import mavonEditor from 'mavon-editor'
import axios from 'axios'
import './assets/css/global.css'
import './assets/css/myStyle.css'
import './assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import '@/assets/css/prism.css'
import 'mavon-editor/dist/css/index.css'
import * as echarts from 'echarts'
import md5 from 'js-md5'


Vue.prototype.$md5 = md5;
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

const blog = axios.create({ // 博客后台api地址
  baseURL: 'http://localhost:8090'
})

const picture = axios.create({ // 图片服务器api地址
  baseURL: 'http://hikari.top/pic_server'
})

Vue.prototype.$blog = blog
Vue.prototype.$picture = picture
Vue.prototype.$user = null

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(mavonEditor)

Vue.filter('dataFormat',function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate() + 1 + '').padStart(2,'0')
  return `${y}-${m}-${d}`
})


Vue.filter('dataFormat3',function (originVal) {
  const dt = new Date(originVal)
  let usedTime = new Date() - dt
  let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
  let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
  let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
  let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
  let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
  return days + '天' + hours + '时' + minutes + '分';
})


Vue.filter('dataFormat2',function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate() + 1 + '').padStart(2,'0')
  return `${y}-${m}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
