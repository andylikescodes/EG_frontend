<template>
  <div class="text-xs-center" v-if="length>1">
    <v-pagination
      v-model="page"
      :length="length"
      :total-visible="4"
    ></v-pagination>
  </div>
</template>
<script>
import {server_ip, axios_config} from "../configs/web_configs"
  export default {
    props: ['requestLengthPath', 'itemsPerPage'],
    mounted(){
      this.$http.get(server_ip+this.requestLengthPath,  {axios_config}).then(res=>{
        //console.log(res.data.length)
        //console.log(this.itemsPerPage)
        this.length = Math.ceil(res.data.length/this.itemsPerPage)

      }).catch(err=>{
        console.log(err)
      })
    },
    watch:{
      page(val){
        //console.log(val)
        this.$emit("page_changed", val)
      }
    },
    data () {
      return {
        page: 1,
        length: 1
      }
    },
  }
</script>
