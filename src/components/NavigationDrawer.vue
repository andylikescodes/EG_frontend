<template>
<v-navigation-drawer
      v-model="drawer"
      id="navigationdrawer"
      app
      :mini-variant.sync="mini"
      hide-overlay
    >




<v-list >
        <v-list-tile avatar @click="click_avatar">
          <v-list-tile-avatar>
            <v-icon v-if="!logged_in" large>account_circle</v-icon>
            <img v-else :src=avatar_source alt="avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{avatar_text}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn
                icon
                @click.stop="collapse"
              >
              <v-icon>chevron_left</v-icon>
              </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider ></v-divider>
      </v-list>
<v-list>
      </v-list>
      <v-list dense>
        <v-list-tile @click.stop = "click_home">
          <v-list-tile-action>
            <v-icon>fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>主页</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="click_gift">
          <v-list-tile-action>
            <v-icon>fa-gift</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>礼品中心</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="click_ranking">
          <v-list-tile-action>
            <v-icon>fa-address-book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>大家的名片</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click.stop="click_about">
          <v-list-tile-action>
            <v-icon>fa-info-circle</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>关于</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click.stop="click_setting">
          <v-list-tile-action>
            <v-icon>fa-cog</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>设置</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


      </v-list>
    </v-navigation-drawer>
    </template>
<script>
import { EventBus } from '../utils/event-bus.js';
import {mapGetters} from 'vuex'
import {server_ip, axios_config} from "../configs/web_configs"
export default {
  computed:{
    ...mapGetters({
      user_profile: "user_profile",
      logged_in: "logged_in"
    }),
    avatar_source(){
      return server_ip+this.user_profile.avatar_path
    }
    ,
    avatar_text(){
      if(this.user_profile) return this.user_profile.username
      else return "请登录"
    }
  },
  mounted(){
    //console.log(this.user_profile.avatar_path)
    EventBus.$on("drawer_button_clicked",msg=>{
      this.drawer = !this.drawer
      this.mini = true
    });
  },
  watch:{
    drawer: function (val){
      if(!val) this.mini=true
    }
  },
  data () {
    return {
      mini: true,
      drawer: false
    }
  },
  methods:{
    click_home: function(){
      this.$router.push("/home")
      this.reset_drawer()
    },
    click_about: function(){
      this.$router.push("/about")
      this.reset_drawer()
    },
    reset_drawer: function(){
      this.drawer = false
      this.mini = true
    },
    collapse: function(){
      this.mini=true
    },
    click_ranking: function(){
      this.$router.push('/rankingchart')
      this.reset_drawer()
    },
    click_gift: function(){
      this.$router.push('/gift')
      this.reset_drawer()
    },
    click_avatar:function(){
      if (this.logged_in)
        this.$router.push('/profile')
      else
        this.$router.push("/login")
      this.reset_drawer()
    },
    click_setting: function(){
      this.$router.push('/setting')
      this.reset_drawer()
    }
  }
}
</script>

<style>

</style>
