<template>
  <v-card
    class="mb-5"
    
  >
  <div style="max-height:50vh;overflow: auto">
  <v-list two-line >
    <v-divider></v-divider>
   <div  v-for="(employee, key) in employees" :key="key">
     <v-list-tile avatar :class="employee_list_classes[key]" @click="select_employee(key)">
       <v-list-tile-avatar>
         <img :src="employee.avatar_path">
       </v-list-tile-avatar>

       <v-list-tile-content>
         <v-list-tile-title>{{employee.username}}</v-list-tile-title>
         <v-list-tile-sub-title>{{employee.description}}</v-list-tile-sub-title>
       </v-list-tile-content>
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
    employees: [],
    employee_list_classes: [],
    selected_employee: null
  }),
  props:["onlyDiscord"],
  components: {
  },
  methods: {
    select_employee(key){
      for (let i=0;i<this.employee_list_classes.length;i++){
        if (i == key){
          this.$set(this.employee_list_classes, i, 'active_list_item')
        }
        else{
          this.$set(this.employee_list_classes, i, 'inactive_list_item')
        }
      }
      this.selected_employee = this.employees[key]
      this.$emit("selected_employee_changed", this.selected_employee)
      //console.log(this.selected_employee)
    },

  },
  mounted(){
    this.$http.get(server_ip+"/employees/list", axios_config).then(res=>{
      this.employees = res.data
      //console.log(this.employees)
      if (this.onlyDiscord){
        this.employees = this.employees.filter((x)=>{
          return !!x.discordID
        })
      }
      console.log(this.employees)
      //to make a initial employee classes list:
      let temp_list = []
      for (let i = 0; i<this.employees.length; i++){
        temp_list.push('inactive_list_item')
      }
      this.employee_list_classes=temp_list
    }).catch(err=>{console.log(err)})
  }
}
</script>

<style>
.inactive_list_item {cursor:pointer;}
.active_list_item {cursor:pointer;
background:SkyBlue;}
</style>
