<template>
  <div>
    <v-carousel :hide-delimiters="true" :height="windowHeight">
      <v-carousel-item v-for="card in cards" :key="card.varName">
        <v-card :class="'card-' + card.varName">
          <v-card-title class="justify-center">
            {{ card.name }}
          </v-card-title>
          <v-card-title
            v-show="loading === true && error === true"
            class="justify-center"
          >
            <v-progress-circular indeterminate />
          </v-card-title>
          <v-card-title
            v-show="loading === true && error === false"
            class="justify-center"
          >
            <v-progress-circular indeterminate />
          </v-card-title>
          <v-card-title
            v-show="error === true"
            class="material-icons justify-center"
          >
            <v-btn icon>
              <v-icon> mdi-wifi-off </v-icon>
            </v-btn>
          </v-card-title>
          <v-list v-if="card.tasks.length > 0">
            <div
              v-for="task in card.tasks"
              v-show="error === false && loading === false"
              :key="task.id"
            >
              <v-btn @click="openTask(task.id)" block small>
                  <div>
                    {{ task.name }}
                  </div>
              </v-btn>
            </div>
            <v-spacer />
          </v-list>
          <v-card-title v-else class="justify-center"> ... </v-card-title>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { db } from "../db";
export default {
  data() {
    return {
      available: [],
      inWork: [],
      pending: [],
      finished: [],
      windowHeight: window.innerHeight,
      loading: false,
      error: false,
      cards: {
       available: {name: "Доступно",
      tasks: [],
      varName: 'available'},
       inWork: {name: "В Работе",
       tasks: [],
       varName: 'inWork'}, 
       pending: {
         name: "В Ожидании",
         tasks: [],
         varName: 'pending'}, finished:{
           name:"Завершено",
           tasks: [],
           varName: 'finished'}},
    };
  },
  firestore: {
    available: db.collection("Tasks").where("status", "==", 0),
    inWork: db.collection("Tasks").where("status", "==", 1),
    pending: db.collection("Tasks").where("status", "==", 2),
    finished: db.collection("Tasks").where("status", "==", 3),
  },
   watch: {
    // whenever question changes, this function will run
    available: function () {
      this.cards.available.tasks = this.available
    },
    inWork: function () {
      this.cards.inWork.tasks = this.inWork
    },
    pending: function () {
      this.cards.pending.tasks = this.pending
    },
    finished: function () {
      this.cards.finished.tasks = this.finished
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  async mounted() {
    console.log(this.$data);
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    // this.getData();
    // setInterval(() => {
    //   this.getData();
    // }, 15000);
  },
  methods: {
    openTask(id) {
      console.log(this.$router);
      this.$router.push({
        path: "/task" + id,
      });
    },
    print(el) {
      console.log(el);
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>

<style>
.card {
  padding: 0px;
}
.v-list-item .v-card {
  padding: -5px !important;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 2px;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%) !important;
  background-color: #2b2b2b;
}
.card-available {
  border-top: 2px solid rgb(76, 175, 80) !important;
}
.card-inWork {
  border-top: 2px solid rgb(255, 193, 7) !important;
}
.card-pending {
  border-top: 2px solid rgb(206, 216, 209) !important;
}
.card-finished {
  border-top: 2px solid rgb(122, 30, 153) !important;
}
</style>