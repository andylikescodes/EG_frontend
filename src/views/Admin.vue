<template>
  <div>
    <v-tabs v-model="tabs">
      <v-tab
        ripple>
        添加员工

      </v-tab>
      <v-tab
        ripple>
        清除员工

      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs" touchless>
    <v-tab-item>
      <v-card flat>
        <AddEmployee></AddEmployee>
      </v-card>
    </v-tab-item>


    <v-tab-item>
      <v-card flat>
        <v-card-text>这里清除员工</v-card-text>

      </v-card>
    </v-tab-item>
  </v-tabs-items>
  </div>
</template>
<script>
import {server_ip, axios_config} from "../configs/web_configs"
import AddEmployee from "../components/AddEmployee"
  export default {
    data: () => ({
      tabs : null
    }),
    components: {
      AddEmployee
    },
    mounted(){
    }
  }

</script>
