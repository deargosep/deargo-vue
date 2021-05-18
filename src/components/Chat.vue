<template>
<div>
  <h1>chat</h1>
  <div v-if="inRoom">
  <v-btn @click="leave('Fjpx1WZzkZXzwp1EqTzy')" block>Leave</v-btn>
  <chat-component v-model="inRoom" :roomId="room"></chat-component>
  </div>
  <v-list v-else>
  <v-btn @click="createRoom">Create a room</v-btn>
  <!--<v-progress-circular indeterminate v-show="!loaded && error != ''"/>-
  <v-alert type="error" v-show="error">{{error}}</v-alert>-->
  <v-list-item @click="gotoRoom(room.id)" v-if="!room.disabled"  v-for="room in chats" v-bind:key="room.id">
  <v-list-item-content>
  <v-list-item-title>{{room.name}}
  </v-list-item-title>
  <v-list-item-subtitle>
  {{room.description}}
  </v-list-item-subtitle>
  <v-list-item-subtitle>
  {{room.id}}
  </v-list-item-subtitle>
  </v-list-item-content>
  </v-list-item>
  </v-list>
</div>
</template>

<script>
import ChatComponent from '@/components/ChatComponent.vue'
  import {db} from '../db'
export default {
  components: {
    ChatComponent
  },
  methods: {
    createRoom() {
      db.collection('Chats').add({name:'', description:''}).then(doc => {
        doc.collection('messages').add({})
      }).catch(err => console.log(err))
    },
    gotoRoom(roomId) {
      this.inRoom = true
      this.room = roomId
    },
    leave(roomId) {
      this.inRoom = false
      this.room = undefined
    }
  },
  data:() => ({
    chats:[],
    inRoom: false,
    room: undefined,
    loaded: false,
    error: ''
  }),
firestore: {
    chats: 
      db.collection('Chats'),
      // cancelCallback: function(err) {
      //   this.error = err
      // },
      // readyCallback: function () {
      //    this.loaded = true // NOTE THIS LINE
      // },
  },
  
}
</script>

<style>

</style>


