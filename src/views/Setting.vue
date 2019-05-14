
<template>
  <v-layout row my-3>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>

        <v-list two-line subheader>
          <v-subheader>外观</v-subheader>
            <v-list-tile @click="">
            <v-list-tile-action>
              <v-switch  :value="backlit_value" @change="illumination_switched"></v-switch>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>炫彩灯</v-list-tile-title>
              <v-list-tile-sub-title>打开/关闭标题栏下的背光灯特效</v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>

           <v-list-group
            no-action>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>主题</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-radio-group :value="theme_name" @change="theme_changed">
            <v-list-tile v-for="(theme, index) in theme_configs">
              <v-list-tile-content >

                <v-list-tile-action>

                    <v-radio :color="theme.main_color"  :value="theme.name">
                        <template v-slot:label>
                           <ColorBlock :color="theme.main_color" :color_name="theme.alias"></ColorBlock>
                        </template>

                    </v-radio>

                </v-list-tile-action>
              </v-list-tile-content>

            </v-list-tile>
            </v-radio-group>

            </v-list-group>

        </v-list>

        <v-divider></v-divider>

        <v-list
          subheader
          two-line
        >
          <v-subheader>其他</v-subheader>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox :color="theme.main_color" v-model="notifications"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click="notifications = !notifications">
              <v-list-tile-title>Notifications</v-list-tile-title>
              <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox :color="theme.main_color" v-model="sound"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click="sound = !sound">
              <v-list-tile-title>Sound</v-list-tile-title>
              <v-list-tile-sub-title>Hangouts message</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox :color="theme.main_color" v-model="video"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click="video = !video">
              <v-list-tile-title>Video sounds</v-list-tile-title>
              <v-list-tile-sub-title>Hangouts video call</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox :color="theme.main_color" v-model="invites"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click="invites = !invites">
              <v-list-tile-title>Invites</v-list-tile-title>
              <v-list-tile-sub-title>Notify when receiving invites</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import ColorBlock from "../components/color_block.vue"
  import {mapGetters} from 'vuex'
  import {theme_configs} from "../configs/app_configs"
  export default {
    components:{ColorBlock},
    computed:{
      ...mapGetters({
        theme: "theme",
        backlit: "backlit"
      })
    },
    mounted(){
      this.theme_name = this.theme.name
      this.backlit_value = this.backlit
    },
    data () {
      return {
        theme_configs: theme_configs,
        theme_name: '',
        backlit_value: false,
        notifications: false,
        sound: false,
        video: false,
        invites: false
      }
    },
    methods:{
      theme_changed: function(val){
        this.theme_name = val
        for (let i = 0; i< theme_configs.length; i++){
          if (theme_configs[i].name == this.theme_name){
            this.$store.commit("update_theme", theme_configs[i])
            break;
          }
        }
      },
      illumination_switched: function(val){
        //console.log(val)
        this.$store.commit("switch_backlit", val)
      }
    }
  }
</script>
