<template >
<v-card :color="bg_color" class="ma-1 pa-3">
    <v-layout justify-center wrap>
      <v-flex xs12>
        <v-avatar size="150">
          <img :src="compute_path(member.avatar_path)" height="300px">
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
      <v-layout>
        <v-flex xs2 v-for="service in JSON.parse(member.services)">
          <div class="text-xs-center">
            <v-chip>
              <v-avatar v-show="service in icon_paths">
                <img :src="compute_path(icon_paths[service])">
              </v-avatar>
              {{service}}
            </v-chip>
        </div>
      </v-flex>
      </v-layout>
  </v-card>
  </template>
<script>
  import {server_ip, axios_config} from "../configs/web_configs"
  import {icon_paths} from "../configs/app_configs"
  export default {
    data() {
      return {
        icon_paths : icon_paths
      }
    },
    props: ["bg_color", "member"],
    methods:{
      compute_path(path){
        return server_ip+path
      }
    },
    mounted(){
      //Sconsole.log(this.member)
    }
  }
</script>
<style>

</style>
