import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Axios from 'axios'
import { EventBus } from './utils/event-bus.js';
Vue.prototype.$http = Axios;
Vue.config.productionTip = false

//each mutation will be cached in local storage
store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(state));
});

Axios.interceptors.response.use(response => {
   return response;
}, error => {
  if (error.response.status === 401) {
   //handle 401 unauthorized request
   EventBus.$emit('danger_alert',"你尚未登录或登录已过期，请重新登录!")
   router.push('/login')
  }
  return error;
});

new Vue({
  router,
  store,
  beforeCreate(){
    this.$store.commit('initialiseStore');
  },
  render: h => h(App)
}).$mount('#app')
