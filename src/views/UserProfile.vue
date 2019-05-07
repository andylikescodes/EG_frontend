<template>
  <div>
    <v-container class="my-5">

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3>
          <v-card flat class="text-xs-center ma-3" color="grey lighten-3">
            <v-avatar
            tile
            size="100"
            >
              <v-img :src="avatar_path"></v-img>
            </v-avatar>
            <v-card-text>
              <p>{{user_profile.username}}</p>
              <p>{{user_profile.signature}}</p>
            </v-card-text>
          </v-card>
        </v-flex>
        </v-layout>
        <v-layout row wrap>
        <p> </p>
        <v-flex xs12 md6>
          <div class="caption grey--text">
            <p>邮箱: {{user_profile.email}}</p>
          </div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">
             <p>账户余额: {{user_profile.balance}}</p>
          </div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">
            <p>生日: {{user_profile.birthday}}</p>
          </div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">
            <p>City:</p>
          </div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">
            <p>签名: {{user_profile.signature}}</p>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {server_ip, axios_config} from "../configs/web_configs"
export default {
  computed:{
    ...mapGetters({
      user_profile: "user_profile"
    }),
    avatar_path(){
      return server_ip+this.user_profile.avatar_path
    }
  },

}
</script>
