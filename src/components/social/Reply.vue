<template>
    <v-card class="default-font" fill-height>
        <v-toolbar  :color="theme.main_color">
          <v-btn icon @click="close">
            <v-icon>close</v-icon>
          </v-btn>
          
          <v-toolbar-title>
              回复<span class="grey--text text--darken-2">{{target_name}}</span></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-flex ma-3>
                请输入要回复的内容:
        </v-flex>
       <div class="secondary-font mx-3">
            
            <v-textarea solo v-model="content">

            </v-textarea>
            
        </div>
        <v-layout justify-end>
        <v-btn color="green lighten-2" @click.stop="submit">
            提交
        </v-btn>
        <v-btn color="yellow darken-2" @click.stop="reset">
            重置
        </v-btn>
        </v-layout>
      </v-card>
</template>
<script>
import {mapGetters} from 'vuex'
import {server_ip, axios_config} from "../../configs/web_configs"
import { EventBus } from '../../utils/event-bus';
  export default {
    props: ["target", "postid"],
    mounted(){
    },
    computed:{
      ...mapGetters({
        theme: "theme"
      }),
      target_name(){
          if (!this.target){
              return ""
          }
          else{
              return this.target.author.username
          }
      }
    },
    data () {
      return {
          content: ""
      }
    },
    methods:{
        close(){
            this.$emit("close")
        },
        submit(){
            if(!this.content) {
                EventBus("danger_alert", "请输入内容！")
                return
                }
            var data = {
                postid: this.postid,
                reply: {
                    content: this.content,
                }
            }
            if (this.target){
                data.reply.target = this.target.author._id
            }
            this.$http.post(server_ip+"/social_posts/reply", data, axios_config).then(res=>{
                if (res.data=="success") {
                    this.$emit("refresh")
                    this.reset()
                    this.close()
                }
                else{
                    EventBus.$emit("danger_alert", "提交失败")
                }
                
            }).catch(err=>{
                EventBus.$emit("danger_alert", "提交失败")
                console.log(err)
            })
            
        },
        reset(){
            this.content=""
        }
    }
  }
</script>