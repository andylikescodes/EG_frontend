<template>
  <div>
    <h1>User Profile: 这里放用户的个人信息，目前直接把数据库信息打印出来，需要人合理放置：</h1>
    {{user_profile}}
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      user_profile: "user_profile"
    })}
}
</script>
