import Vue from 'vue'
import store from '../store'
import socketIO from 'socket.io-client';
import VueSocketIO from "vue-socket.io"
import {server_ip} from "../configs/web_configs"

Vue.use(new VueSocketIO({
    debug: true,
    connection: socketIO(server_ip), //options object is Optional
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);