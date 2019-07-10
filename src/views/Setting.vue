
<template>
<div>
  <v-layout row my-3>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>

        <v-list two-line subheader>
          <v-subheader class="setting-text">外观</v-subheader>
            <v-list-tile>
            <v-list-tile-action>
              <v-switch  :value="backlit_value" @change="illumination_switched"></v-switch>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="setting-text">炫彩灯</v-list-tile-title>
              <v-list-tile-sub-title class="setting-text">打开/关闭标题栏下的背光灯特效</v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>

           <v-list-group
            no-action>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title class="setting-text">主题</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-radio-group :value="theme_name" @change="theme_changed">
            <v-list-tile v-for="(theme, index) in theme_configs" :key="index">
              <v-list-tile-content >

                <v-list-tile-action>

                    <v-radio :color="theme.main_color"  :value="theme.name">
                        <template v-slot:label>
                           <ColorBlock :color="theme.main_color" :color_name="theme.alias"></ColorBlock>
                        </template>

                    </v-radio>

                </v-list-tile-action>
              </v-list-tile-content>

            </v-list-tile>
            </v-radio-group>

            </v-list-group>

        </v-list>

        <v-divider></v-divider>

        <v-list
          subheader
          three-line
        >
        <v-subheader class="setting-text">账户</v-subheader>
        <v-list-tile @click="refresh_user">

            <v-list-tile-content >
              <v-list-tile-title class="setting-text">刷新用户信息</v-list-tile-title>
              <v-list-tile-sub-title class="setting-text">获取最新的用户信息</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="set_discord">

            <v-list-tile-content >
              <v-list-tile-title class="setting-text">Discord</v-list-tile-title>
              <v-list-tile-sub-title class="setting-text red--text text--darken-2" v-if="!user_profile.discordID">您还没有绑定Discord账号，由于本应用与Discord深度结合，我们强烈建议您绑定Discord账号以获得最佳使用体验！</v-list-tile-sub-title>
              <v-list-tile-sub-title class="setting-text" v-else>您已经绑定Discord账号：<b>{{user_profile.discordName}}</b>，点击可修改</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>
        <v-list
          subheader
          two-line
        >
          <v-subheader class="setting-text">其他</v-subheader>

          <v-list-tile @click="notifications = !notifications">
            <v-list-tile-action>
              <v-checkbox :color="theme.main_color" v-model="notifications"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content >
              <v-list-tile-title class="setting-text">通知</v-list-tile-title>
              <v-list-tile-sub-title class="setting-text">勾选后同意应用推送通知给您。</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="reload_app">

            <v-list-tile-action >
              <v-list-tile-title class="setting-text">重载应用</v-list-tile-title>
              <v-list-tile-sub-title class="setting-text">该操作会自动寻找最新版本并更新。</v-list-tile-sub-title>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row justify-center>
    <v-dialog v-model="discord_dialog" persistent>
      <v-card mx-2>
        <v-card-title class="headline" v-if="!user_profile.discordID">绑定Discord账户</v-card-title>
        <v-card-title class="headline" v-else>修改Discord账户</v-card-title>
        <v-card-text >
          <div>
          请完成以下操作
          </div>
          <div v-if="user_profile.discordID">
            使用新的账号登陆Discord;
          </div>
          <div>
            Discord口令已经自动复制到你的剪切板中，前往我们的<a href="https://discord.gg/93cSDc" target="_blank">Discord频道</a>，找到“EGC BOT”用户，向其私信发送复制的口令即可 （粘贴）
          </div>
          <div>
            完成后，可点击完成操作按钮，系统会自动为您刷新信息，也可在设置界面中手动刷新用户信息（点击“刷新用户信息”）。
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="goto_discord" small>前往Discord</v-btn>
          <v-btn color="green darken-1" flat @click="finish_bind_discord" small>我已完成</v-btn>
          <v-btn color="green darken-1" flat @click="discord_dialog = false" small>取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</div>
</template>

<script>
  import ColorBlock from "../components/color_block.vue"
  import {mapGetters} from 'vuex'
  import {theme_configs} from "../configs/app_configs"
  import {server_ip, axios_config} from "../configs/web_configs"
  import {copyToClipboard} from "../utils/other_utils.js"
  import { EventBus } from '../utils/event-bus.js';
  import{get_profile} from "../utils/users"
  export default {
    components:{ColorBlock},
    computed:{
      ...mapGetters({
        theme: "theme",
        backlit: "backlit",
        user_profile: "user_profile"
      })
    },
    mounted(){
      this.theme_name = this.theme.name
      this.backlit_value = this.backlit
    },
    data () {
      return {
        theme_configs: theme_configs,
        theme_name: '',
        backlit_value: false,
        notifications: false,
        sound: false,
        video: false,
        invites: false,
        discord_dialog: false,
        discord_token: ""
      }
    },
    methods:{
      theme_changed: function(val){
        this.theme_name = val
        for (let i = 0; i< theme_configs.length; i++){
          if (theme_configs[i].name == this.theme_name){
            this.$store.commit("update_theme", theme_configs[i])
            break;
          }
        }
      },
      illumination_switched: function(val){
        //console.log(val)
        this.$store.commit("switch_backlit", val)
      },
      reload_app(){
        window.location.reload(true)
      },
      set_discord(){
        
        //console.log(this.user_profile._id)
        this.$http.get(server_ip+"/user/bind_discord", axios_config).then(res=>{
          this.discord_token = res.data
          this.copy_discord_token()
          this.discord_dialog=true
        })
      },
      goto_discord(){
        //this.discord_dialog = false
        window.open('https://discord.gg/93cSDc')
      },
      copy_discord_token(){
        copyToClipboard(this.discord_token)
        console.log(this.discord_token)
        EventBus.$emit("success_alert","已经成功复制Discord口令至剪贴板")
      },
      refresh_user(){
        return get_profile().then(result=>{
          this.$store.commit("update_user_profile", result)
        })
      },
      finish_bind_discord(){
        this.refresh_user().then(()=>{
          if (this.user_profile.discordID){
            EventBus.$emit("success_alert","绑定成功！")
          }
          else{
            EventBus.$emit("danger_alert","绑定失败，请重试！")
          }
          this.discord_dialog=false
        })
        
        
      }
      
    }
  }
</script>

<style>
.setting-text{
  font-family: Shouzha7
}
</style>

