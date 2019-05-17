<template>
  <div>
    <HelloWorld />
  </div>
  <!-- <div v-else>
    <Login></Login>
  </div> -->

</template>

<script>
  import HelloWorld from '../components/HelloWorld'
  import Login from '../views/Login'
  import {mapGetters} from 'vuex'
  export default {
    mounted(){
      if (!this.logged_in){
        this.$router.push("/login")
      }
    },
    computed:{
      ...mapGetters({
        logged_in: "logged_in"
      }),
    },
    components: {
      HelloWorld,
      Login
    }
  }
</script>
