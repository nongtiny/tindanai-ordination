import Vue from 'vue'
import App from './App.vue'
import './assets/css/input.css'

import SmoothScrollbar from 'vue-smooth-scrollbar'
Vue.use(SmoothScrollbar)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
