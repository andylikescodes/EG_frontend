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
        
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {EventBus} from "../../utils/event-bus"
import {server_ip, axios_config} from "../../configs/web_configs"
export default {
    mounted(){
        
        EventBus.$on("show_ongoing_order",(msg)=>{
            //console.log("hahaha")
            this.dialog = true
            this.$http.get(server_ip+"/order/ongoing",axios_config).then(res=>{
                this.order = res.data
            })
        })
        
    },
    data () {
      return {
        dialog: false,
        order: null,
        finishing: false,
        duration: null
      }
    },
    methods:{
        
    }
  }
</script>