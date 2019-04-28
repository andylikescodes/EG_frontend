import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged_in: false
  },
  getters:{
    logged_in(state){
      return !!state.logged_in
    }
  },
  mutations: {
    initialiseStore(state) {
			// initialize VUEX store from localStorage
      console.log('initializing vuex store')
			if(localStorage.getItem('store')) {
        this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))

				);
        console.log(state)
			}
		},
    change_login_status(state, status){
      state.logged_in = !!status
    }
  },
  actions: {

  }
})
