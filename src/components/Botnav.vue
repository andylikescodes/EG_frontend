<template>
<v-bottom-nav
     id="botnav"
     :active.sync="bottomNav"
     :color="bg_color"
     :value="true"
     shift
     fixed
     app
   >
     <v-btn @click="$router.push('/home')">
       <span class="default-font">大厅</span>
       <v-icon>fa-home</v-icon>
     </v-btn>

     

     <v-btn  @click="$router.push('/rankingchart')">
       <span class="default-font">名牌</span>
       <v-icon>fa-address-book</v-icon>
     </v-btn>
     
     <v-btn @click="$router.push('/posts')">
       <span class="default-font">吧台</span>
       <v-icon>fa-user-friends</v-icon>
     </v-btn>

     <v-btn @click="$router.push('/profile')">
       <span class="default-font">自己</span>
       <v-icon>fa-user</v-icon>
     </v-btn>
     
     <!-- <v-btn @click="$router.push('/setting')">
       <span class="default-font">设置</span>
       <v-icon>fa-cog</v-icon>
     </v-btn> -->
   </v-bottom-nav>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        bottomNav: void(0)
      }
    },
    mounted(){
      this.update_route_change(this.$route.path)
    },
    methods:{
    update_route_change(path){
      switch(path){
        case "/home":
        this.bottomNav = 0
        break;
        case "/profile":
        this.bottomNav = 3
        break;
        case '/rankingchart':
        this.bottomNav = 1
        break;
        case "/posts":
        this.bottomNav = 2
        break;
        default:
        this.bottomNav = void(0)
      }
    }
  },
  watch:{
      $route(to, from){
        let current_path = to.path
        this.update_route_change(current_path)
      }
    },
    computed:{
      ...mapGetters({
        theme: "theme"
      }),
      bg_color(){
        return this.theme.main_color
      }
    }
  }
</script>
