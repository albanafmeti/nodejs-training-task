<template>
  <div id="app">

    <div class="main-content">
      <div class="container">
        <div class="row">
          <div class="col">

            <router-link :to="{ name: 'home' }" class="app-title-link">
              <h1 class="h1 my-3 app-title text-center">PANEL</h1>
            </router-link>
            <hr/>

            <Navigation/>

            <router-view/>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer p-5">
      <div class="container">
        <div class="row text-center">
          <div class="col">
            <p>
              Copyright @ <strong>Scopic Software</strong> 2018
            </p>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import Navigation from "./components/general/Navigation.vue";

export default {
  name: "App",
  components: { Navigation }
};
</script>

<style lang="scss">
.main-content {
  min-height: 500px;
}

.app-title {
  font-family: initial;
}

.app-title-link,
.app-title-link:hover {
  text-decoration: none;
  color: #000;
}

.special-border {
  border: 1px dashed #dedede;
  box-shadow: 0 2px 0px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 0;
}

.border-dashed {
  border: 1px dashed #dedede;
}
</style>
