import Vue from 'vue'
import App from './App.vue'
import vue from './index'

Vue.config.productionTip = false
Vue.use(vue)

new Vue({
  components: { vue },
  render: h => h(App)
}).$mount('#app')
