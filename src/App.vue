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
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import messaging from './firebase'
export default {
  data: () => ({
    drawer: false,
    routes: [],
  }),
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
},
    mounted () {
      this.routes = this.$router.options.routes
  }
};
</script>

<style>
img {
  color: #b0bec5
}
</style>