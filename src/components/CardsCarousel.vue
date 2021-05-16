<template>
  <div>
    <v-carousel
      :hide-delimiters="true"
      :height="windowHeight"
    >
      <v-carousel-item
        v-for="(card, idx) in cards"
        :key="idx"
      >
        <v-card :class="'card-' + idx">
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
            <v-btn
              icon
              @click="getData()"
            >
              <v-icon> mdi-wifi-off </v-icon>
            </v-btn>
          </v-card-title>
          <v-list            v-if="card.tasks.length > 0"
>
            <div
              v-for="(task, idy) in card.tasks"
              v-show="error === false && loading === false"
              :key="idy"
            >
              <v-btn  
                block
                small
                @click="openTask(task._id)"
              >
                <v-card>
                  <div>
                    {{ task.name }}
                  </div>
                </v-card>
              </v-btn>
     
            </div>
            <v-spacer />
          </v-list>
          <v-card-title v-else class="justify-center">
                Пусто
          </v-card-title>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import firebase from '../firebase'
// import axios from "axios";
export default {
  data() {
    return {
      windowHeight: window.innerHeight,
          loading: true,
          error: false,
      cards: {
        available: {
          name: "Доступно",
          tasks: [],
        },
        inWork: {
          name: "В работе",
          tasks: [],
        },
        pending: {
          name: "В ожидании",
          tasks: [],
        },
        finished: {
          name: "Завершено",
          tasks: [],
        },
      },
    };
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  async mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.getData();
    setInterval(() => {
      this.getData();
    }, 15000);
  },
  methods: {
    openTask(id){
      console.log(this.$router)
      this.$router.push({
                path:'/task' + id,
                })
    },
    print(el) {
      console.log(el);
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    getData() {
      this.loading = true
      this.error = false
      firebase.firestore()
      .collection('Tasks')
      .get()
      .then(snap => {
        let documents = snap.docs.map(doc => doc.data());
          this.cards.available.tasks = documents.filter(el => el.status == 0)
          this.cards.inWork.tasks = documents.filter(el => el.status == 1)
          this.cards.pending.tasks = documents.filter(el => el.status == 2)
          this.cards.finished.tasks = documents.filter(el => el.status == 3)
          this.loading = false
      }).catch(error => {
        console.log(error)
        this.error = true
      });
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