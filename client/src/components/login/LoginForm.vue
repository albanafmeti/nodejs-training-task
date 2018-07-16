<template>
  <div>
    <div class="form-group">
      <label for="email-address">Email address</label>
      <input type="email" class="form-control" id="email-address" aria-describedby="Email"
             placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="password-field">Password</label>
      <input type="password" class="form-control" id="password-field" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="login()">Login</button>
  </div>
</template>

<script>
import ApiClient from "../../services/ApiClient.js";

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
      })
        .then(response => {
          console.log("response", response);
        })
        .catch();
    }
  }
};
</script>

<style scoped>
</style>
