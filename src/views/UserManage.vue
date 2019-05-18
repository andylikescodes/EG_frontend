<template>
  <div>
    <v-tabs v-model="tabs">
      <v-tab
        ripple>
        充值/消费

      </v-tab>
      <v-tab
        ripple>
        用户账户管理

      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs" touchless>
    <v-tab-item>
      <v-card flat>
        <BalanceManage></BalanceManage>
      </v-card>
    </v-tab-item>


    <v-tab-item>
      <v-card flat>
        <v-card-text>这里修改用户账户信息</v-card-text>
        <AcountInfoManage></AcountInfoManage>
      </v-card>
    </v-tab-item>
  </v-tabs-items>
  </div>
</template>
<script>
import {server_ip, axios_config} from "../configs/web_configs"
import BalanceManage from "../components/user_management/BalanceManage"
import AcountInfoManage from "../components/user_management/AcountInfoManage"
  export default {
    data: () => ({
      tabs : null
    }),
    components: {
      AcountInfoManage,
      BalanceManage
    },
    mounted(){
      this.$http.get(server_ip+"/customer_service",axios_config).then(res=>{
        console.log(res.data)
      })
    }
  }

</script>
