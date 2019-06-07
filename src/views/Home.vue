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
  import {mapGetters} from 'vuex'
  export default {
    mounted(){
    },
    computed:{
      ...mapGetters({
        logged_in: "logged_in"
      }),
    },
    components: {
      HelloWorld
    }
  }
</script>
