<template>
<div class="chat-page">
  <div class="chat-container">
  <v-card class="dialog-card">
      <v-list class="dialog-messages" v-chat-scroll="{smooth: true}">
        <v-list-item v-for="n in 5" class="message accent message-left">
      Meow
        </v-list-item>
        <v-list-item v-for="n in 5" class="message accent2 drawer message-right">
          Meow-right
        </v-list-item>
      </v-list>
  </v-card>

      <v-card class="typer">
  <v-text-field label="Message" placeholder="Text a message">

  </v-text-field>
      <v-btn
      icon
      >
      <v-icon>
mdi-send 
      </v-icon>
      </v-btn>
      </v-card>
</div>  </div>


</template>

<script>
  export default {
    name: 'Chat',

    data: () => ({
    }),
  }
</script>

<style>
.chat-page {
/* overflow-x: hidden; */
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
  float: right;
}
@media (max-height: 400px) {
  .chat-container {
    height: 70vh!important;
  }
}
@media (min-height: 500px) {
  .chat-container {
    /* height: 100vh!important; */
  }
}
.chat-container {
  /* height: 90vh!important; */
  height: 85vh;
}
.dialog-card {
  height: 90%!important;
}
.dialog-messages {
  border-radius: 10px;
  border: 2px solid black;
  padding: 5px;
  height: 100%;
  overflow-y: auto;
}
.typer {
  position: fixed;
      box-sizing: border-box;
      padding: 10px;
    display: flex;
    align-items: center;
    /* margin: 0px!important; */
    margin-left:-13px!important;
    bottom: 10px;
    /* left: 20px; */
    /* height: 4.9rem; */
    min-width: inherit;
    width: 95%;
    max-width: 100%;
    /* max-width: inherit; */
    /* background-color: #fff; */
    box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
}
@media (min-width: 1264px) {
  .typer {
    /* width: 80%!important; */
    max-width: 80%!important;
  }  
}
  .typer input[type=text]{
    /* position: fixed; */
    /* left: 2.5rem; */
    /* padding: 1rem; */
    /* width: 80%; */
    /* background-color: ; */
    border: none;
    outline: none;
    /* font-size: 1.25rem; */
  }
    .chat-container{
    box-sizing: border-box;
    height: calc(100vh - 9.5rem);
    overflow-y: auto;
    padding: 10px;
    /* background-color: #f2f2f2; */
  }
</style>