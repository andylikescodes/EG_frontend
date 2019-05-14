<template>
  <v-app >
    <div :class="theme.name">
    <Alert/>

    <Toolbar/>
    <Sidebar></Sidebar>
    <Loading/>
    <v-content>
      <router-view/>
    </v-content>
    <AudioControl></AudioControl>
    </div>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Alert from './components/alert_component'
import Toolbar from './components/toolbar'
import Sidebar from './components/NavigationDrawer'
import Loading from './components/Loading'
import AudioControl from './components/AudioControl'
import {mapGetters} from 'vuex'
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
  mounted(){
  },
  computed:{
    ...mapGetters({
      theme: "theme"
    })},
  data () {
    return {
      //
    }
  }
}
</script>

<style>
@import './styles/themes.css';
@import './styles/animations.css';

</style>
