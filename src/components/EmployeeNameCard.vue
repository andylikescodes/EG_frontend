<template >
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
      <v-expand-transition>
      <v-btn  v-show="hover" color="primary" @click="message" class=caption>  信息<v-icon dark right>message</v-icon></v-btn>
      </v-expand-transition>
      <v-expand-transition>
      <v-btn v-show="hover"  color="success" @click="make_appointment" class=caption>  预约<v-icon dark right>fa-calendar-check</v-icon></v-btn>
      </v-expand-transition>
      </v-layout>
      </v-container>
  </v-card>

  </v-hover>
  </template>
<script>
  import {server_ip, axios_config} from "../configs/web_configs"
  import {icon_paths} from "../configs/app_configs"
  import { EventBus } from '../utils/event-bus';
  export default {
    data() {
      return {
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
        EventBus.$emit("danger_alert","我们正在加班加点完成该功能，预约请直接联系客服！")
      }
    },
    mounted(){
      //Sconsole.log(this.member)
    }
  }
</script>
<style>
</style>
