<template>
  <div>
<div class="ma-3 text-xs-right">
  当前余额：{{balance}}
</div>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">选择一个礼物</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">选择送礼对象</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">确认信息</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">


        <GiftSelector :gifts="activated_gifts" 
        @gift_selected="update_selected_gift"/>

        <v-btn
          color="primary"
          @click="gift_selected"
        >
          继续
        </v-btn>

        <v-btn flat @click="$router.push('/gift')">取消</v-btn>

      </v-stepper-content>

      <v-stepper-content step="2">
        <EmployeeSelector
        @selected_employee_changed = "update_selected_employee"
        ></EmployeeSelector>

        <v-btn
          color="primary"
          @click="employee_selected"
        >
          继续
        </v-btn>

        <v-btn flat @click="e1=1">返回</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
        >
        <v-card-title>
          <div class="headline ">
            你选择了
          </div>
          <div class="headline pink--text text--darken-2">
            {{selected_gift_name}}
          </div>
          <div class="headline">
            将它送给
          </div>
          <div class="headline orange--text text--darken-4">
            {{selected_employee_name}}
          </div>
        </v-card-title>
          <v-card-actions>
            <v-container>
            <div class="subheading">
              选择你想告诉TA的话：
            </div>
              <v-radio-group v-model="selected_radio" :mandatory="false">
                  <v-radio v-for="(msg, key) in messages" :label="msg" :value="compute_message(key)" :key="key"></v-radio>
                  <!-- <v-radio label="爸爸!你怎么这么厉害!" value="爸爸!你怎么这么厉害!"></v-radio>
                  <v-radio label="卧槽，多亏你gay住了,不然输了!" value="卧槽，多亏你gay住了,不然输了!"></v-radio>
                  <v-radio label="人头丛中过,滴血不沾身 (╯▽╰)" value="人头丛中过,滴血不沾身 (╯▽╰)"></v-radio>
                  <v-radio label="自定义" value="self_define"></v-radio> -->
                </v-radio-group>

                <v-textarea
                v-if="selected_radio=='self_defined'"
                 maxlength="100"
              solo
              v-model="self_defined_msg"
              label="请输入"
            ></v-textarea>
            </v-container>
          </v-card-actions>

        <v-divider></v-divider>
          <v-card-text>
              <div class="headline text-xs-right">
                总价: {{total_price}}
              </div>
          </v-card-text>

      </v-card>

        <v-btn
          color="primary"
          @click="submit_gift"
        >
          确认
        </v-btn>

        <v-btn flat @click="e1=2">返回</v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>

</div>
</template>

<script>
import EmployeeSelector from "../components/EmployeeSelector"
import GiftSelector from "../components/GiftSelector"
import {server_ip, axios_config} from "../configs/web_configs"
import { EventBus } from '../utils/event-bus.js';
export default {
  components:{
    EmployeeSelector,
    GiftSelector
  },
    data: () => ({
      e1: 1,
      gifts : [],
      sell_card_colors: [],
      card_original_color : 'white',
      selected_gift: null,
      balance : 0,

      selected_employee: null,
      messages: [
        "爸爸!你怎么这么厉害!",
        "卧槽，多亏你gay住了,不然输了!",
        "人头丛中过,滴血不沾身 (╯▽╰)",
        "自定义"
      ],
      selected_radio:"",
      self_defined_msg:"",
      selected_message:"",
      loading : false
    }),
    watch:{
    },
    self_defined_msg(val){
      this.selected_message = val
      console.log(this.selected_message)
    },
    computed:{
      total_price(){
        if (!this.selected_gift) return 0
        else return this.selected_gift.price
      },
      selected_gift_name(){
        if(this.selected_gift) return this.selected_gift.name
        else return ""
      },
      selected_employee_name(){
        //console.log(this.selected_employee)
        if(this.selected_employee) return this.selected_employee.username
        else return ""
      }

    },
    mounted (){
      
      this.$http.get(server_ip+"/user/balance", axios_config)
      .then(res=>{
        this.balance = res.data.balance
      }).catch(err=>{
        console.log(err)
      });
    },
    methods:{
      reset_sell_card_color(){
        let tmp_list = []
        for (let i=0; i<this.sell_card_colors.length; i++){
          tmp_list.push(this.card_original_color)
        }
        this.sell_card_colors=tmp_list
      },
      set_selected_card(key){
        this.$set(this.sell_card_colors, key, 'pink lighten-4')
      },
      card_clicked: function(key){
        // console.log("clicked "+key)
        // console.log(this.$refs['sell_card'+1])
        this.reset_sell_card_color()
        this.set_selected_card(key)
        this.selected_gift = this.activated_gifts[key]
        //console.log(this.selected_gift)
        //this.$refs['sell_card'+key][0].color="pink lighten-4"
      },
      compute_path: function(path){
        return server_ip+path
      },
      send_gift: function(){
        this.$http.post(server_ip+'/gift/send_gift', {giftid:this.selected_gift._id, to_id:this.selected_employee._id, message:this.selected_message}, axios_config).then((res)=>{
          //console.log('sent gift')
          console.log(res.data)
          EventBus.$emit("success_alert","送礼成功")
          this.$router.push("/gift")
          EventBus.$emit("not_loading","")
          this.loading = false
        }).catch((err)=>{
          //alert(err)
          console.log(err.data)
          EventBus.$emit("not_loading","")
          this.loading = false
        })
      },
      gift_selected(){
        if(!this.selected_gift){
          EventBus.$emit("danger_alert", "请选择礼物！")
          return
        }
        if (this.selected_gift.price>this.balance){
          EventBus.$emit("danger_alert","你的余额不足，请充值")
          return
        }
        this.e1 = 2
      },
      update_selected_employee(employee){
        this.selected_employee = employee
      },
      update_selected_gift(gift){
        this.selected_gift = gift
      },
      employee_selected(){
        if (!this.selected_employee){
          EventBus.$emit("danger_alert", "请选择一个送礼对象！")
          return
        }
        this.e1=3;
      },
      compute_message(key){
        let l = this.messages.length
        if(key == l-1){return "self_defined"}
        else return this.messages[key]
      },
      submit_gift(){
        if (this.loading){
          console.log("page is busy")
          return
        }
        if(!this.selected_radio){
          EventBus.$emit("danger_alert","请选择或者输入一句想说的话！")
          return
        }
        this.loading = true
        if(this.selected_radio == "self_defined") this.selected_message = this.self_defined_msg
        else this.selected_message = this.selected_radio
        console.log(this.selected_message)
        EventBus.$emit("loading","")
        this.send_gift()
      }
    }
  }

</script>
<style>
.sell_card {cursor: pointer;}
</style>
