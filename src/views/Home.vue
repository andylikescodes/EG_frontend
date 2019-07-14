<template>
  <div>
    <v-alert
      v-model="ongoing_order"
      outline
      @click="show_ongoing_order"
      type="info"
    >
      你有一个订单正在进行中，点击查看
    </v-alert>
    <v-alert
      v-model="ongoing_duty"
      outline
      @click="show_ongoing_duty"
      type="info"
    >
      你有一个订单正在进行中，点击查看
    </v-alert>
    <HelloWorld />
    <OngoingOrder/>
    <OngoingDuty/>
  </div>
  <!-- <div v-else>
    <Login></Login>
  </div> -->

</template>

<script>
  import HelloWorld from '../components/HelloWorld'
  import {EventBus} from "../utils/event-bus"
  import {mapGetters} from 'vuex'
  import OngoingOrder from "../components/order/OngoingOrder"
  import OngoingDuty from "../components/order/OngoingService"
  export default {
    data () {
      return {
        
      }
    },
    mounted(){
    },
    computed:{
      ...mapGetters({
        logged_in: "logged_in",
        user_profile:"user_profile"
      }),
      ongoing_order(){
       // console.log(this.user_profile.user_profile)
        return !!this.user_profile.ongoingOrder
      },
      ongoing_duty(){
        return !! this.user_profile.ongoingDuty
      }
    },
    components: {
      HelloWorld,
      OngoingOrder,
      OngoingDuty
    },
    methods:{
      show_ongoing_order(){
        //console.log("show ongoing order")
        EventBus.$emit("show_ongoing_order","")
      },
      show_ongoing_duty(){
        //console.log("show ongoing order")
        EventBus.$emit("show_ongoing_duty","")
      }
    }
  }
</script>
