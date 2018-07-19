import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MyPlugin from '@/common/MyPlugin.js'
Vue.use(ElementUI)
Vue.use(MyPlugin)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.alert = (msg, {type = 'warning', period = 2000, callback = () => {}} = {}) => {
  Vue.prototype.$message({
    showClose: true,
    message: msg,
    type: type,
    duration: period,
    onClose: callback
  })
}
Vue.prototype.goto = (t) => {
  router.push(t)
}
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
