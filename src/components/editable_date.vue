<template>
  <div :class="pass_in_class">
    <v-text-field
            v-if="editable"
            :label="prefix"
            :placeholder="'请输入'+prefix"
            :value="value"
            @input="update_content"
            @blur="on_blur"
            ref="edit_text_area"
            :rows="rows"
            type="date"
          >
          <template v-slot:append>
              <v-btn icon @click.prevent.stop="clicked_complete_edit"> <v-icon>fa-check</v-icon></v-btn>
          </template>
        </v-text-field>
    <p v-else :style=style>
      {{prefix}}： {{value}} <v-icon @click="start_edit" right v-if="!editable">fa-edit</v-icon>
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
        this.editable=false
        this.$emit("edit_completed")
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
        this.clicked_check = true
        this.quit_edit()
      }
    },
    watch:{
    },
    data () {
      return {
        editable:false,
        clicked_check: false
      }
    },
  }
</script>
