import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Hls from 'hls.js'
import danmuku from 'artplayer-plugin-danmuku';
import NPlayer from "@nplayer/vue";
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
Vue.config.productionTip = false
import Vuet from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'
Vue.use(NPlayer)
Vue.use(axios)
Vue.prototype.$axios = axios;
new Vue({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  danmuku,
  NPlayer,
  Hls,
  router,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
