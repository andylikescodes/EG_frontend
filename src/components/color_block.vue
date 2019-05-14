<template>
<div>
    <span >{{color_name}}&nbsp&nbsp&nbsp</span>    <span :style="{'background-color':color}">  &nbsp&nbsp&nbsp&nbsp&nbsp </span>
</div>
</template>
<script>
  export default {
    props:["color", "color_name"],
    data () {
      return {
        notifications: false,
        sound: false,
        video: false,
        invites: false
      }
    }
  }
</script>
