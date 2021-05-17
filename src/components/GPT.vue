<template>
  <div>
      <v-alert
  type="error"
  v-show="error"
>{{ chatHistory.error }}</v-alert>
    <v-card>
      <v-list>

        <v-list-item
          v-bind:key="message"
          v-for="message in chatHistory.messages"
          v-bind:class="checkMsg(message.request)"
          class="message"
        >
            {{ message.text }}
        </v-list-item>
        </v-list>

             <v-card-title class="justify-center" v-show="chatHistory.messages.length === 0">
        New messages will appear here!
      </v-card-title>
      <v-container v-show="chatHistory.messages.length > 0">
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
        <v-btn icon @click="clear">
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
      </v-card-title>


            </v-container>
    </v-card>
    <v-form
      lazy-validation
      ref="form"
      @submit.prevent="getData"
      v-model="request.valid"
    >
      <v-text-field
        v-model="request.text"
        :rules="request.rule"
        required
        label="Сообщение"
        placeholder="Введите текст сообщения"
      >
      </v-text-field>
      <v-btn v-bind:disabled="loading" type="submit" block> Отправить </v-btn>
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
    request: {
      text: "",
      valid: false,
      rule: [(v) => !!v || "Необходимо заполнить это поле"],
    },
    chatHistory: {
messages: [],
      error: undefined,
    },
  }),
  mounted() {
    //   this.getData()
  },
  methods: {
      clear() {
          this.loading=false;
          this.error=false
          this.chatHistory.error=undefined
      },
      checkMsg(request) {
          if(request) {
              return 'accent message-right'
          } else {
              return 'accent2 message-left'
          }
      },
    async getData() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.error = false;
        var request = this.request.text;
        var scope = this;
        if (request === "" || request === null || request.value === 0) {
          this.chatHistory.error = "Please enter text in text box below"
        } else {
          this.chatHistory.messages.push({text: request, request: true})
          await axios
            .post(
              "https://api.aicloud.sbercloud.ru/public/v1/public_inference/gpt3/predict",
              {
                text: request,
              }
            )
            .then(function (response) {
              scope.chatHistory.messages.push({text: response.data.predictions, request: false});
            //   console.log(scope.chatHistory.responses);
              scope.loading = false;
            })
            .catch(function (error) {
              scope.chatHistory.error = error;
              scope.error = true;
              scope.loading = false
            });
        }
      } else {
        //   console.log('error validating')
      }
    },
  },
};
</script>

<style>
.v-list {
    max-height: 70vh!important;
    overflow-y: auto;
}
.message {
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  width: 60%;
  margin: 5px;
  font-size: 14px;
  /* background-color: ; */
}
.message-right {
position: relative;
margin-left: 30%;
}
</style>