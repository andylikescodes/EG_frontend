<template>
  <div>




    <v-container>
      <v-btn @click.prevent="send_gift" fab dark fixed color="warning" style="top:12%" top right class="mx-5"> <v-icon> fa-gift</v-icon></v-btn>
      <v-layout wrap>
        <v-flex xs12 md9 offset-md1 ma-2  v-for="gift in gift_histories" :key="gift._id">
          <GiftCard :gift-image-path="gift.gift.figure_path" :gift-name="gift.gift.name" :from-name="gift.from_user.username" :to-name="gift.to_employee.username" :time="get_time(gift.createdAt)" :message="gift.message"></GiftCard>
        </v-flex>
      </v-layout>
    </v-container>

    <Pagination request-length-path="/gift_history/length" :items-per-page="items_per_page" v-on:page_changed="page_changed"></Pagination>
  </div>

</template>
<script>
import {server_ip, axios_config} from "../configs/web_configs"
import {format_time} from "../utils/time"
import Pagination from "../components/Pagination.vue"
import GiftCard from "../components/GiftCard.vue"
import { EventBus } from '../utils/event-bus';
export default {
  components:{
    Pagination,
    GiftCard
  },
    data: () => ({
      gift_histories: [],
      items_per_page: 10
    }),
    computed:{
    },
    mounted (){
      this.$http.get(server_ip+'/gift_history',  {...axios_config, params: {start_idx: 0, end_idx:this.items_per_page}}).then((res)=>{
        this.gift_histories = res.data
        console.log(this.gift_histories)
      }).catch(err =>{
        console.log(err.data)
      })
    },
    methods:{
      page_changed(val){
        //console.log('page changed '+val)
        let start_idx = (val-1)*this.items_per_page
        let end_idx = start_idx + this.items_per_page
        this.$http.get(server_ip+'/gift_history',  {...axios_config, params: {start_idx, end_idx}}).then((res)=>{
          this.gift_histories = res.data
        }).catch(err =>{
          console.log(err.data)
        })
      },
      get_time(time){
        return format_time(time)
      },
      send_gift(){
        this.$router.push("give_gift")
      }
    }
  }

</script>
