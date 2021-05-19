<template>
<div>
    <v-alert v-show="error" type="error">{{error}}</v-alert>
      <h1>Login</h1>
  <v-form v-if="userEmail == ''" @submit.prevent="login">
      <v-text-field label="Email" type="email" v-model="email" />
      <v-text-field label="Password" type="password" v-model="password" />
      <v-btn type="submit">Login</v-btn>
  </v-form>
  <div v-if="userEmail != ''">
  <h3>
  {{userEmail}}
  </h3>
    <v-btn @click="logout">
      Logout
  </v-btn>
  <Chat />

  </div>
</div>
</template>
<script>
import Chat from '../components/Chat'
import {auth} from '../db'
export default {
    name: 'Login',
    components: {
        Chat
    },
    mounted() {
        var scope = this
        auth.onAuthStateChanged(function (user) {
            if(user) {
                scope.userEmail = user.email
                scope.error = ''
            } else {
                scope.userEmail = ''
                scope.error = ''
            }
        })
    },
    data: () => ({
        email: '',
        password: '',
        authed: null,
        userEmail: '',
        error: ''
    }),
    methods: {
        login() {
            const scope = this
            auth.signInWithEmailAndPassword(this.email, this.password).catch(err => {
                scope.error = err
            })
        },
        logout() {
            auth.signOut()
        }
    }
}
</script>

<style>

</style>