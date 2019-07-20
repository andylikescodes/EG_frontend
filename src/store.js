import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const initial_temporary_value = {
  socketIO_connected:false,
  employee_status: null
}
function init_temporary(state){
  state.temporary = initial_temporary_value
  console.log("restored temporary data")
}
export default new Vuex.Store({
  state: {
    temporary: initial_temporary_value,
    logged_in: false,
    user_profile: 0,
    settings: {
      backlit: false,
      auto_audio: false,
      theme: {
        name : "theme-blue",
        alias : "淡定蓝",
        main_color: "#A6E3FC"
      }
    }
  },
  getters:{
    auto_audio(state){
      return state.settings.auto_audio
    },
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
    },
    employee_status(state){
      return state.temporary.employee_status
    }
  },
  mutations: {
    set_auto_audio(state, val){
      state.settings.auto_audio = val
      //console.log(val)
    },
    initialiseStore(state) {
			// initialize VUEX store from localStorage
      console.log('initializing vuex store')
			if(localStorage.getItem('store')) {
        this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
        //console.log(state)
      }
      init_temporary(state)
		},
    change_login_status(state, status){
      state.logged_in = !!status
    },
    clear_temporary_data(state){
      //this is for restore these status value back to initial
      init_temporary(state)
    },
    update_user_profile(state, profile){
      state.user_profile = profile
    },
    update_theme (state, new_theme){
      state.settings.theme = new_theme
    },
    switch_backlit (state, val){
      state.settings.backlit = val
    },
    //socketIO registered commit:
    SOCKET_connect(state, socket){
      console.log("socketIO connected")
      state.temporary.socketIO_connected = true
    },
    SOCKET_employee_status_update(state, value){
      state.temporary.employee_status = value
    }
  },
  actions: {

  }
})
