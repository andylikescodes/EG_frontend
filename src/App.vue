<template>
  <v-app>
    <Alert/>

    <Toolbar/>
    <Sidebar></Sidebar>
    <Loading/>
    <v-content>
      <router-view/>
    </v-content>
    <AudioControl></AudioControl>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Alert from './components/alert_component'
import Toolbar from './components/toolbar'
import Sidebar from './components/NavigationDrawer'
import Loading from './components/Loading'
import AudioControl from './components/AudioControl'
export default {
  name: 'App',
  components: {
    Loading,
    HelloWorld,
    Alert,
    Toolbar,
    Sidebar,
    AudioControl
  },
  data () {
    return {
      //
    }
  }
}
</script>
