<template>
  <div>
    <v-layout mx-4 mt-3 justify-space-around wrap>
      <v-flex xs12 md4>
      <v-text-field
            v-model = input_username
            large
            label="输入用户名"
            @keyup.enter="click_username_input"
          ></v-text-field>
        </v-flex>

      <v-flex xs12 md4>
        <v-btn right large color='primary' @click.stop="click_username_input" > 确认 </v-btn>
      </v-flex>

    </v-layout>
    <v-layout>
    <v-flex xs12 md6 offset-md1>
    <div class="ma-4" v-if="show_userinfo" >
      <p>
        <strong> UID：</strong> <span>{{user.userid}}</span>
      </p>
      <p>
        <strong> 用户名：</strong> <span>{{user.username}}</span>
      </p>
      <p>
        <strong> 邮箱：</strong> <span>{{user.email}}</span>
      </p>
      <p>
        <strong> 余额：</strong> <span>${{user.balance}}</span>
      </p>
      <p>
        <strong> groupID ：</strong> <span>{{user.groupid}}</span>
        <br >
        <span class="grey--text">(用户组对应如下：1:普通用户; 2:VIP; 3:陪玩人员; 4:客服; 5:管理员)</span>
      </p>
      <p class="red--text text--darken-1">
        *请确认客户信息无误！
      </p>
    </div>



    </v-flex>

    </v-layout >
    <div v-if="show_userinfo">
      <v-layout ma-4>
        <v-flex>
      <BalanceActivities ref="balance_activities" :userid="userid"></BalanceActivities>
    </v-flex>
      </v-layout>
    <v-layout mx-4 mt-3 wrap>
      <v-flex xs12 md4 offset-md1>
      <v-text-field
            v-model = incremental_balance_ammount
            large
            label="输入充值或扣除金额 (充值填正数，扣除金额填负数)"
            type="number"
            prefix="$"
            @focus="$event.target.select()"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout mx-4 mt-3 wrap>
        <v-flex xs12 md4 offset-md1>
        <v-textarea
        label="备注:"
        v-model="description"
        box
        @focus="$event.target.select()"
        >

        </v-textarea>
      </v-flex>
      </v-layout>
      <v-layout mx-4 mt-3 justify-space-around wrap>
      <v-flex xs12 md4>
        <v-btn right large color='primary' @click.stop="click_submit_balance_change"> 提交充值/消费信息 </v-btn>
      </v-flex>
    </v-layout>

  </div>
  </div>
</template>
<script>
import {server_ip, axios_config} from "../../configs/web_configs"
import { EventBus } from '../../utils/event-bus';
import BalanceActivities from './BalanceActivities'
  export default {
    components: {BalanceActivities},
    props: [],
    mounted(){
    },
    watch:{
    },
    computed:{
    },
    data () {
      return {
        input_username: null,
        user: null,
        userid: null,
        show_userinfo: false,
        description: "客服修改金额 (充值/扣值)",
        default_descriptiion: "客服修改金额 (充值/扣值)",
        //rules: {number: value => {console.log(this.incremental_balance_ammount);console.log(!isNaN(value)); return !isNaN(value) || '必须是数字'}},
        incremental_balance_ammount: 0,
        loading: false,

      }
    },
    methods:{
      click_username_input(){
        if (!this.input_username)
        {
          EventBus.$emit("danger_alert","请先输入一个用户名！")
          return
        }

        //console.log(this.input_username)
        this.$http.get(server_ip+'/customer_service/user_profile', {...axios_config, params:{username: this.input_username}}).then((res)=>{
          if (res.data.status && res.data.status=="not_exist"){
            EventBus.$emit("danger_alert", "该用户不存在！")
            return
          }
          //console.log(res.data)

          this.user = res.data
          this.userid = this.user.userid
          this.show_userinfo = true
        })
      },
      click_submit_balance_change(){
        if (!this.incremental_balance_ammount){
          EventBus.$emit("danger_alert","请检查你的输入是否正确")
          return
        }
        if (this.loading) {
          console.log("wait for loading")
          return
        }
        this.loading = true
        EventBus.$emit("loading")
        this.$http.post(server_ip+"/customer_service/add_transaction",
        {
          userid:this.user.userid,
          amount:this.incremental_balance_ammount,
          description:this.description}, axios_config).then((res)=>{
            this.user = res.data
            this.$refs.balance_activities.renew_activities()
            this.description = this.default_descriptiion
            this.incremental_balance_ammount = 0
            this.loading = false
            EventBus.$emit("not_loading")
            EventBus.$emit("success_alert","账户更改成功！")
          }).catch(err=>{
            console.log(err)
            this.loading = false
            EventBus.$emit("not_loading")
            EventBus.$emit("danger_alert","系统错误！")
          })
      }
    }
  }
</script>
