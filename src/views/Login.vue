<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class = "ma-4 ">
        <v-card-title primary-title class="mx-2">
          <div>
            <div class="headline"><v-icon large left>insert_emoticon</v-icon>登录 </div>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        </v-card-title>
        <v-form @submit.stop.prevent="click_login">
          <v-container>
            <v-layout row class="px-2">
              <v-flex >
                <v-text-field
                  v-model="form.email"
                  :rules="[rules.required]"
                  label="邮箱">
                  <template v-slot:prepend>
                    <v-icon large>email</v-icon>
                  </template>

                </v-text-field>
              </v-flex>
            </v-layout >

            <v-layout row class="px-2">
              <v-flex>
                <v-text-field
                  v-model="form.password"
                  label="密码"
                  :append-icon="show_password ? 'visibility' : 'visibility_off'"
                  :type="show_password ? 'text' : 'password'"
                  :rules="[rules.required]"
                  @click:append="show_password = !show_password"
                  required>
                  <template v-slot:prepend>
                    <v-icon large>lock_open</v-icon>
                  </template>

                </v-text-field>
              </v-flex>
          </v-layout>
          <v-layout justify-end>
            <v-flex >
          <router-link to="/reset_password" >忘记密码？</router-link>
          </v-flex>
          </v-layout>
          <v-layout row wrap justify-center>
            <v-flex xs6 md4><v-btn large outline type="submit"> 登录</v-btn></v-flex>
            <v-flex xs6 md4><v-btn large outline color="warning" @click.stop="reset"> 重置</v-btn></v-flex>

          </v-layout>
        </v-container>
      </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { EventBus } from '../utils/event-bus.js';
import {server_ip, axios_config} from "../configs/web_configs"
import {login, get_profile} from "../utils/users.js"
//import {mapGetters} from 'vuex'
export default {
    data: () => ({
      form:{
        email:'',
        password:''
      },
      show_password:false,
      rules:{
        required: value => !!value || '此处不能为空'
      }
    }),
    computed:{
    },
    methods:
    {
      reset: function(){
        this.form.email = ''
        this.form.password = ''
      },
      click_login: function(){
        login(this.form)
        .then(()=>{
          EventBus.$emit("success_alert", "登陆成功！")
          this.$router.push("/home")
          this.$store.commit("change_login_status", true)
          return get_profile()
        }).then((user_profile)=>{
          //console.log(user_profile)
          this.$store.commit("update_user_profile", user_profile)
        }).catch((err)=>{
          console.log(err)
          EventBus.$emit("danger_alert", "登陆失败，请重试！")
        })
      }
    }
  }
</script>

<style>

</style>
