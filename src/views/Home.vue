<template>
  <div>
    <CardsCarousel />
    <v-btn
      class="fab"
      fab
      dark
      right
      color="blue"
      @click="router.push('/task/newtask')"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import CardsCarousel from "../components/CardsCarousel.vue";

export default {
  name: 'Home',
  components: {
    CardsCarousel,
  }
}
</script>

<style>
.fab {
  position: sticky;
  right: 0px;
  bottom: 0px;
  left: 90%;
}
</style>
