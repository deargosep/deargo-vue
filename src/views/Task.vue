<template>
  <div>
    <v-card>
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
        {{details.name}}
        </v-card-title>
        <v-card-subtitle>
        {{details.description}}
        </v-card-subtitle>
        <v-card-subtitle>
        {{details.author}}
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
  // props: ['taskId'],
  data: () => ({
    id: '',
    details:[],
    error: false,
    loading: false,
  }),
 async beforeMount(){
    const scope = this
    this.id = this.$route.params.taskId
    this.details = await db.collection('Tasks').doc(scope.id).get().then((doc) => {
    if (doc.exists) {
return doc.data()
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
  },
  methods: {
  },
};
</script>