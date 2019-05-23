<template>
  <div>
    <v-container my-3 >
    <v-layout>
      <v-flex style="text-align:center">
        <img :height=200 v-if="imgUrl" :src="imgUrl"/>
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
    <v-btn v-if="imgUrl" @click="rechoose"  color="success">重新上传</v-btn>
    <v-btn v-else @click="generateImage"  color="success">确定</v-btn>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
import { EventBus } from '../utils/event-bus';
export default {
  data: () => ({
    myCroppa: null,
    imgUrl: ''
  }),
  methods: {
  	generateImage: function() {
    	let url = this.myCroppa.generateDataUrl()
      //console.log(url)
      if (!url) {
      	EventBus.$emit("danger_alert", "还没有选择图像！")
        return
      }
      this.imgUrl = url
      console.log(url)
      this.$emit("image_updated", this.imgUrl)
    },
    rechoose: function(){
      this.imgUrl = null
      this.$nextTick(function (){
        this.$refs.croppa_object.chooseFile()
      })

    }
  }
}
</script>
