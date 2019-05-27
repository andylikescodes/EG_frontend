<template>
  <div>
    <v-container class="my-5">

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3>
          <v-card flat class="text-xs-center ma-3" color="grey lighten-3">
            <ImageUpload :imgUrl="avatar_path" @image_updated="image_updated"></ImageUpload>
            <v-card-text>
              <p class="display-1">{{temp_user_profile.username}}</p>
              <p class="title light-blue--text">
                {{temp_user_profile.signature}}
              </p>

            </v-card-text>
          </v-card>
        </v-flex>
        </v-layout>
        <v-layout row wrap mx-3>
        <p> </p>
        <v-flex xs12 md6>
          <div class="caption grey--text">
            <p class="title">邮箱: {{temp_user_profile.email}}</p>
          </div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">
             <p class="title">账户余额: {{temp_user_profile.balance}}</p>
          </div>
        </v-flex>
        <v-flex xs12 md6>

            <EditableDate @edit_completed="update_user" prefix="生日" class=" title grey--text" rows="2" v-model="temp_user_profile.birthday"></EditableDate>

        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">
            <Editable
              @edit_completed="update_user"
              rows="1"
              prefix="城市"
              v-model="temp_user_profile.city"
            >
            </Editable>
          </div>
        </v-flex>
        <v-flex xs12 md6>
          <div class="caption grey--text">
            <Editable
              rows="2"
              prefix="签名"
              @edit_completed="update_user"
              v-model="temp_user_profile.signature"
            >
            </Editable>
          </div>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {EventBus} from "../utils/event-bus"
import {server_ip, axios_config} from "../configs/web_configs"
import {default_avatar} from "../assets/images.js"
import Editable from "../components/editable_text.vue"
import EditableDate from "../components/editable_date.vue"
import ImageUpload from "../components/ImageUpload.vue"
export default {
  data(){
    return {
      temp_user_profile:{
        username:"",
        email: "",
        groupid: "",
        balance: "",
        birthday: "",
        total_spending: "",
        city: "",
        signature: "",
        profile: "",
        avatar_path: ""
      }
    }
  },
  components:{
    Editable,
    EditableDate,
    ImageUpload
  },
  mounted(){
    //this.temp_user_profile=Object.assign(this.temp_user_profile,this.user_profile)
    //this.temp_user_profile=this.user_profile
    for (let key in this.user_profile) this.temp_user_profile[key]= (' '+this.user_profile[key]).slice(1) //deep copy string
    //console.log(this.temp_user_profile)
  },
  computed:{
    ...mapGetters({
      user_profile: "user_profile"
    }),
    avatar_path(){
      //console.log(this.temp_user_profile.avatar_path)
      if (this.temp_user_profile.avatar_path)
      return this.temp_user_profile.avatar_path
      else {
        return default_avatar
      }
    }
  },
  watch: {
  },
  methods: {
    image_updated(new_url){
      this.temp_user_profile.avatar_path=new_url
      this.update_user()
    },
    update_user(){
      var temp_object = {}
      Object.assign(temp_object,this.temp_user_profile)
      for (let key in temp_object){
        if (this.user_profile[key]==temp_object[key]){
          console.log(this.user_profile[key]+' '+temp_object[key])
          delete temp_object[key]
          //console.log(key)
        }
      }
      if (Object.keys(temp_object).length === 0){
        return
      }
      // delete unchanged attributes to save bandwidth (otherwise, every update request will submit unchanged avatar images)
      //post the shorten version of the object, but commit the whole object to local store
      this.$http.post(server_ip+"/user/update", temp_object, axios_config).then(res=>{
        if (res.data == "success"){
          this.$store.commit("update_user_profile", this.temp_user_profile)
          EventBus.$emit("success_alert","更改成功！")
        }
        else console.log(res.data)
      }).catch(err=>{
        console.log(err)
        EventBus.$emit("danger_alert", "更新失败")
      })
    }
  }
}
</script>
