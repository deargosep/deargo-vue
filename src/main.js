/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
// import firebase from './firebase'
import './registerServiceWorker'


Vue.config.productionTip = false

//Use

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
