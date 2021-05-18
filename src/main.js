/* eslint-disable no-unused-vars */
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
// import firebase from './firebase'
import './registerServiceWorker'
import VueChatScroll from 'vue-chat-scroll'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)
Vue.use(VueChatScroll)

Vue.config.productionTip = false

//Use

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
