<template>
  <v-card class="pa-2">
                <v-layout row pa-2>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <strong class="headline indigo--text text--darken-2"> {{fromName}} </strong>
                        <span> 送给了 </span>
                        <strong class="headline deep-orange--text text--darken-2"> {{toName}} </strong>
                        <strong class="headline green--text text--darken-4"> {{giftName}} </strong>
                        <span> 。 </span>
                      </div>
                      <br>

                    </v-card-title>
                    <v-card-text>
                      <div>
                        {{time}}
                      </div>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs5>
                    <v-img
                      :src="gift_image_path"
                      height="125px"
                      contain
                    ></v-img>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-layout row>
                  <v-flex>
                    <blockquote>
        {{message}}
    <footer>
        <cite>
            {{fromName}}
        </cite>
    </footer>
    </blockquote>
                  </v-flex>
                </v-layout>
              </v-card>
</template>

<script>
import {server_ip, axios_config} from "../configs/web_configs"

  export default {
    props: ["giftName", "fromName", "toName", "time", "message", "giftImagePath"],
    mounted(){

    },
    computed:{
      gift_image_path(){
        return server_ip+this.giftImagePath
      }
    },
    watch:{
    },
    data () {
      return {
      }
    },
    methods:{

    }
  }
</script>

<style>
blockquote {
    font-family: Georgia, serif;
    position: relative;
    margin: 0.5em;
    padding: 0.5em 2em 0.5em 3em;
    font-size: 1.2em;
}
/* Thanks: http://callmenick.com/post/styling-blockquotes-with-css-pseudo-classes */
blockquote:before {
    font-family: Georgia, serif;
    position: absolute;
    font-size: 6em;
    line-height: 1;
    top: 0;
    left: 0;
    content: "\201C";
}
blockquote:after {
    font-family: Georgia, serif;
    position: absolute;
   /* display: block; don't use this, it raised the quote too high from the bottom - defeated line-height? */
    float:right;
    font-size:6em;
    line-height: 1;
    right:0;
    bottom:-0.5em;
    content: "\201D";
}
blockquote footer {
    padding: 0 2em 0 0;
    text-align:right;
}
blockquote cite:before {
    content: "\2013";
}
</style>
