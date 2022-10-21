import Vue from 'vue'
import axios from 'axios'


import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
Vue.config.productionTip = false
import Vuet from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.prototype.$axios = axios;
new Vue({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  router,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
