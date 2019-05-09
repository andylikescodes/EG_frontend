<template>
  <div>
    <h1 class="ma-5">{{page_status}}</h1>
    <div v-if="show_password_form">
      <v-form @submit.stop.prevent="submit"
              ref="password_renew_form"
      >
    <v-layout wrap>
      <v-flex xs12 md6 mx-5>
    <v-text-field
            v-model="password"
            label="请输入密码"
            :append-icon="show_password ? 'visibility' : 'visibility_off'"
            :type="show_password ? 'text' : 'password'"
            @click:append="show_password = !show_password"
            :rules="[rules.required, rules.min]"
            required
            clearable
          ></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12 md6 mx-5>
    <v-text-field
            v-model="confirm_password"
            label="请确认密码"
            clearable
            :append-icon="show_confirm_password ? 'visibility' : 'visibility_off'"
            :type="show_confirm_password ? 'text' : 'password'"
            @click:append="show_confirm_password = !show_confirm_password"
            :rules="[confirm]"
            required
          ></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout>
      <v-spacer></v-spacer>
      <v-flex>
      <v-btn outline color = "primary" type="submit" >提交</v-btn>
      </v-flex>
    </v-layout>
    </v-form>
    </div>
  </div>

</template>

<script>
//this is a component used only for requesting the server for password renew with the token, therefore, there will be no insert to this component but from a direct email link
import {server_ip, axios_config} from "../configs/web_configs"
import { EventBus } from '../utils/event-bus.js';
export default {
  data: () => ({
    email: "",
    page_status: "请稍候...",
    password : "",
    confirm_password : "",
    show_password_form : false,
    show_password: false,
    show_confirm_password: false,
    rules: {
      required: value => !!value || '此处不能为空',
      min: v => v.length >= 8 || '密码至少要8位哦！',
      //email_match: v=> /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(v).toLowerCase()) || "email格式不正确"
    }
  }),
  computed:{

  },
  mounted(){
    var token = this.$route.query.token
    this.$http.get(server_ip+"/auth/confirm_email", {...axios_config, params:{token: token}}).then(res=>{
      if (res.data){
        this.email = res.data
        //console.log(this.email)
        this.page_status = "请输入新密码"
        this.show_password_form = true
      }
    }).catch((err)=>{
      console.log(err)
      this.page_status = "重置密码失败，可能由于确认邮件时间过长已失效，请重新申请密码重置"
    })
  },
  methods:{
    submit(){
      if(!this.$refs.password_renew_form.validate()){
        EventBus.$emit("danger_alert","输入还有不合法的地方!")
        return
      }
      this.$http.post(server_ip+"/auth/renew_password", {token: this.$route.query.token, password: this.password}).then((res)=>{
        EventBus.$emit("success_alert","修改成功")
        this.$router.push('/login')
      }).catch(err => {
        EventBus.$emit("danger_alert","修改失败")
      })
      //console.log("submit")
    },
    confirm: function(v){
      //console.log(v)
      //console.log(this.form.password)
      return (v===this.password) || "输入的密码不一致!"
    }
}}
</script>
