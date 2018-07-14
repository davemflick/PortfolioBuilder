import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import store from './store/store.js';
import VueDraggableResizable from 'vue-draggable-resizable'
 
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = false

Vue.use(Vuetify)
sync(store, router);
//sup
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
