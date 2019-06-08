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
            <v-textarea solo v-model="post_content">

            </v-textarea>
            
          </div>
          <v-layout justify-center v-if="show_croppa">
            <div class="default-font mx-3">
              <croppa ref="post_croppa_object"
              canvas-color="silver"
              :height="200"
              placeholder="点击这里上传"
              :placeholder-font-size="19"
              v-model="img"
              ></croppa>
            </div>
          </v-layout>
          <div class="default-font">
            <v-list-tile>
            <v-btn color="green lighten-2" @click="submit">
              发表
            </v-btn>
            <v-btn color="yellow darken-2" @click="reset">
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
  import { EventBus } from '../utils/event-bus';
  import {server_ip, axios_config} from "../configs/web_configs"
  export default {
    data: () => ({
      step: 1,
      show_croppa : false,
      post_img: '',
      post_content: '',
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
      },
      submit(){
        //console.log(this.$refs.post_croppa_object.hasImage())
        if (!this.post_content){
          EventBus.$emit("danger_alert", "请先输入内容！")
          return
        }

        var post = {}
        post.content = this.post_content
        post.image = ''
        if (this.show_croppa && this.$refs.post_croppa_object.hasImage()){
          post.image = this.$refs.post_croppa_object.generateDataUrl()
        }
        post.likes = []
        post.replies = []
        this.$http.post(server_ip+"/social_posts/post",post, axios_config).then(res=>{
          if (res.data == "success"){
            EventBus.$emit("success_alert", "发表成功！")
          }
          else{
            EventBus.$emit("danger_alert", "发表失败！")
          }
        }).catch((err)=>{
          console.log (err)
          EventBus.$emit("danger_alert", "发表失败！")
        })
      },
      reset(){
        if(this.show_croppa){
          this.$refs.post_croppa_object.remove()
        }
        this.post_content = ''
      }
    }
  }
</script>