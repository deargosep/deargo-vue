<template>
  <div>
    <v-card height="400">
      <!-- Loading/Errors -->
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
          @click="getTask"
        >
          <v-icon> mdi-wifi-off </v-icon>
        </v-btn>
      </v-card-title>
      <div v-show="loading === false && error === false">
        <!-- Actual content -->
        <v-card-title class="justify-center">
          {{ details[0].name }}
        </v-card-title>
        <v-card-subtitle>
          {{ details[0].description }}
        </v-card-subtitle>
        <v-container>
          <v-row>
            <v-row>
              <v-col>
                <v-responsive width="50%" />
                <v-container>
                  <v-btn
                    small
                    @click="move(0)"
                  >
                    to available
                  </v-btn>
                </v-container>
              </v-col>
              <v-col>
                <v-responsive width="50%" />
                <v-container>
                  <v-btn
                    small
                    @click="move(1)"
                  >
                    to in work
                  </v-btn>
                </v-container>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-responsive width="50%" />
                <v-container>
                  <v-btn
                    small
                    @click="move(2)"
                  >
                    to pending
                  </v-btn>
                </v-container>
              </v-col>
              <v-col>
                <v-responsive width="50%" />
                <v-container>
                  <v-btn
                    small
                    @click="move(3)"
                  >
                    to finished
                  </v-btn>
                </v-container>
              </v-col>
            </v-row>
          </v-row>
        </v-container>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Task",
  props: ["taskId"],
  data: () => ({
    id: "_",
    details: [
      {
        name: "Task",
        description: "Description",
        author: "author",
        status: null,
      },
    ],

    error: false,
    loading: true,
  }),
  async mounted() {
    this.getTask();
  },
  methods: {
    async move(place) {
      let scope = this;
      await axios
        .post("https://node-test.agpk.kz/tasks/move/place", {
          _id: scope.$route.params.taskId,
          status: place,
        })
        .then(function () {
        //   console.log(response);
          scope.$router.go(-1)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getTask() {
      let scope = this;
      this.id = this.$route.params.taskId;
    //   console.log(this.$route.params)
      this.loading = true;
      await axios
        .get("https://node-test.agpk.kz/tasks")
        .catch(function (error) {
          console.log(error);
          this.error = true;
        })
        .then(function (response) {
          scope.loading = false;
          // console.log(response.data)
          scope.details = response.data.filter(function (task) {
            if (task._id == scope.$route.params.taskId) return task;
            // console.log(details._id, scope.$route.params.taskId)
          });

          // console.log(scope.$route.params)
          // console.log(scope.task[0])
        });
      // console.log(this.details[0])
    },
  },
};
</script>