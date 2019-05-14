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

<style>
@keyframes illuminate {
  0%   {background-color: rgba(238,119,82,0.75);}
  33%  {background-color: rgba(231,60,126,0.75);}
  66%  {background-color: rgba(35,166,213,0.75);}
  100% {background-color: rgba(35,213,171,0.75));}
}

@keyframes illuminate-shadow {
  0% {box-shadow: 0px 0px 20px 10px rgba(238,119,82,0.75);}
  33% {box-shadow: 0px 0px 20px 10px rgba(231,60,126,0.75);}
  66%  {box-shadow: 0px 0px 20px 10px rgba(35,166,213,0.75);}
  100% {box-shadow: 0px 0px 20px 10px rgba(35,213,171,0.75));}
}

.colorful{
  background: linear-gradient(-45deg, rgba(238,119,82,0.75),
  rgba(231,60,126,0.75),
  rgba(35,166,213,0.75),
  rgba(35,213,171,0.75));
}

.backlit{
  animation-name: illuminate-shadow;
  animation-duration: 10s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>