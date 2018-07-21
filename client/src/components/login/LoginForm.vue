<template>
  <div>
    <div class="form-group">
      <label for="email-address">Email address</label>
      <input type="email" class="form-control" id="email-address" aria-describedby="Email"
             placeholder="Enter email" v-model="email">
    </div>
    <div class="form-group">
      <label for="password-field">Password</label>
      <input type="password" class="form-control" id="password-field" placeholder="Password" v-model="password">
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="login()">Login</button>
  </div>
</template>

<script>
import ApiClient from "../../services/ApiClient.js";
import Notification from "../../services/Notification.js";
import Auth from "../../services/Auth.js";

export default {
  name: "LoginForm",
  data: function() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      ApiClient.post("/auth/check", {
        email: this.email,
        password: this.password
      }).then(response => {
        let body = response.data;
        if (!body.success) {
          Notification.error(body.message);
        } else {
          let user = body.data.user;

          Auth.save(user);

          this.$events.emit("USER_LOGGED_IN");

          Auth.redirectIfAuthenticated();
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
