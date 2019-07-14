<template>
  <div class="rank">
    <!-- <h1 style="text-align:center;" class="heading--text mt-3">大家的名片</h1> -->
      <v-container>
      <v-btn @click="booking_dialog=true" icon top right fixed fab style="top:12%" color="primary"><v-icon dark>fa-calendar-check</v-icon></v-btn>
      <v-layout wrap justify  >
        <v-flex xs12 ma-2 v-for="(member, index) in team" :key="index">
        <EmployeeNameCard bg_color="white" :member="member">
        </EmployeeNameCard>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
    <v-dialog v-model="booking_dialog" fullscreen persistent hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="booking_dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>创建订单</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="submit_order"><v-icon left>check</v-icon>确定</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-container>
          <v-layout wrap>
            <v-flex>
              <v-checkbox v-model="random_pick" label="随机分配小姐姐"></v-checkbox>
              <EmployeeSelector v-show="!random_pick" :onlyDiscord="true"/>
              
            </v-flex>
            
          </v-layout>
          <v-layout>
            <v-flex>
              <v-radio-group v-model="time_radios" :mandatory="false" label="选择时长：">
                <v-radio label="一个小时" :value="1"></v-radio>
                <v-radio label="两个小时" :value="2"></v-radio>
                <v-radio label="其他时间" :value="-2"></v-radio>
                <v-text-field v-model="time_choosed" v-if="time_radios==-2" label="输入时间" type="number"></v-text-field>
                <v-radio label="玩爽为止" :value="-1"></v-radio>
              </v-radio-group>
            </v-flex>
            
          </v-layout>
          <v-divider/>
        <div class="title text-xs-right mt-2">账户余额: <span class="green--text text--darken-2 text-xs-right">{{this.user_profile.balance}}</span></div>
        <div class="title text-xs-right mt-2">总价: <span class="green--text text--darken-2 text-xs-right">{{total_price}}</span></div> 
        <div class="subheading mt-2 grey--text">*注：总价预估价格，实际价格以陪玩结单时的报单为准 </div> 
        <div class="subheading mt-2 grey--text">**注：目前APP下单默认客户下的LOL单 </div> 
          <v-layout>
            <v-flex>
              <v-btn color="primary" @click="submit_order">确定</v-btn>
            </v-flex>
            <v-flex>
              <v-btn color="warning" @click="booking_dialog=false">取消</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
        
      </v-card>
    </v-dialog>
      </v-layout>
      </v-container>
  </div>

</template>
<script>
import {server_ip, axios_config} from "../configs/web_configs"
import EmployeeNameCard from "../components/EmployeeNameCard.vue"
import EmployeeSelector from "../components/EmployeeSelector"
import {EventBus} from "../utils/event-bus"
import {mapGetters} from "vuex"
export default {
  components: {EmployeeNameCard, EmployeeSelector},
  data() {

    return {
      time_radios: null,
      time_choosed: "",
      booking_dialog: false,
      random_pick: true,
      //bg_loop: ['amber', 'grey lighten-1', 'brown lighten-1', 'green lighten-5'],
      team: [
    ]

    }
  },
  computed:{
    ...mapGetters({user_profile:"user_profile"}),
    total_price(){
      if (this.time_radios == -1){
        return "打完再说"
      }
      else{
        return this.total_time*20
      }
    },
    total_time(){
      if (this.time_radios ==1 || this.time_radios==2){
        return this.time_radios
      }
      else if (this.time_radios == -2){
        if (!isNaN(this.time_choosed))
          return this.time_choosed
        else return 0
      }
      else if (this.time_radios == -1) return null
      else return 0
    },
    
  },
  methods:{
    // compute_path(path){
    //   return server_ip+path
    // }
    submit_order(){
      if (!this.total_price){
        EventBus.$emit("danger_alert", "输入有误,请检查")
        return
      }
      var order_config = {from: this.user_profile._id}

      if (this.total_time){
        order_config.duration = this.total_time
      }
      this.$http.post(server_ip+"/order/add", order_config, axios_config)
      .then(res=>{
        if (res.data == "success"){
          EventBus.$emit("success_alert", "我已经向大家广泛征求订单了，请保持Discord畅通，您的陪玩已经上路！")
        }
      })
      .catch(err=>{
        EventBus.$emit("danger_alert","系统错误！")
        console.log(err)
      })
    }
  },
  mounted(){
    this.$http.get(server_ip+"/employees/list", axios_config).then(res=>{
      this.team = res.data
    }).catch(err=>{console.log(err)})
  },
  watch:{
    random_pick(val){ // a temporary method to disable directional order because it's not ready yet
      console.log(val)
      if (!val){
        // EventBus.$emit("danger_alert", "目前暂时只支持随机订单！")
        alert("目前暂时只支持随机订单！")
        this.$nextTick(()=>{
           this.random_pick = true
         })
        
      }
    },
    time_choosed(val){
      console.log("aaa")
      if(val<0){
        EventBus.$emit("danger_alert", "请输入大于0的数！")
        this.$nextTick(()=>{
          this.time_choosed=""
        })
        
      }
      else{
        return
      }
      
    },
    time_radios(val){
      console.log(val)
      if (val==-1 && this.user_profile.balance<50){
        EventBus.$emit("danger_alert","账户余额超过50才能玩到爽！")
        this.time_radios=null
      }
      
    },
    total_price(val){
      if(val>this.user_profile.balance){
          EventBus.$emit("danger_alert","你的余额不足！")
          this.time_radios=null
          this.time_choosed = "0"
        }
    }
  }

}
</script>
