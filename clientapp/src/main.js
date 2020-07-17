import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
const vuetifyOptions = {}


Vue.config.productionTip = false

new Vue({
  vuetify: new Vuetify(vuetifyOptions),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
