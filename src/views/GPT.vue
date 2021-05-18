<template>
<div>
<Chat :data="$data"></Chat>
    </div>
</template>

<script>
import axios from "axios";
import Chat from "@/components/ChatComponent";

export default {
  name: "GPT",
  components: {
    Chat
  },
};
</script>

