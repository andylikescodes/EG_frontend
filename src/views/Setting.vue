
<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>

        <v-list two-line subheader>
          <v-subheader>外观</v-subheader>
            <v-list-tile @click="">
            <v-list-tile-action>
              <v-switch v-model="notifications"></v-switch>
            </v-list-tile-action>

            <v-list-tile-content @click="notifications = !notifications">
              <v-list-tile-title>炫彩灯</v-list-tile-title>
              <v-list-tile-sub-title>打开/关闭标题栏下的背光灯特效</v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>

           <v-list-group
            no-action>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>主题颜色</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            
            <v-list-tile>   
              <v-list-tile-content>
                  <v-radio-group>
                <v-list-tile-title v-for="(color, index) in theme_colors">
                    
                    
                    <v-radio :value="color">
                        <template v-slot:label>
                           <ColorBlock :color="color" :color_name="theme_color_names[index]"></ColorBlock>
                        </template>
                    
                    </v-radio>
                
                </v-list-tile-title>
                <v-list-tile-title>
                    
                    
                    <v-radio label="heihe" value="radio2"></v-radio>
                
                </v-list-tile-title>
                </v-radio-group>
              </v-list-tile-content>
              
            </v-list-tile>
            
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
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click="notifications = !notifications">
              <v-list-tile-title>Notifications</v-list-tile-title>
              <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click="sound = !sound">
              <v-list-tile-title>Sound</v-list-tile-title>
              <v-list-tile-sub-title>Hangouts message</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox v-model="video"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click="video = !video">
              <v-list-tile-title>Video sounds</v-list-tile-title>
              <v-list-tile-sub-title>Hangouts video call</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox v-model="invites"></v-checkbox>
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
  export default {
      components:{ColorBlock},
    data () {
      return {
        theme_colors: ["#C8F3E9", "#A6E3FC", "#ECECEC", "#F3C8F3"],
        theme_color_names: ["淡定青", "淡定蓝", "淡定灰", "淡定紫"],
        notifications: false,
        sound: false,
        video: false,
        invites: false
      }
    }
  }
</script>