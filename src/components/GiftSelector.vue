<template>
  <v-card
    class="mb-5"
    
  >
  <div style="height:45vh;overflow: auto">
  <v-list three-line >
    <v-divider></v-divider>
   <div  v-for="(gift, key) in activated_gifts" :key="key">
     <v-list-tile avatar :class="gift_list_classes[key]" @click="select_gift(key)">
       <v-list-tile-avatar>
         <img :src="compute_path(gift.figure_path)">
       </v-list-tile-avatar>

       <v-list-tile-content>
         <v-list-tile-title>{{gift.name}}</v-list-tile-title>
         <v-list-tile-sub-title>{{gift.description}}</v-list-tile-sub-title>
       </v-list-tile-content>
       <v-list-content>
           <v-list-title>售价：{{gift.price}}</v-list-title>
       </v-list-content>
     </v-list-tile>
    
   </div>
   <v-divider></v-divider>
  </v-list>
  </div>
  </v-card>
</template>

<script>
import {server_ip, axios_config} from "../configs/web_configs"
import { EventBus } from '../utils/event-bus.js';
export default {
  data: () => ({
      gift_list_classes: [],
      selected_gift: null,
      gifts: [],
      //activated_gifts: []
  }),
  components: {
  },
  methods: {
    select_gift(key){
      for (let i=0;i<this.gift_list_classes.length;i++){
        if (i == key){
          this.$set(this.gift_list_classes, i, 'active_list_item')
        }
        else{
          this.$set(this.gift_list_classes, i, 'inactive_list_item')
        }
      }
      this.selected_gift = this.activated_gifts[key]
      this.$emit("gift_selected", this.selected_gift)
      console.log(this.gift_list_classes)
      //console.log(this.selected_employee)
    },
    compute_path: function(path){
        return server_ip+path
      },
  },
  computed:{
      activated_gifts(){
        return this.gifts.filter((x)=>{
          return x.activated
        })
      }
  },
  mounted(){
      this.$http.get(server_ip+"/gift/list", axios_config).then(res=>{
        this.gifts = res.data
        let temp_list = []
        for (let i=0; i<=this.activated_gifts.length;i++){
          this.gift_list_classes.push("inactive_list_item")
        }
        //console.log(this.gift_list_classes)
        console.log(this.gifts)
        console.log(this.activated_gifts)
        //console.log(this.sell_card_colors)
      }).catch((err)=>{
        console.log(err)
      });
      
  }
}
</script>

<style>
.inactive_list_item {cursor:pointer;}
.active_list_item {cursor:pointer;
background:SkyBlue;}
</style>