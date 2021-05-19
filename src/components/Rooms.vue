<template>
  <div>
    <h1>{{currentRoom.name}}</h1>
    <div v-if="inRoom">
      <v-btn @click="leave('Fjpx1WZzkZXzwp1EqTzy')" block>Leave</v-btn>
      <chat-component v-model="inRoom" :roomId="currentRoom.id"></chat-component>
    </div>
    <div v-else>
      <v-form lazy-validation @submit.prevent="createRoom">
        <v-text-field
          v-model="newRoomName"
          :rules="[newRoomName.trim() != '']"
          label="Name"
        >
        </v-text-field>
        <v-text-field
          v-model="newRoomDescription"
          label="Description (optional)"
        >
        </v-text-field>
        <v-btn :disabled="newRoomName == ''" block type="submit"
          >Create a room</v-btn
        >
      </v-form>
      <br />
                <h1>Группы</h1>

      <v-list>
          <!--<v-progress-circular indeterminate v-show="!loaded && error != ''"/>-
        <v-alert type="error" v-show="error">{{error}}</v-alert>-->
          <div v-if="chats.length > 0">
            <v-list-item
              v-for="room in chats"
              v-if="!room.disabled"
              v-bind:key="room.id"
            >
              <v-list-item-content @click="gotoRoom(room.id, room.name)">
                <v-list-item-title>
                  <div v-if="room.name != ''">{{ room.name }}</div>
                  <div v-else>Пустое название</div>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <div v-if="room.description != ''">{{ room.name }}</div>
                  <div v-else>Пустое описание</div>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ room.id }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn v-show="false" @click="hideRoom(room.id)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </div>
          <v-list-item-title v-else> Нет активных чатов </v-list-item-title>
        <v-list-group v-show="false">
          <v-list-item
              v-for="room in chats"
              v-if="room.disabled"
              v-bind:key="room.id"
            >
              <v-list-item-content @click="gotoRoom(room.id, room.name)">
                <v-list-item-title>
                  <div v-if="room.name != ''">{{ room.name }}</div>
                  <div v-else>Пустое название</div>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <div v-if="room.description != ''">{{ room.name }}</div>
                  <div v-else>Пустое описание</div>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ room.id }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn @click="showRoom(room.id)" icon>
                  <v-icon>mdi-reload</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
        </v-list-group>
      </v-list>
    </div>
  </div>
</template>

<script>
import ChatComponent from "@/components/ChatComponent.vue";
import { db } from "../db";
export default {
  components: {
    ChatComponent,
  },
  methods: {
    showRoom(id) {
      db.collection("Chats").doc(id).set({ disabled: false });
    },
    hideRoom(id) {
      db.collection("Chats").doc(id).set({ disabled: true });
    },
    createRoom() {
      db.collection("Chats")
        .add({ name: this.newRoomName, description: this.newRoomDescription })
        .then((doc) => {
          doc.collection("messages").add({});
        })
        .catch((err) => console.log(err));
    },
    gotoRoom(roomId, roomName) {
      this.inRoom = true;
      this.currentRoom.id = roomId;
      this.currentRoom.name = roomName
    },
    leave(roomId) {
      this.inRoom = false;
      this.currentRoom.id = '';
      this.currentRoom.name = ''
    },
  },
  data: () => ({
    newRoomName: "",
    newRoomDescription: "",
    chats: [],
    inRoom: false,
    currentRoom: {
      name: '',
      id: '',
    },
    loaded: false,
    error: "",
  }),
  firestore: {
    chats: db.collection("Chats"),
    // cancelCallback: function(err) {
    //   this.error = err
    // },
    // readyCallback: function () {
    //    this.loaded = true // NOTE THIS LINE
    // },
  },
};
</script>

<style>
</style>


