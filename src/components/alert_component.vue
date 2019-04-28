<template>

<div>
  <v-snackbar
     v-model="warningVisibility"
     bottom
     :timeout="warning_alert_timeout"
    multi-line
    color="warning darken-2"
   >
     {{ warning_alert_text }}
     <v-btn
       flat
       @click="close_warning"
       right
     >
       关闭
     </v-btn>
   </v-snackbar>

   <v-snackbar
      v-model="dangerVisibility"
      bottom
      :timeout="danger_alert_timeout"
     multi-line
     color="error darken-2"
    >
      {{ danger_alert_text }}
      <v-btn
        flat
        @click="close_danger"
        right
      >
        关闭
      </v-btn>
    </v-snackbar>

    <v-snackbar
       v-model="successVisibility"
       bottom
       :timeout="success_alert_timeout"
      multi-line
      color="success darken-3"
     >
       {{ success_alert_text }}
       <v-btn
         flat
         @click="close_success"
         right
       >
         关闭
       </v-btn>
     </v-snackbar>

</div>
</template>
<script>
  import { EventBus } from '../utils/event-bus';
  import {success_alert_timeout, danger_alert_timeout, warning_alert_timeout} from '../configs/app_configs'

  export default{
    data() {
      return {
        successVisibility : false,
        dangerVisibility: false,
        warningVisibility: false,
        success_alert_text: '',
        warning_alert_text: '',
        danger_alert_text: '',
        warning_alert_timeout : warning_alert_timeout,
        danger_alert_timeout : danger_alert_timeout,
        success_alert_timeout : success_alert_timeout
      }
    },
    mounted() {
      EventBus.$on("success_alert", msg => {
        this.successVisibility = true
        this.success_alert_text = msg
      })
      EventBus.$on("danger_alert", msg => {
        this.dangerVisibility = true
        this.danger_alert_text = msg
      })
      EventBus.$on("warning_alert", msg => {
        this.warningVisibility = true
        this.warning_alert_text = msg
      })
    },
    methods:{
      close_warning:function(){
        this.warningVisibility=false
      },
      close_danger:function(){
        this.dangerVisibility=false
      },
      close_success:function(){
        this.successVisibility=false
      }
    }
  }
</script>
