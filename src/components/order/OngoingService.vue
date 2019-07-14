<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>进行中的订单</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title>
          <div>
            <h2 class="headline ma-3">您正在与{{order?order.to.username:''}}愉快的玩耍</h2>
            <div class="title ma-3"> 订单结束后，请务必点击"结束订单"报单，否则订单将会处于进行中状态，您将无法获得新的订单 </div>
          </div>
        </v-card-title>
        <v-layout v-if="finishing" ma-3 wrap>
            <v-flex xs12 md2 mx-4>
                <v-subheader>订单时长</v-subheader>
                <v-text-field v-model="duration" type="Number" solo label="订单时长"></v-text-field>
            </v-flex>
            <v-flex xs12 md2 mx-4>
                <v-subheader>小时单价</v-subheader>
                <v-text-field v-model="unit_price" type="Number" solo label="小时单价"></v-text-field>
            </v-flex>
        </v-layout>
         <v-card-actions>
          <v-btn  color="primary" class="ma-3" @click="finish_order">结束订单</v-btn>
          <v-btn v-if="finishing" color="warning" class="ma-3" @click="finishing=false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {EventBus} from "../../utils/event-bus"
import {server_ip, axios_config} from "../../configs/web_configs"
export default {
    mounted(){
        
        EventBus.$on("show_ongoing_duty",(msg)=>{
            //console.log("hahaha")
            this.dialog = true
            this.$http.get(server_ip+"/order/ongoing_duty",axios_config).then(res=>{
                this.order = res.data
            })
        })
        
    },
    data () {
      return {
       dialog: false,
        order: null,
        finishing: false,
        duration: null,
        unit_price: 22
      }
    },
    methods:{
        finish_order(){
            if(!this.finishing){
                this.finishing=true
                return 
            }
            if(!this.duration){
                EventBus.$emit("danger_alert","你还没有输入时长")
                return
            }
            if(!/^\+?(0|[1-9]\d*)$/.test(this.duration)){
                EventBus.$emit("danger_alert","你输入的时长不合法，请确保是正整数")
                return
            }
            if(!/^\+?(0|[1-9]\d*)$/.test(this.unit_price)){
                EventBus.$emit("danger_alert","你输入的单价不合法，请确保是正整数")
                return
            }
            if(!this.unit_price){
                EventBus.$emit("danger_alert","你没有输入订单单价")
                return
            }
            this.$http.post(server_ip+"/order/end_duty", {
                duration: this.duration,
                unit_price: this.unit_price
            }, axios_config).then(res=>{
                if (res.data == "success")
                {
                    EventBus.$emit("success_alert", "订单结束成功！")

                    setTimeout(function () {
                        window.location.reload(false)
                    }, 1000);

                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
  }
</script>