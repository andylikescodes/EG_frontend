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
    <Botnav></Botnav>
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
import Botnav from './components/Botnav'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    Loading,
    Alert,
    Toolbar,
    Sidebar,
    AudioControl,
    Botnav
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
@import './styles/fonts.css';

.default-font{
  font-family: Shouzha7;
}
.secondary-font{
  font-family: Pianpian3;
}
</style>
