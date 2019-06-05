<template>
  <div>

  <h2 style="text-align:center" class="mt-2">{{page_status}}</h2>
  <v-form @submit.prevent.stop="submit" v-if="show_form" ref="employee_register_form">
   <v-container mt-3>
     <p class="pink--text">
       *由于需要输入的较多，为保证正确率，建议使用电脑完成资料填写！
     </p>
     <p class="pink--text">
       *您的邮箱是<strong>{{email}}</strong>
     </p>
     <p class="pink--text" v-if="old_user">
       *您已经注册成为了普通用户，用户名为{{user.username}}
     </p>
     <v-layout wrap justify-center>
       <v-flex xs12 md4>
          <ImageUpload @image_updated="image_updated"></ImageUpload>
       </v-flex>
     </v-layout>

     <v-layout wrap>

       <v-flex
         xs12
         md4
       >
         <v-text-field
           v-model="user.username"
           :counter="15"
           label="用户名"
           :rules="[rules.required]"
           required
           @blur = "validate_user"
           :disabled="old_user"
           :error-messages="user_error_texts"
         ></v-text-field>
       </v-flex>
       <v-flex
         xs12
         md4
         v-if="!old_user"
       >
       <v-text-field
         v-model="user.password"
         label="密码"

         :append-icon="show_password ? 'visibility' : 'visibility_off'"
         :type="show_password ? 'text' : 'password'"
         :rules="[rules.required, rules.min]"
         @click:append="show_password = !show_password"
         required
       ></v-text-field>
     </v-flex>
     <v-flex
       xs12
       md4
     >
       <v-text-field
         v-model="user.confirm_password"
         label="确认密码"
         v-if="!old_user"
         :append-icon="show_confirm_password ? 'visibility' : 'visibility_off'"
         :type="show_confirm_password ? 'text' : 'password'"
         :rules="[rules.required, rules.min, confirm]"
         @click:append="show_confirm_password = !show_confirm_password"
         required
       ></v-text-field>
    </v-flex>

     </v-layout>
     <v-radio-group v-model="user.gender" row required>
      <v-radio label="男孩子" value="MALE"></v-radio>
      <v-radio label="女孩子" value="FEMALE"></v-radio>
    </v-radio-group>
    <GameSelection @value_changed = "service_update"></GameSelection>
     <v-layout>
       <v-flex
         xs12
         md4
       >
         <v-text-field
           v-model="user.location"
           :counter="15"
           label="地区"
           required
         ></v-text-field>
      </v-flex>

     <v-flex
       xs12
       md4
     >
       <v-text-field
         v-model="user.birthday"
         label="生日"
         type="date"
         required
       ></v-text-field>
     </v-flex>
    <v-flex
      xs12
      md4
    >
      <v-text-field
      v-model="user.major"
      label="专业"
      required
      ></v-text-field>
    </v-flex>
  </v-layout>
  <v-layout wrap>
    <v-flex>
      <v-textarea label="一小段介绍自己的话" rows="3" v-model="user.description">

      </v-textarea>
    </v-flex>
  </v-layout>
  <v-btn color="primary" type="submit" outline> 确认提交 </v-btn> <v-btn color="warning" outline  @click="reset" >重置</v-btn>
   </v-container>
 </v-form>

</div>
</template>

<script>
import GameSelection from "../components/GameSelection"
import ImageUpload from "../components/ImageUpload"
import {server_ip, axios_config} from "../configs/web_configs"
import { EventBus } from '../utils/event-bus.js';
  export default {
    components: {GameSelection, ImageUpload},
    mounted(){
      var token = this.$route.query.token
      this.$http.get(server_ip+"/auth/employee_register_confirm", {...axios_config, params:{token:token}}).then(res=>{
        if (res.data){
          //console.log(res.data)
          this.email = res.data.email
          if (res.data._id){
            this.old_user = true
            for (let key in res.data) this.user[key]=res.data[key]
          }
          if (res.data.groupid==3){
            this.page_status = "该邮箱已完成员工注册！"
            return
          }
          if (res.data.groupid>3){
            this.page_status = "客服及以上不适用于该注册方式"
            return
          }
          this.page_status = "欢迎来到EG员工超详细注册页面！"
          this.show_form = true
        }
      }).catch(err=>{
        console.log(err)
        this.page_status = "可能由于时间过长，注册链接已失效，请重新申请注册邮件！"
      })

    },
    data: () => ({
      show_password: false,
      show_confirm_password: false,
      loading: false,
      show_form : false,
      email: "",
      user_error_texts:[],
      page_status: "加载中...",
      old_user: false,
      user: {
        username: '',
        email: '',
        password: '',
        confirm_password : '',
        description: "",
        major: '',
        birthday: "",
        location: "",
        gender:"",
        avatar_path:''
      },
      rules: {
        required: value => !!value || '此处不能为空',
        min: v => v.length >= 8 || '密码至少要8位哦！',
        email_match: v=> /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(v).toLowerCase()) || "email格式不正确"
      }

    }),
    methods:{
      confirm: function(v){
        //console.log(v)
        //console.log(this.form.password)
        return (v===this.user.password) || "输入的密码不一致!"
      },
      validate_user: function(){
        this.$http.get(server_ip+'/auth/username_exist?username='+this.user.username).then((res)=>{
          //console.log(res)
          if(!res.data){
            this.user_error_texts = []
            return true
          }
          else{
            this.user_error_texts = ["用户名已注册！"]
            this.temp_user_err = true
            return false
          }
        })
      },
      reset: function(){
        this.user= {
          username: '',
          email: '',
          password: '',
          confirm_password : '',
          description: "",
          major: '',
          birthday: "",
          location: "",
          gender:""
        }
      },
      submit: function(){
        if(!this.$refs.employee_register_form.validate()){
          EventBus.$emit("danger_alert","输入还有不合法的地方!")
          return
        }
        if(!this.user.avatar_path){
          EventBus.$emit("danger_alert","请输入图片!")
          return
        }
        if (this.loading) return
        this.loading = true
        EventBus.$emit("loading")
        if (this.old_user){
          this.$http.post(server_ip+"/auth/register_employee",{user:this.user, token:this.$route.query.token}, axios_config)
          .then(res=>{
            if(res.data == "success"){
              EventBus.$emit("success_alert", "操作成功")
              this.loading  = false
              EventBus.$emit("not_loading")
              this.$router.push("/home")
            }
            else{
              EventBus.$emit("danger_alert","用户注册成功，但是注册员工时失败，请联系管理员处理, code: "+res.data)
              this.loading  = false
              EventBus.$emit("not_loading")
            }
          }).catch(err=>{
            EventBus.$emit("danger_alert","用户注册成功，但是注册员工时失败，请联系管理员处理！")
            this.loading  = false
            EventBus.$emit("not_loading")
          })
        }
        else{
          this.user.email = this.email
          this.$http.post(server_ip+"/auth/register",this.user, axios_config).then(res=>{
            if (res.data == "success"){
              this.$http.post(server_ip+"/auth/register_employee",{user:this.user, token:this.$route.query.token}, axios_config).then(res=>{
                if(res.data == "success"){
                  EventBus.$emit("success_alert", "操作成功")
                  this.loading  = false
                  EventBus.$emit("not_loading")
                  this.$router.push("/home")
                }
                else{
                  EventBus.$emit("danger_alert","用户注册成功，但是注册员工时失败，请联系管理员处理, code: "+res.data)
                  this.loading  = false
                  EventBus.$emit("not_loading")
                }
              }).catch(err=>{
                EventBus.$emit("danger_alert","用户注册成功，但是注册员工时失败，请联系管理员处理！")
                this.loading  = false
                EventBus.$emit("not_loading")
              })
            }
            else{
              EventBus.$emit("danger_alert","注册用户失败！")
              this.loading  = false
              EventBus.$emit("not_loading")
            }
          })
        }
      },
      service_update(val){
        this.user.services = JSON.stringify(val)
      },
      image_updated(val){
        this.user.avatar_path = val
        console.log(val)
      }
    }
  }
</script>
