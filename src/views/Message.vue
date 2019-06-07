<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-card-title class="title">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <MessageList></MessageList>
      </v-window-item>

      <v-window-item :value="2">
        <Chat/>
      </v-window-item>

      <v-window-item :value="3">
        <div class="pa-3 text-xs-center">
          <v-img
            class="mb-3"
            contain
            height="128"
            src="https://cdn.vuetifyjs.com/images/logos/v.svg"
          ></v-img>
          <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
          <span class="caption grey--text">Thanks for signing up!</span>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        flat
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === 3"
        color="primary"
        depressed
        @click="step++"
      >
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import MessageList from "../components/message/MessageList"
import Chat from "../components/message/chat"
  export default {
    components:{
        MessageList,
        Chat
    },
    data: () => ({
      step: 1
    }),

    computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Sign-up'
          case 2: return 'Create a password'
          default: return 'Account created'
        }
      }
    }
  }
</script>