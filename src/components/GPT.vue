<template>
  <div>
      <v-card>
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
    <v-card-title v-show="error === true" class="material-icons justify-center">
      <v-btn icon @click="getData()">
        <v-icon> mdi-wifi-off </v-icon>
      </v-btn>
    </v-card-title>

    <v-list>
      <v-list-item
        v-bind:key="message"
        v-for="message in chatHistory.responses"
      >
        <p>
            {{ message }}
        </p>
        <v-divider/>
      </v-list-item>
    <v-list-item v-for="error in chatHistory.errors" v-bind:key="error">
        {{error}}
    </v-list-item>
    </v-list>
      </v-card>
      <v-form>
      <v-text-field label="Сообщение" placeholder="Введите текст сообщения" v-model="request">
      </v-text-field>
      <v-btn block @click="getData($data.request)">
          Отправить
      </v-btn>
      </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GPT",
  data: () => ({
              loading: false,
        error: false,
        request: undefined,
    chatHistory: { 
        requests: [], 
        responses: [], 
        errors: [] },
  }),
   mounted() {
    //   this.getData()
  },
  methods: {
      async getData(request) {
          this.loading = true
          this.error = false
              var scope = this;
              if (request === '' || request === null || request.value === 0){
            this.chatHistory.error='Please enter text in text box below';
        } else {
    await axios
      .post(
        "https://api.aicloud.sbercloud.ru/public/v1/public_inference/gpt3/predict",
        {
          text: request,
        }
      )
      .then(function (response) {
        scope.chatHistory.responses.push(response.data.predictions);
        console.log(scope.chatHistory.responses)
        scope.loading = false
      })
      .catch(function (error) {
        scope.chatHistory.errors.push(error);
        scope.error = true
      });
        }
      }
  }
};
</script>
