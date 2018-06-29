<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-8 col-md-6">
        <div class="card">
          <div class="card-header">
            <h4 class="text-center">Login</h4>
          </div>
          <div class="card-body">

            <LoginForm></LoginForm>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginForm from "./LoginForm";
  import Auth from '../../services/Auth';

  export default {
    name: "LoginPage",
    components: {LoginForm},
    created: function () {
      Auth.redirectIfAuthenticated();
    }
  }
</script>

<style scoped>

</style>
