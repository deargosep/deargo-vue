<template>
  <div>  
    <v-card>
      <v-avatar
        color="primary"
        size="60"
      >
        <v-img src="img/avatar.png" />
      </v-avatar>
      <div class="float-right">
        <v-card-actions>
          <v-btn
            class="material-icons"
            elevation="2"
            icon
          >
            <v-icon>
              mdi-account-edit
            </v-icon>
          </v-btn>
        </v-card-actions>
      </div>
      <v-card-title>
        deargo .
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  components: {
  }
}
</script>
