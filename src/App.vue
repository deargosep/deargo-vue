<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="drawer"
    >
      <v-container fluid>
        <v-list>
          <v-list-item>
            <v-list-item-title class="title">
              App
            </v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item>
            <v-switch
              v-model="$vuetify.theme.dark"
              inset
              label="Dark theme"
            />
          </v-list-item>
          <v-divider />
          <v-list-item
            v-for="route in routes"
            v-if="route.show != false"
            :key="route.path"
          >
            <router-link :to="route.path">
              {{ route.name }}
            </router-link>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-alert v-show="info" type="info">{{info}}</v-alert>
        <v-alert v-show="error" type="error">{{error}}</v-alert>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {msg} from './db'
export default {
  data: () => ({
    drawer: false,
    routes: [],
    error: undefined,
    info: undefined
  }),
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
},
    async mounted () {
      this.routes = this.$router.options.routes
  },
  created() {
    const scope = this
    msg
    .requestPermission()
    .then(() => msg.getToken())
    .then((token) => {
        console.log(token) // Receiver Token to use in the notification
        scope.info = token
    })
    .catch(function(err) {
        console.log("Unable to get permission to notify.", err);
        scope.error = err
    });

    msg.onMessage(function(payload) {
    console.log("Message received. ", payload);
    scope.info = payload
    });
}
};
</script>

<style>
img {
  color: #b0bec5
}
</style>