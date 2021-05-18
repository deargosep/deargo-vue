<template>
<div>
  <h1>chat</h1>
  <v-list>
  </v-list>
</div>
</template>

<script>
  import {db} from '../db'
export default {
  data:() => ({
    tasks:[]
  }),
firestore: {
    tasks: db.collection('Tasks')
  },
  
}
</script>

<style>

</style>


