<template>
  <div class="text-xs-center">
    
    <v-dialog
      v-model="dialog"
      max-height="80vh"
      max-width="80vw"
    >
      
      <v-card

      
      >
        <v-img :src="img_src" >
          <v-layout row justify-end>
          <v-btn icon @click.stop="click_download">
          <v-icon color="yellow">fa-save</v-icon>
          </v-btn>
          </v-layout>
        </v-img>
      </v-card>
     
    </v-dialog>
     
  </div>
</template>

<script>
import {downloadURI} from "../utils/other_utils"
  export default {
    props:["value", "img_src"],
    watch:{
      value:function(val){
        
        this.dialog=val
      },
      dialog:function(val){
        this.$emit("input", val)
      }
    },
    data () {
      return {
        dialog:false
      }
    },
    methods:{
      click_download(){
        name = new Date().getTime()
        downloadURI(this.img_src, "ETC-"+ name)
      }
    }
  }
</script>