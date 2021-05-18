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
        >
          <v-icon> mdi-wifi-off </v-icon>
        </v-btn>
      </v-card-title>
      <div v-show="loading === false && error === false">
        <!-- Actual content -->
        <v-card-title class="justify-center">
          {{ details.name }}
        </v-card-title>
        <v-card-subtitle>
          {{ details.description }}
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
import {db} from '../db'
export default {
  name: "Task",
  props: ['taskId'],
  data: () => ({
    id: "_",
    details:null,
    error: false,
    loading: true,
  }),
  firestore: {
    details: db.collection('Tasks').doc(this.id).get()
  },
  async beforeMounted() {
    this.id = this.$route.params.taskId
    },
  methods: {
  },
};
</script>