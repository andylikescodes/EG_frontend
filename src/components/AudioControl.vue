<template>
  <div class="text-xs-center">
    <v-bottom-sheet inset v-model="audio_control">
      <v-card tile>
        <v-progress-linear
          :value="percentComplete"
          class="my-0"
          height="3"
        ></v-progress-linear>

        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>出山 （Shaye填词）  </v-list-tile-title>
              <v-list-tile-sub-title>Renka </v-list-tile-sub-title>

            </v-list-tile-content>
            <v-spacer></v-spacer>

            <v-list-tile-action>
              <v-btn icon @click="backward">
                <v-icon>fast_rewind</v-icon>
              </v-btn>
            </v-list-tile-action>

            <v-list-tile-action :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon @click.stop="toggle_play">
                <v-icon>{{play_icon}}</v-icon>
              </v-btn>
            </v-list-tile-action>

            <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon @click="forward">
                <v-icon>fast_forward</v-icon>
              </v-btn>
            </v-list-tile-action>

            <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon @click="toggle_loop">
                <v-icon :color="repeat_icon_color">repeat</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>



        </v-list>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>
<script>
import { EventBus } from '../utils/event-bus';
import {server_ip, axios_config} from "../configs/web_configs"
  export default {
    mounted(){
      EventBus.$on("call_audio_control", msg=>{
        this.audio_control=true
      })
      this.audio = new Audio (server_ip+'/audio/chushan.mp3')
      this.audio.addEventListener('pause', () => { this.playing = false; });
		  this.audio.addEventListener('play', () => { this.playing = true; });
      this.audio.addEventListener('timeupdate', this.update);
      this.audio.addEventListener('loadeddata', this.load);
      this.audio.loop = this.loop
    },
    data: () => ({
      audio_control: false,
      audio : null,
      play_icon: "play_arrow",
      playing:false,
      currentSeconds:null,
      durationSeconds: 100,
      loop: true,
      repeat_icon_color:"orange"
    }),
    computed:{
      percentComplete() {
			return parseInt(this.currentSeconds / this.durationSeconds * 100);
		}
      // play_icon(){
      //   return this.playing?"pause":"play_arrow"
      // }
    },
    watch:{
      loop: function(val){
        this.repeat_icon_color = val?"orange":"grey"
        this.audio.loop = val
      },
      playing:function(val){
        console.log("value changed")
        this.play_icon = val?"pause":"play_arrow"
      }
    },
    methods:{
      load() {
			if (this.audio.readyState >= 2) {
				this.loaded = true;
				this.durationSeconds = parseInt(this.audio.duration);
				return true;
			}

			throw new Error('Failed to load sound file.');
		},
      update(e) {
			this.currentSeconds = parseInt(this.audio.currentTime);
    },
      toggle_play(){
        if(this.playing) this.audio.pause()
        else this.audio.play()
      },
      toggle_loop(){
        if (this.loop) this.loop = false
        else this.loop = true
      },
      forward(){
        if (!this.playing) {
				return;
			}
      if (parseInt(this.audio.currentTime)+5>this.audio.duration) return;
      this.audio.currentTime = parseInt(this.audio.currentTime)+5
    },
    backward(){
      if (!this.playing) {
      return;
    }
    if (parseInt(this.audio.currentTime)-5<=0) {this.audio.currentTime=0; return;}
    this.audio.currentTime = parseInt(this.audio.currentTime)-5;
  }
    }
  }
</script>
