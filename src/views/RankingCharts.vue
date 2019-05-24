<template>
  <div class="rank">
    <!-- <h1 style="text-align:center;" class="heading--text mt-3">大家的名片</h1> -->
      <v-container>
      <v-layout wrap justify  >
        <v-flex xs12 md2 ma-2 v-for="(member, index) in team" :key="index">
        <EmployeeNameCard bg_color="white" :member="member">
        </EmployeeNameCard>
        </v-flex>
      </v-layout>
      </v-container>
  </div>

</template>
<script>
import {server_ip, axios_config} from "../configs/web_configs"
import EmployeeNameCard from "../components/EmployeeNameCard.vue"
export default {
  components: {EmployeeNameCard},
  data() {

    return {
      //bg_loop: ['amber', 'grey lighten-1', 'brown lighten-1', 'green lighten-5'],
      team: [
    ]

    }
  },
  methods:{
    // compute_path(path){
    //   return server_ip+path
    // }
  },
  mounted(){
    this.$http.get(server_ip+"/employees/list", axios_config).then(res=>{
      this.team = res.data
    }).catch(err=>{console.log(err)})
  }

}
</script>
