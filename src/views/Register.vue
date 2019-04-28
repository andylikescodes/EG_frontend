<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class = "ma-4 ">
        <v-card-title primary-title class="mx-2">
                  <div>
                    <div class="headline"><v-icon large left>face</v-icon>立刻开始 </div>

                    <p class="pt-3 ml-2">注册用户仅需要您几分钟时间</p>
                  </div>
                </v-card-title>
                <v-divider></v-divider>
        <v-form ref="register_form" @submit.stop.prevent="submit">
          <v-container>
            <v-layout row class="px-2">
              <v-flex >
                <v-text-field
                  v-model="form.username"
                  :counter="12"
                  label="用户名"
                  @blur = "validate_user"
                  :error-messages="user_error_texts"
                  :rules="[rules.required]"
                  required>
                  <template v-slot:prepend>
                    <v-icon large>account_circle</v-icon>
                  </template>

                </v-text-field>
              </v-flex>
            </v-layout >
            <v-layout row class="px-2">
              <v-flex>
                <v-text-field
                  v-model="form.email"
                  @blur="validate_email"
                  :error-messages="email_error_texts"
                  label="邮箱"
                  :rules="[rules.required, rules.email_match]"
                  required>
                  <template v-slot:prepend>
                    <v-icon large>email</v-icon>
                  </template>

                </v-text-field>
              </v-flex>
          </v-layout>
          <v-layout row class="px-2">
            <v-flex>
              <v-text-field
                v-model="form.password"
                label="密码"
                :append-icon="show_password ? 'visibility' : 'visibility_off'"
                :type="show_password ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
                @click:append="show_password = !show_password"
                required>
                <template v-slot:prepend>
                  <v-icon large>lock_open</v-icon>
                </template>

              </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row class="px-2">
          <v-flex>
            <v-text-field
              v-model="form.confirm_password"
              label="确认密码"
              :append-icon="show_confirm_password ? 'visibility' : 'visibility_off'"
              :type="show_confirm_password ? 'text' : 'password'"
              :rules="[rules.required, rules.min, confirm]"
              @click:append="show_confirm_password = !show_confirm_password"
              required>
              <template v-slot:prepend>
                <v-icon large>check_circle</v-icon>
              </template>

            </v-text-field>
          </v-flex>
      </v-layout>
      <v-layout row class="px-2">
        <v-checkbox
        v-model="checkbox"
        :rules="[rules.required]"
        >
        <template v-slot:append>
          <div class="mt-1"><span>我已阅读<a class="pink--text lighten-4">服务条款</a>和<a class="pink--text lighten-4">隐私权相关条例</a></span> </div>
        </template>
      </v-checkbox>
    </v-layout >
      <v-layout row wrap justify-center>
        <v-flex xs6 md4><v-btn large outline  type="submit"> 注册</v-btn></v-flex>
        <v-flex xs6 md4><v-btn large outline color="warning" @click="reset"> 重置</v-btn></v-flex>

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
export default{

  data(){

    return{
      temp_user_err: false,
      temp_email_err: false,
      user_error_texts: [],
      email_error_texts : [],
      form:{
        username:'',
        email: "",
        password: "",
        confirm_password: ""
      },
      checkbox: false,
      show_password: false,
      show_confirm_password: false,
      rules: {
        required: value => !!value || '此处不能为空',
        min: v => v.length >= 8 || '密码至少要8位哦！',
        email_match: v=> /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(v).toLowerCase()) || "email格式不正确"
      }
    }
  },
  watch:{
    "form.username":function(){
      if(this.temp_user_err){
        this.validate_user()
      }
    },
    "form.email":function(){
      if(this.temp_email_err){
        this.validate_email()
      }
    }
  },
  methods:{
    validate_user: function(){
      this.$http.get(server_ip+'/auth/user_exist?username='+this.form.username).then((res)=>{
        //console.log(res)
        if(!res.data){
          this.user_error_texts = []
          return true
        }
        else{
          this.user_error_texts = ["用户名已注册！"]
          this.temp_user_err = true
          return false
        }
      })
    },
    validate_email: function(){
      console.log("valildate email "+this.form.email)
      this.$http.get(server_ip+'/auth/email_exist?email='+this.form.email).then((res)=>{
        if(!res.data){
          this.email_error_texts = []
          return true
        }
        else{
          this.email_error_texts = ["邮箱已注册！"]
          this.temp_email_err = true
          return false
        }
      })
    },
    confirm: function(v){
      //console.log(v)
      //console.log(this.form.password)
      return (v===this.form.password) || "输入的密码不一致!"
    },
    login: function(){
      console.log('logging in')
      this.$http.post(server_ip+'/auth/login', this.form, axios_config).then((res)=>{

      console.log(res)
      if(res.data.status=='success'){
        //alert(JSON.stringify(this.form));
        console.log('getting user file')
        this.$http.get(server_ip+'/user/user_profile', axios_config).then((res) =>{
          if (!res.data.user_profile)
          {
            EventBus.$emit("danger_alert","登录失败，请重试！")
            console.log(res)
          }
          else{
            console.log("add user profile to storage"+res.data.user_profile)
            this.$store.commit('update_user_profile', res.data.user_profile)
            this.$store.commit("user_exist", true)
            EventBus.$emit("success_alert","你已经成功登录！")
            this.$router.push("/initialize")
          }


        })

      }
    }).catch((err)=>{
      //alert(err)
      EventBus.$emit("danger_alert", "登录失败，请重试")
      console.log(err)
    })
  },
    reset: function(){
      this.$refs.register_form.reset()
    },
    submit: function(){
      if(!this.$refs.register_form.validate()){
        EventBus.emit("danger_alert","输入还有不合法的地方!")
        return
      }
      console.log(this.form)
      this.$http.post(server_ip+'/auth/register', this.form, axios_config).catch((err)=>{
        console.log(err)
        //alert('something is wrong, please try again!')
        EventBus.$emit("danger_alert","注册失败，请重试")
      }).then((res)=>{
        if(res.response){
          if (res.response.status == 400){
            alert(res.response.data.message)
            //console.log(res.response)
          }
        }
        else{
          console.log(res)
          //alert('welcome')
          EventBus.$emit("success_alert","注册成功！")

        }
      }).then(this.login)
    }
  }
}
</script>
