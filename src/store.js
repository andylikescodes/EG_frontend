import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    temporary: {
    },
    logged_in: false,
    user_profile: 0
  },
  getters:{
    logged_in(state){
      return !!state.logged_in
    },
    user_profile(state){
      return state.user_profile
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
    },
    clear_temporary_data(state){
      //this is for restore these status value back to initial
    },
    update_user_profile(state, profile){
      state.user_profile = profile
    }
  },
  actions: {

  }
})
