<template>
  <div class="rank">
    <h1 style="text-align:center;" class="heading--text mt-3">大家的名片</h1>
      <v-container>
      <v-layout align-center="" column v-for="(member, index) in team" :key="index" >
          <v-card :color="bg_loop[index/bg_loop.length]" class="ma-1" width="700">
              <v-layout>
                <v-flex xs2>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline font-weight-bold">{{ index+1 }}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs3>
                    <img :src="compute_path(member.avatar_path)" height="100px">
                </v-flex>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{member.name}}</div>
                      </div>
                    </v-card-title>
                    <v-card-title primary-title>
                      <div>
                        <div class="subheading font-italic">{{member.description}}</div>
                      </div>
                    </v-card-title>
                    <v-card-title primary-title>
                      <div>
                        <div class="subheading">{{member.popularity}}</div>
                      </div>
                    </v-card-title>
                </v-layout>
                <v-divider light></v-divider>
            </v-card>
      </v-layout>
      </v-container>






  </div>

</template>
<script>
import {server_ip, axios_config} from "../configs/web_configs"
export default {
  data() {
    return {
      bg_loop: ['amber', 'grey lighten-1', 'brown lighten-1', 'green lighten-5'],
      team: [
    ]

    }
  },
  methods:{
    compute_path(path){
      return server_ip+path
    }
  },
  mounted(){
    this.$http.get(server_ip+"/employees/list", axios_config).then(res=>{
      this.team = res.data
    }).catch(err=>{console.log(err)})
  }
}
</script>
