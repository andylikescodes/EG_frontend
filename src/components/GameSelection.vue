<template>
  <v-combobox
    v-model="model"
    :items="items"
    :search-input.sync="search"
    hide-selected
    hint="如果有没有包含的新项目，可以直接输入然后回车创建！"
    label="选择项目"
    multiple
    persistent-hint
    small-chips
  >
    <template v-slot:no-data>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
             按下 <kbd>enter</kbd> 将创建"<strong>{{ search }}</strong>"项目
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-combobox>
</template>

<script>
  export default {
    data: () => ({
      items: ['LOL', 'PUBG', 'DOTA', 'APEX', 'STEAM小游戏',"唱歌","陪读","代写"],
      model: [],
      search: null
    }),

    watch: {
      model (val) {
        this.$emit("value_changed",val)
      }
    }
  }
</script>
