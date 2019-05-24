<template >
<div>
<v-hover>
<v-card :color="bg_color" class="ma-1 pa-3" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
  <v-container>
    <v-layout justify-center wrap>
      <v-flex xs12>
        <v-avatar size="150">
          <img :src="compute_path(member.avatar_path)" height="200px">
        </v-avatar>
      </v-flex>
      </v-layout>
      <v-layout wrap>
      <v-flex xs12>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{member.name}}</div>
              <div class="subheading"> 人气: {{member.popularity}}</div>
              <div class="subheading font-italic">{{member.description}}</div>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-layout wrap>
          <div class="text-xs-center">
            <v-chip v-for="service in JSON.parse(member.services)">
              <!-- <v-avatar v-show="service in icon_paths">
                <img :src="compute_path(icon_paths[service])">
              </v-avatar> -->
              {{service}}
            </v-chip>

        </div>

      </v-layout>
      <v-layout row>
      <v-flex>
      <v-expand-transition>
      <v-btn  v-show="hover" color="primary" @click="message" class=caption>  信息<v-icon dark right>message</v-icon></v-btn>
      </v-expand-transition>
      </v-flex>
      <v-flex>
      <v-expand-transition>
      <v-btn v-show="hover"  color="success" @click.stop="make_appointment" class=caption>  预约<v-icon dark right>fa-calendar-check</v-icon></v-btn>
      </v-expand-transition>
      </v-flex>
      </v-layout>
      </v-container>
  </v-card>

  </v-hover>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">预约陪玩</v-card-title>

        <v-card-text>
          目前系统暂时不能自动预约，请通过下面的二维码找到客服微信预约您心仪的陪玩！当然，您也可以通过Discord客服频道直接预约。
        </v-card-text>
        <v-layout mx-2>
        <v-img :src="require('../assets/customer_service_wechat.jpg')"></v-img>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="discord_reserve"
          >
            Discord预约
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="click_save"
          >
            保存二维码
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</div>
</template>
<script>
  import {server_ip, axios_config} from "../configs/web_configs"
  import {icon_paths} from "../configs/app_configs"
  import { EventBus } from '../utils/event-bus';
  export default {
    data() {
      return {
        dialog: false,
        icon_paths : icon_paths
      }
    },
    props: ["bg_color", "member"],
    methods:{
      compute_path(path){
        return path
      },
      message(){
        EventBus.$emit("danger_alert","该功能尚未开通")
      },
      make_appointment(){
        //EventBus.$emit("danger_alert","我们正在加班加点完成该功能，预约请直接联系客服！")
        this.dialog = true
      },
      click_save(){
        var link = document.createElement("a")
        link.setAttribute("href", require('../assets/customer_service_wechat.jpg'))
        link.setAttribute("download","QR.jpg")
        link.click()
        this.dialog=false
      },
      discord_reserve(){
        this.dialog = false
        var win = window.open("https://discord.gg/EcWarmA", '_blank');
        win.focus();
      }
    },
    mounted(){
      //Sconsole.log(this.member)
    }
  }
</script>
<style>
</style>
