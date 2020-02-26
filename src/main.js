import Vue from 'vue'
import App from './App.vue'
import * as vue from './index'

Vue.config.productionTip = false
Vue.use(vue)

new Vue({
  render: h => h(App)
}).$mount('#app')
