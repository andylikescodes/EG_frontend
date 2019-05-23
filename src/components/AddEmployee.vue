<template>
<div>
<v-container ma-4>
  <p>
    这里可以快速添加员工，输入员工的邮箱地址，系统会自动向员工发送一封邮件，员工更具邮件提供的地址注册自己的信息。
  </p>
  <v-layout wrap>
    <v-flex xs12 md4>
      <v-text-field label="请输入员工邮箱" v-model="email">

      </v-text-field>
    </v-flex>
    <v-flex>
      <v-btn @click="submit" color="primary">发送邮件</v-btn>
    </v-flex>
  </v-layout>
</v-container>
</div>
</template>
<script>
import {server_ip, axios_config} from "../configs/web_configs"
import {EventBus} from "../utils/event-bus"
  export default {
    data () {
      return {
        email:'',
        loading : false
      }
    },
    methods:{
      submit(){
        if (this.loading ) return
        this.loading = true
        EventBus.$emit("loading")
        this.$http.get(server_ip+"/admin/register_employee", {...axios_config,params:{email: this.email}}).then(res=>{
          this.loading = false
          EventBus.$emit("not_loading")
          EventBus.$emit("success_alert","已发送邮件给该用户！")
        }).catch(err=>{
          this.loading = false
          EventBus.$emit("not_loading")
        })
      }
    }
  }
</script>
