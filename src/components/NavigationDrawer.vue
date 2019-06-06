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
            <v-list-tile-title class="default-font">{{avatar_text}}</v-list-tile-title>
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
            <v-list-tile-title class="default-font">主页</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="click_gift">
          <v-list-tile-action>
            <v-icon>fa-gift</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="default-font">礼品中心</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="click_ranking">
          <v-list-tile-action>
            <v-icon>fa-address-book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="default-font">名片</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click.stop="click_about">
          <v-list-tile-action>
            <v-icon>fa-info-circle</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="default-font">关于</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click.stop="click_help">
          <v-list-tile-action>
            <v-icon>fa-hands-helping</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="default-font">帮助</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click.stop="click_setting">
          <v-list-tile-action>
            <v-icon>fa-cog</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="default-font">设置</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click.stop="click_share">
          <v-list-tile-action>
            <v-icon>fa-share-alt</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="default-font">分享</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="user_profile.groupid==4 || user_profile.groupid == 5" @click.stop="click_user_management">
          <!-- this will only show when groupid > = 4 namely, customer service and above -->
          <v-list-tile-action>
            <v-icon>fa-book-reader</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="default-font">用户管理 （仅对你可见）</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user_profile.groupid == 5" @click.stop="click_admin">
          <!-- this will only show when groupid > = 4 namely, customer service and above -->
          <v-list-tile-action>
            <v-icon>fa-users-cog</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="default-font">究极牛逼管理 （仅对你可见）</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    </template>
<script>
import { EventBus } from '../utils/event-bus.js';
import {copyToClipboard} from  '../utils/other_utils.js'
import {mapGetters} from 'vuex'
import {server_ip, axios_config} from "../configs/web_configs"
import {default_avatar} from "../assets/images.js"
export default {
  computed:{
    ...mapGetters({
      user_profile: "user_profile",
      logged_in: "logged_in"
    }),
    avatar_source(){
      if ( this.user_profile.avatar_path  )
        return this.user_profile.avatar_path
      else {
        return default_avatar
      }
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
    click_help: function(){
      this.$router.push("/help")
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
    },
    click_user_management: function(){
      this.$router.push('/user_manage')
      this.reset_drawer()
    },
    click_admin: function(){
      this.$router.push("/admin")
      this.reset_drawer()
    },
    click_share: function(){
      if (navigator.share) {
        navigator.share({
          title: 'Eternal Garden Club',
          text: '每天都是固定的人打游戏是不是很无聊？ 四缺一想找个厉害有趣的小哥哥小姐姐一起玩儿？ 想要提高自己的游戏水平？ 喜欢热闹友好的氛围？ 北美游戏俱乐部：Eternal Garden替你筛选出Vodka的千分大神，梅子酒王者姑娘，人美声甜的钻石白金小姐姐。所有温暖和爱给独一无二的你。 来玩吧，今天也是华灯如昼的狂欢！',
          url: 'https://eternalgardenclubapp.com',
          })
          .then(() => {
            console.log('Successful share')
            this.reset_drawer()
          })
          .catch((error) => {
            console.log('Error sharing', error)});
            this.reset_drawer()
        }
      else {
        console.log("no share functionality")
        copyToClipboard("https://eternalgardenclubapp.com")
        EventBus.$emit("success_alert", "已经复制到剪贴板，您可以直接在需要的地方粘贴")
        this.reset_drawer()
      }
      }
  }
}
</script>

<style>

</style>
