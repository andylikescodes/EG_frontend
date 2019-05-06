<template>
  <div>

      <v-btn @click.prevent="send_gift" fab dark color="warning" absolute right top class="ma-5"> <v-icon> fa-gift</v-icon></v-btn>


    <v-container>
      <v-layout wrap>
        <v-flex xs12 md9 offset-md1 ma-2  v-for="gift in gift_histories">
          <GiftCard :gift-image-path="gift.gift_path" :gift-name="gift.gift_name" :from-name="gift.username" :to-name="gift.employee_name" :time="gift.time" :message="gift.message"></GiftCard>
        </v-flex>
      </v-layout>
    </v-container>

    <Pagination request-length-path="/gift_history/length" :items-per-page="items_per_page" v-on:page_changed="page_changed"></Pagination>
  </div>
</template>
<script>
import {server_ip, axios_config} from "../configs/web_configs"
import Pagination from "../components/Pagination.vue"
import GiftCard from "../components/GiftCard.vue"
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
      send_gift(){
        this.$router.push("give_gift")
      }
    }
  }

</script>
