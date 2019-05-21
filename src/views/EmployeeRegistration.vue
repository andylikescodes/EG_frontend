<template>
  <v-form>
   <v-container mt-3>
     <h2>欢迎来到EG员工超详细注册页面！</h2>
     <v-layout wrap>
       <v-flex
         xs12
         md4
       >
         <v-text-field
           v-model="user.username"
           :counter="15"
           label="用户名"
           required
         ></v-text-field>
       </v-flex>
       <v-flex
         xs12
         md4
       >
       <v-text-field
         v-model="user.password"
         label="密码"
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
         required
       ></v-text-field>
    </v-flex>

     </v-layout>

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
  <v-btn color="primary" outline> 确认提交 </v-btn> <v-btn color="warning" outline>重置</v-btn>
   </v-container>
 </v-form>
</template>

<script>
  export default {
    data: () => ({
      user: {
        username: '',
        email: '',
        password: '',
        confirm_password : '',
        description: "",
        major: '',
        birthday: "",
        location: ""
      }
    })
  }
</script>
