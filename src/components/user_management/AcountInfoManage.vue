<template>
  <v-card class="mx-4 pa-4">

    <v-layout row wrap>
      <v-flex xs12 md5>
    <v-text-field
      v-model="user.username"
      label="用户名"
      :disabled = "username_disabled"
      @keyup.enter = "search_user('username')"
    ></v-text-field>
    </v-flex>
    <v-flex xs4 md4><v-btn small flat color="pink darken-2" @click="search_user('username')" :disabled = "username_disabled">通过用户名检索用户</v-btn></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md5>
    <v-text-field
      v-model="user.email"
      label="邮箱"
      :disabled="email_disabled"
      @keyup.enter = "search_user('email')"
    ></v-text-field>
  </v-flex>
  <v-flex xs4 md4><v-btn small flat color="pink darken-2" @click="search_user('email')" :disabled = "username_disabled">通过邮箱检索用户</v-btn></v-flex>
  </v-layout>
  <v-card>
    <v-tabs v-model="tabs">
      <v-tab
        ripple>
        修改用户信息

      </v-tab>
      <v-tab
        ripple>
        重置用户密码

      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs" touchless>
    <v-tab-item>
<v-form @submit.stop.prevent="submit">
  <v-layout>
    <v-flex mx-2 xs6 md3>
      <v-text-field
        v-model="user.birthday"
        type="date"
        label="生日"
      ></v-text-field>
    </v-flex>
    <v-flex mx-2 xs6 md2>
      <v-text-field
        v-model="user.city"
        label="城市"
      ></v-text-field>
    </v-flex>
  </v-layout>
  <v-layout>
    <v-textarea
    label="签名"
    v-model="user.signature"
    rows="2"
    outline
    >
    </v-textarea>
  </v-layout>
    <v-layout>
      <v-textarea
      label="资料"
      v-model="user.profile"
      rows="4"
      outline
      >
      </v-textarea>
    </v-layout>
    <v-btn type="submit" large color="primary">确认更改</v-btn>
    <v-btn @click.stop.prevent="clear" large color="warning" outline>清空</v-btn>

  </v-form>
  </v-tab-item>
  <v-tab-item>
      <v-card>
      <v-layout wrap>
        <v-flex mx-2 xs12 md4>
          <v-text-field
            v-model="password"
            label="输入新密码"
          ></v-text-field>
        </v-flex>
        <v-flex mx2 xs4 md4>
          <v-btn @click="reset_password" small color="error">
            重置密码
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>

  </v-tab-item>
</v-tabs-items>
  </v-card>

  </v-card>
</template>

<script>
import {server_ip, axios_config} from "../../configs/web_configs"
import { EventBus } from '../../utils/event-bus';
  export default {
    data: () => ({
      tabs: null,
      password:'',
      reset_user:{
        userid: null,
        username: '',
        email:''
      },
      user:{
        userid: null,
        username: '',
        email:''
      },
      email_disabled:false,
      username_disabled: false
    }),
    watch:{
      "user.userid":function(val){
        if (val){
          this.email_disabled=true
          this.username_disabled=true
        }
        else{
          this.email_disabled=false
          this.username_disabled=false
        }
      }
    },
    mounted(){

    },
    computed: {

    },

    methods: {
      search_user(search_type){
        this.$http.get(server_ip+"/customer_service/get_user", {...axios_config,params: {type:search_type, username:this.user.username,email:this.user.email}}).then(res=>{
          if (res.data) this.user=res.data
          else {
            EventBus.$emit("danger_alert","用户不存在")
            this.clear()
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      submit () {
        if (!this.user.userid){
          EventBus.$emit("danger_alert","请先输入用户名或邮箱检索用户")
          return
        }
        this.$http.post(server_ip+'/customer_service/update_user', this.user, axios_config).then((res)=>{
          if (res.data == 'success'){
            EventBus.$emit("success_alert","成功更改资料")
            this.clear()
          }
          else{
            EventBus.$emit("danger_alert","更新失败")
          }
        }).catch(err=>{
          EventBus.$emit("danger_alert","系统出错")
        })
      },
      reset_password(){
        if(!this.password){
          EventBus.$emit("danger_alert", "请输入密码")
          return
        }
        if (!this.user.userid){
          EventBus.$emit("danger_alert", "请先在顶部面板检索用户")
          return
        }
        this.$http.post(server_ip+"/customer_service/reset_password", {email: this.user.email, password: this.password}, axios_config).then(res=>{
          if (res.data == "success"){
            EventBus.$emit("success_alert", "成功更新密码")
            this.password = ""
            this.clear()
          }
          else{
            EventBus.$emit("danger_alert", "未知错误")
          }
        }).catch(err=>{
          console.log(err)
          EventBus.$emit("danger_alert", "更新失败")
        })
      },
      clear () {
        this.user = Object.assign({},this.reset_user)

      }
    }
  }
</script>
