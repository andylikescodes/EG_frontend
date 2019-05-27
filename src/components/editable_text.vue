<template>
  <div :class="pass_in_class">
    <v-textarea
            v-if="editable"
            :label="prefix"
            :placeholder="'请输入'+prefix"
            :value="value"
            @input="update_content"
            @blur="on_blur"
            ref="edit_text_area"
            :rows="rows"
          >
          <template v-slot:append>
              <v-btn icon @click.stop.prevent="clicked_complete_edit"> <v-icon>fa-check</v-icon></v-btn>
          </template>
        </v-textarea>
    <p v-else >
      {{prefix}}： {{value}} <v-icon @click="start_edit" right>fa-edit</v-icon>
    </p>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: String,
        default: ""
      },
      label: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ""
      },
      pass_in_class:{
        type: Object,
        default: function () {return {
          "title": true
        }}
      },
      rows: {
        type: String,
        default: "1"
      },
      prefix: {
        type: String,
        default: ""
      }
      // class: {
      //   type: String,
      //   default: "body-1"
      // }
    },
    mounted(){
    },
    computed:{
    },
    methods:{
      start_edit(){
        this.editable = true
        this.$nextTick(()=>{
            this.$refs.edit_text_area.focus()
          }
        )

      },
      quit_edit(){
        this.$emit("edit_completed")
        this.editable=false
      },
      update_content(val){
        this.$emit('input', val)
      },
      on_blur(){
        if (this.clicked_check){
          this.clicked_check = false
          return
        }
        this.quit_edit()
      },
      clicked_complete_edit(){
        this.clicked_check = true //need this flag because after clicking it will auto-blur and will call onblur method again
        this.quit_edit()
      }
    },
    watch:{
    },
    data () {
      return {
        editable:false
      }
    },
  }
</script>
