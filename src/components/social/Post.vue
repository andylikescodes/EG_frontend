<template>
  <div>
  <v-card
    class="mx-auto py-3"
    max-width="600"
  >
      
<span  class="mx-3 default-font subheading" :class=header_class>{{header}}</span><span class="mx-2" style="color:grey;float:right;">{{post_time}}</span>
    <v-card-text class="secondary-font" style="font-size:1.5em">
      "{{post.content}}"
    </v-card-text>
    <v-img
                    v-if="post.image"
                    :src="post.image"
                    height="40vh"
                    contain
                  ></v-img>
    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
            <v-img
                class="elevation-6"
                :src="post.author.avatar_path"
            ></v-img>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title class="default-font">{{post.author.username}}</v-list-tile-title>
        </v-list-tile-content>

        <v-layout
          align-center
          justify-end
        >
          <v-btn @click.stop="click_like" flat icon :color="liked ? 'red lighten-3' : 'grey darken-1'">
          <v-icon class="mr-1">mdi-heart</v-icon>
          </v-btn>
          <span class="subheading mr-2">{{post.likes.length}}</span>
          <span class="mr-1">·</span>
          <v-btn flat icon @click="click_reply('')" color="grey darken-1">
          <v-icon class="mr-1">chat_bubble</v-icon>
          </v-btn>
          <span class="subheading mr-2">{{post.replies.length}}</span>
        </v-layout>
      </v-list-tile>
    </v-card-actions>
    <v-layout justify-end>
    <v-card  class="mr-2 mb-2" flat max-width="500px" width="90vw" color="grey lighten-2" >
       <div class="mx-3 my-1 default-font" v-for="reply in post.replies" :key="reply._id" @click.stop.prevent="click_reply(reply)">
            <span style="color:blue">{{reply.author.username}}</span>
            <span v-if="reply.target">回复 </span>
            <span v-if="reply.target" style="color:blue">{{reply.target.username}}</span>
             : <span>{{reply.content}}</span>
       </div>
    </v-card>
    </v-layout>
  </v-card>
  <!-- <div v-else>
    <Login></Login>
  </div> -->

  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <reply @refresh="refresh" @close="dialog=false" :target="target" :postid="post._id"/>
      
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {server_ip, axios_config} from "../../configs/web_configs"
  import { EventBus } from '../../utils/event-bus';
  import {format_time} from "../../utils/time"
  import Reply from './Reply'
  export default {
    data: () => ({
        dialog:false,
        target : "",
      //
    }),
    props: ["post"],
    mounted(){
        //console.log(this.user_profile)
        //console.log(this.liked)
    },
    methods:{
        click_like(){
            
            this.$http.post(server_ip+"/social_posts/like", {id: this.post._id, like: !this.liked}, axios_config).then(res=>{
                if(res.data=="success"){
                    //we don't want to pull the whole post and re-render
                    //so if it's successful, we modify locally
                    if (this.liked){
                        //console.log("unlike")
                        this.$emit("refresh", 'dislike')
                    }
                    else if (!this.liked){
                        //console.log("like")
                        this.$emit("refresh", 'like')
                    }
                    
                }
                else{
                    EventBus.$emit("danger_alert", "喜欢失败！")
                }
            })
        },
        click_reply(reply){
            //console.log(reply)
            console.log(reply)
            this.target=reply
            this.$nextTick(()=>{
              this.dialog=true
            })
            
        },
        refresh(){
          this.$emit("refresh", "reply")
        }

    },
    computed:{
      ...mapGetters({
        user_profile: "user_profile"
      }),
      header(){
        if(this.post.author.groupid==3 || this.post.author.groupid==4 || this.post.author.groupid==5){
          if (this.post.author.gender=="FEMALE")
            return "梅子酒"
          if (this.post.author.gender=="MALE"){
            return "猪蹄"
          }
        }
        else{
          return "客官大人"
        }
      },
      header_class(){
        if(this.post.author.groupid==3 || this.post.author.groupid==4 || this.post.author.groupid==5){
          if (this.post.author.gender=="FEMALE")
            return {
            "pink--text":true, 
            "text--lighten-2":true
            }
          if (this.post.author.gender=="MALE"){
            return {
            "blue--text":true, 
            "text--lighten-2":true
            }
          }
        }
        else{
          return {
            "grey--text":true
          }
        }
      },
      liked(){
          
        if ( this.post.likes.indexOf(this.user_profile._id)>-1){
            
            return true
        }
        else{

            return false
        }
      },
      post_time(){
        return format_time(this.post.createdAt)
      }
    },
    components: {
        Reply
    }
  }
</script>