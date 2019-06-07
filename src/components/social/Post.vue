<template>
  <div>
  <v-card
    class="mx-auto py-3"
    max-width="600"
  >
      <span  class="mx-3 default-font subheading pink--text text--lighten-2">梅子酒</span>
    <v-card-text class="secondary-font" style="font-size:1.5em">
      "早起的鸟儿吃虫子，早起的虫子被鸟吃！"
    </v-card-text>
    <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                    height="40vh"
                    contain
                  ></v-img>
    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title class="default-font">自然数</v-list-tile-title>
        </v-list-tile-content>

        <v-layout
          align-center
          justify-end
        >
          <v-icon class="mr-1">mdi-heart</v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">chat_bubble</v-icon>
          <span class="subheading mr-2">2</span>
        </v-layout>
      </v-list-tile>
    </v-card-actions>
    <v-layout justify-end>
    <v-card class="mr-2 mb-2" flat max-width="500px" width="90vw" color="grey lighten-2" >
       <div class="mx-3 my-1 default-font">
           <div>
            <span style="color:blue">自然数:</span> <span>早起的鸟儿吃虫子，早起的虫子被鸟吃！</span>
           </div>
       </div>
       
       <div class="mx-3 my-1 default-font">
           <div>
            <span style="color:blue">自然数:</span> <span>早起的鸟儿吃虫子，早起的虫子被鸟吃！</span>
           </div>
       </div>
    </v-card>
    </v-layout>
  </v-card>
  <!-- <div v-else>
    <Login></Login>
  </div> -->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data: () => ({
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
    }
  }
</script>