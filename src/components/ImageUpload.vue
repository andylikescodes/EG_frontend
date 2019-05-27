<template>
  <div>
    <v-container my-3 >
    <v-layout>
      <v-flex style="text-align:center">
        <img :height=200 v-if="chosen_img" :src="chosen_img"/>
        <croppa v-else v-model="myCroppa" ref="croppa_object"
        style="border:dashed"
        canvas-color="transparent"
        :height="200"
        placeholder="点击这里上传头像"
        :placeholder-font-size="19"
        ></croppa>
      </v-flex>
    </v-layout>
    <v-layout mt-2 justify-center wrap>
    <v-btn v-if="chosen_img" @click="rechoose"  color="success">更改图片</v-btn>
    <v-btn v-else @click="generateImage"  color="success">确定</v-btn>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
import { EventBus } from '../utils/event-bus';
export default {
  props: {
    imgUrl: {
      default: ""
    }
  },
  data: () => ({
    myCroppa: null,
    chosen_img: null
  }),
  watch:{
    imgUrl(val){
      this.chosen_img=this.imgUrl
    }
  },
  mounted(){
    this.chosen_img = this.imgUrl
  },
  methods: {
  	generateImage: function() {
    	let url = this.myCroppa.generateDataUrl()
      //console.log(url)
      if (!url) {
      	EventBus.$emit("danger_alert", "还没有选择图像！")
        this.chosen_img = this.imgUrl //if user didn't pick, fall back to the original passed in props
        return
      }
      this.chosen_img = url
      //console.log(url)
      this.$emit("image_updated", this.chosen_img)
    },
    rechoose: function(){
      this.chosen_img = null

      this.$nextTick(function (){
        this.$refs.croppa_object.chooseFile()
      })

    }
  }
}
</script>
