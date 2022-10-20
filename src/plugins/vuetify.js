import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    

  theme: {
    themes: {
      light: {
        primary: '#FFF',
        secondary: '#EEEEEE',
        anchor: '#8c9eff',
      },
      dark:{
        primary:"#212121"
      }
    },
  }


});
