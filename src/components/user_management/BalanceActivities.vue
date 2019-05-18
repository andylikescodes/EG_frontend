<template>
  <v-expansion-panel>
  <v-expansion-panel-content>
    <template v-slot:header>
    <div>转账记录</div>
  </template>
    <v-data-table
    :headers="activity_list_headers"
    :items="activities"
    class="elevation-1"
    :pagination.sync="pagination"
    >
  <template v-slot:no-data>
  <v-alert :value="true" color="error" icon="warning">
    没有历史转账数据
  </v-alert>
  </template>
  <template v-slot:items="props">
  <td>{{ props.item.time }}</td>
  <td class="text-xs-right">{{ props.item.amount }}</td>
  <td class="text-xs-right">{{ props.item.description }}</td>
  <td class="text-xs-right">{{ props.item.resulted_total }}</td>
  <td class="text-xs-right">{{ props.item.status }}</td>
  <td class="text-xs-right">{{ props.item.customer_service_name }}</td>
  </template>
  </v-data-table>
  </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import {server_ip, axios_config} from "../../configs/web_configs"
import {UTC2Local} from "../../utils/time"
//import { EventBus } from '../../utils/event-bus';
  export default {
    data(){
      return {
        pagination: {
          sortBy: 'time',
          descending: true
        },
        activity_list_headers: [
          {
            text: '时间',
            align: 'left',
            value: 'time'
          },
          { text: '数额',value: 'amount' },
          { text: '详细', sortable: false,  value: 'description' },
          { text: '余额', sortable: false, value: 'resulted_total' },
          { text: '状态', sortable: false,  value: 'status' },
          { text: '转账员', sortable: false,  value: 'customer_service_name' }
        ],
        activities:[]
      }
    },
    props: ["userid"],
    mounted(){
      if (this.userid){
        this.renew_activities()
      }
    },
    watch:{
      userid: function(val){
        if (val){
          this.renew_activities()
        }
      }
    },
    methods:{
      renew_activities(){
        this.$http.get(server_ip+"/customer_service/transaction_histories", {...axios_config,params:{userid:this.userid}}).then(res=>{
          let temp = res.data.map(function(x){
            x.time = UTC2Local(x.time)
            return x
          })
          this.activities = temp
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>
