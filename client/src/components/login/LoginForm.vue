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
    <button type="submit" class="btn btn-primary">Login</button>
  </div>
</template>

<script>
  export default {
    name: "LoginForm"
  }
</script>

<style scoped>

</style>
