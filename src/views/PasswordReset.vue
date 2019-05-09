<template>
  <div>
    <h1 class="ma-5">密码重置</h1>
    <v-form @submit.stop.prevent="submit"
            ref="password_reset_email"
    >
    <v-layout wrap>
      <v-flex xs12 md6 mx-5>

    <v-text-field
            v-model="email"
            label="请输入邮箱"
            :rules="[rules.required, rules.email_match]"
            clearable
          ></v-text-field>

        </v-flex>
    </v-layout>
    <v-layout>
      <v-spacer></v-spacer>
      <v-flex>
      <v-btn outline color = "primary" type="submit">提交</v-btn>
      </v-flex>
    </v-layout>
    </v-form>
  </div>

</template>

<script>
//import {mapGetters} from 'vuex'
import {server_ip, axios_config} from "../configs/web_configs"
import { EventBus } from '../utils/event-bus.js';
export default {
  data: () => ({
    email: "",
    rules: {
      required: value => !!value || '此处不能为空',
      email_match: v=> /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(v).toLowerCase()) || "email格式不正确"
    }
  }),
  computed:{

  },
  methods:{
    submit(){
      if(!this.$refs.password_reset_email.validate()){
        EventBus.$emit("danger_alert","输入还有不合法的地方!")
        return
      }
      this.$http.get(server_ip+'/auth/email_exist?email='+this.email).then((res)=>{
        console.log(res.data)
        if(res.data){
          this.$http.get(server_ip+"/auth/forget_password", {...axios_config, params:{email: this.email}}).then(()=>{
            EventBus.$emit("success_alert", "你已提交密码修改申请，请查收邮件")
          }).catch(()=>{
            EventBus.$emit("danger_alert", "提交失败，系统错误！")
          })
        }
        else{
          EventBus.$emit("danger_alert","这个邮箱并没有被注册过！")
          return false
        }
      })

    }
  }

}
</script>
