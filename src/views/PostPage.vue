<template>
  
    <v-window v-model="step">
      <v-window-item :value="1">
        <div>
          <v-btn
          fixed
          dark
          fab
          bottom
          right
          small
          color="pink lighten-1"
          class="mb-5 mr-2"
          @click="post_new"
          >
            <v-icon>add</v-icon>
          </v-btn>
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </v-window-item>

      <v-window-item :value="2">
        <div style="min-height:80vh">
        <v-toolbar dense flat>
            <v-btn icon @click="step=1">
              <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title class="default-font">发新帖</v-toolbar-title>

            <v-spacer></v-spacer>

        </v-toolbar>
          <div class="secondary-font pa-2">
            <v-textarea solo>

            </v-textarea>
            
          </div>
          <v-layout justify-center v-if="show_croppa">
            <div class="default-font mx-3">
              <croppa ref="post_croppa_object"
              canvas-color="silver"
              :height="200"
              placeholder="点击这里上传"
              :placeholder-font-size="19"
              ></croppa>
            </div>
          </v-layout>
          <div class="default-font">
            <v-list-tile>
            <v-btn color="green lighten-2">
              发表
            </v-btn>
            <v-btn color="yellow darken-2">
             重置
            </v-btn>

              <v-layout justify-end>
                <v-btn large icon @click.prevent="clicked_image">
                  <v-icon>fa-image</v-icon>
                </v-btn>
              </v-layout>
            </v-list-tile>
          </div>
        </div>
      </v-window-item>
    
    </v-window>
  
  <!-- <div v-else>
    <Login></Login>
  </div> -->
  
</template>

<script>
  import Post from '../components/social/Post'
  import {mapGetters} from 'vuex'
  export default {
    data: () => ({
      step: 1,
      show_croppa : false,
      //
    }),
    mounted(){
    },
    computed:{
      ...mapGetters({
        logged_in: "logged_in"
      }),
    },
    components: {
      Post
    },
    methods:{
      post_new(){
        this.step=2
      },
      clicked_image(){
        this.show_croppa=true
        this.$nextTick(function (){
          this.$refs.post_croppa_object.chooseFile()
        })
      }
    }
  }
</script>