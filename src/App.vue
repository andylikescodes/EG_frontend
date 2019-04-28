<template>
  <v-app>
    <Alert/>
    <Toolbar/>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Alert from './components/alert_component'
import Toolbar from './components/toolbar'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Alert,
    Toolbar
  },
  data () {
    return {
      //
    }
  }
}
</script>
