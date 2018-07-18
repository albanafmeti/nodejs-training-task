<template>
  <div class="messages">
    <div class="message" v-for="message in messages" :key="message._id">
      <div class="author" :class="getClass(message)">{{ getAuthor(message) }}</div>
      <div class="content">{{ message.content }}</div>
    </div>
  </div>
</template>

<script>
import Auth from "../../services/Auth";
export default {
  name: "Messages",
  props: ["messages"],
  methods: {
    getClass(message) {
      return message.by_admin ? "admin" : "me";
    },
    getAuthor(message) {
      const loggedUser = Auth.user();
      let author = "";

      if (loggedUser._id === message.user_id) {
        author = "Me";
      } else {
        author = message.by_admin ? "Admin" : loggedUser.name;
      }

      return author;
    }
  }
};
</script>

<style scoped lang="scss">
.message {
  display: flex;
  margin-bottom: 15px;

  .author {
    margin-right: 20px;
    font-size: 19px;
    padding: 0 10px;
    min-width: 150px;
    text-align: right;

    &.admin {
      border-right: 3px solid greenyellow;
    }
    &.me {
      border-right: 3px solid dodgerblue;
    }
  }

  .content {
    border: 1px solid beige;
    padding: 10px 25px;
    border-radius: 15px;
    background: floralwhite;
  }
}
</style>

