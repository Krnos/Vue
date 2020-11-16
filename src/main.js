import Vue from 'vue'
import App from './App.vue'
import * as krnos from './index'

Vue.config.productionTip = false
Vue.use(krnos)

new Vue({
  render: h => h(App)
}).$mount('#app')
