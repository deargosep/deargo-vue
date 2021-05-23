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
          console.log('Firebase cloud messaging object', this.$messaging)

  },
  created() {
    msg.getToken({ vapidKey: 'BHYQVKra4t8iS867LxXBDJTjdDph4TsWdZ_YBYkVo2MQM4w6FnLzgHbOJUXooNCiWz_l01BDvFOxeOm1gSYdNj0' })
.then((currentToken) => {
  if (currentToken) {
    console.log('client token', currentToken)
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
})
}
};
</script>

<style>
@media (min-width: 1400px) {
  .container{
  width: 60vw;
}
}
</style>