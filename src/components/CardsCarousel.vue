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
            v-show="card.loading === true && card.error === true"
            class="justify-center"
          >
            <v-progress-circular indeterminate />
          </v-card-title>
          <v-card-title
            v-show="card.loading === true && card.error === false"
            class="justify-center"
          >
            <v-progress-circular indeterminate />
          </v-card-title>
          <v-card-title
            v-show="card.error === true"
            class="material-icons justify-center"
          >
            <v-btn
              icon
              @click="getData(cards)"
            >
              <v-icon> mdi-wifi-off </v-icon>
            </v-btn>
          </v-card-title>
          <v-list            v-if="card.tasks.length > 0"
>
            <div
              v-for="(task, idy) in card.tasks"
              v-show="card.error === false && card.loading === false"
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
import axios from "axios";
export default {
  data() {
    return {
      windowHeight: window.innerHeight,
      cards: {
        available: {
          name: "Доступно",
          loading: true,
          error: false,
          tasks: [],
        },
        inWork: {
          name: "В работе",
          loading: true,
          error: false,
          tasks: [],
        },
        pending: {
          name: "В ожидании",
          loading: true,
          error: false,
          tasks: [],
        },
        finished: {
          name: "Завершено",
          loading: true,
          error: false,
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
    this.getData(this.cards);
    setInterval(() => {
      this.getData(this.cards);
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
    getData(cards) {
      Object.keys(cards).forEach(async function (card, index) {
        cards[card].loading = true;
        cards[card].error = false;
        await axios
          .get("https://node-test.agpk.kz/tasks/" + index)
          .catch(function (error) {
            console.log(error);
            cards[card].error = true;
          })
          .then(function (response) {
            // cards[card].error = true
            cards[card].loading = false;
            cards[card].tasks = response.data;
          });
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