/* eslint-disable no-unused-vars */
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import './registerServiceWorker'
import VueChatScroll from 'vue-chat-scroll'
import { firestorePlugin } from 'vuefire'
// import msg from './db'
Vue.use(firestorePlugin)
Vue.use(VueChatScroll)

Vue.config.productionTip = false
import {msg} from './db'

Vue.prototype.$messaging = msg

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
