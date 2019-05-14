import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    temporary: {
    },
    logged_in: false,
    user_profile: 0,
    settings: {
      backlit: false,
      theme: {
        name : "theme-blue",
        alias : "淡定蓝",
        main_color: "#A6E3FC"
      }
    }
  },
  getters:{
    logged_in(state){
      return !!state.logged_in
    },
    user_profile(state){
      return state.user_profile
    },
    theme(state){
      return state.settings.theme
    },
    backlit(state){
      return state.settings.backlit
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
    },
    update_theme (state, new_theme){
      state.settings.theme = new_theme
    },
    switch_backlit (state, val){
      state.settings.backlit = val
    }
  },
  actions: {

  }
})
