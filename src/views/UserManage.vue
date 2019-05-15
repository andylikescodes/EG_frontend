<template>
  <div>
    <h1>This is Customer Service page that only be visible for customer service group or above</h1>
  </div>
</template>
<script>
import {server_ip, axios_config} from "../configs/web_configs"

  export default {
    data: () => ({
    }),
    components: {
    },
    mounted(){
      this.$http.get(server_ip+"/customer_service",axios_config).then(res=>{
        console.log(res.data)
      })
    }
  }

</script>
