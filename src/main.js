import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import '@/assets/css/tailwind.css'

Vue.use(VModal, { dynamic: true, injectModalsContainer: true })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
