<template>
    <div>
        <v-chip outline :color="config.color" label>
            <v-icon left>{{config.icon}}</v-icon>{{config.content}}
        </v-chip>
    </div>
</template>

<script>
//fa-user-check
  export default {
    props: ["status"],
    data: () => ({
    }),
    computed:{
        config(){
            console.log(this.status)
            switch (this.status){
                case "online":
                    return {
                        icon: "fa-user-check",
                        content: "在线",
                        color: "green"
                    }
                    
                case "offline":
                    return {
                        icon: "fa-user-times",
                        content: "离线",
                        color: "grey"
                    }
                    
                case "idle":
                    return {
                        icon: "fa-user-clock",
                        content: "离开",
                        color: "yellow darken-4"
                    }
                    
                case "dnd":
                    return {
                        icon: "fa-user-shield",
                        content: "忙碌",
                        color: "red"
                    }
                    
                default:
                    return {
                        icon: "fa-user-slash",
                        content: "状态未知",
                        color: "grey"
                    }
            }
        }
    }
  }
</script>
