<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-8 col-md-6 mt-4">

        <h1 class="text-center">404</h1>
        <h5 class="text-center">Not Found</h5>

        <p class="text-center my-4">
          <router-link :to="{ name: 'home' }" class="btn btn-link"><i class="fa fa-arrow-left"></i>&nbsp;&nbsp;Back Home
          </router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NotFound"
  }
</script>

<style scoped>

</style>
