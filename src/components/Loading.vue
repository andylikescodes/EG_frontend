<template>
  <div style="position:fixed; top: 40%; left:45%; z-index: 7;">
    <v-progress-circular
      indeterminate
      color="warning"
      v-show="visibility"
      size="50"
      width="7"
    ></v-progress-circular>
  </div>
</template>

<script>
  import { EventBus } from '../utils/event-bus';
  export default {
    data () {
      return {
        visibility:false
      }
    },
    beforeDestroy () {
    },
    mounted () {
      EventBus.$on("loading", msg => {
        this.visibility = true
      })
      EventBus.$on("not_loading", msg => {
        this.visibility = false
      })
    }
  }
</script>
<style lang="stylus" scoped>
  .v-progress-circular
    margin: 2rem
</style>
