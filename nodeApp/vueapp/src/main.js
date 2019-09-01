import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://localhost:5000'
Vue.config.productionTip = false
// Vue.filter('setWH', (url, num) => {
//   return url.replace(/w\.h/, num)
//   // 过滤器
// })
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
