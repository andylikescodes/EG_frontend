<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>EternalGarden</span>
      <span class="font-weight-light">Club</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      flat
      @click.stop="right_btn_clicked"
      target="_blank"
    >
      <span class="mr-2">{{right_btn_text}}</span>
    </v-btn>
  </v-toolbar>
</template>

<script>
import {mapGetters} from 'vuex'
import {logout} from "../utils/users.js"
import { EventBus } from '../utils/event-bus.js';
  export default {
    data() {
      return {}
    },
    computed:{
      ...mapGetters({
        logged_in: 'logged_in'
      }),
      right_btn_text(){
        if (this.logged_in) return "登出"
        else return "注册"
      }
    },
    methods:{
      right_btn_clicked(){
        if (this.logged_in){
          logout().then(res =>{
            EventBus.$emit("success_alert", "已经成功登出！")
            this.$store.commit("change_login_status", false)
            this.$router.push("/login")
          })
        }
      }
    }
  }
</script>

<style>

</style>
