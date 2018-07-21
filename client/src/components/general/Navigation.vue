<template>
  <div v-if="logged_user">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'actions' }" class="nav-link">
              Actions
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'chat' }" class="nav-link">
              Chat
            </router-link>
          </li>
          <li class="nav-item" v-if="!logged_user.is_admin">
            <router-link :to="{ name: 'events' }" class="nav-link">
              Events
            </router-link>
          </li>
          <li class="nav-item" v-if="logged_user.is_admin">
            <router-link :to="{ name: 'users' }" class="nav-link">
              Users
            </router-link>
          </li>
          <li class="nav-item" v-if="logged_user.is_admin">
            <router-link :to="{ name: 'commands' }" class="nav-link">
              Commands
            </router-link>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">Log out</a>
          </li>
        </ul>
      </div>
    </nav>
    <hr/>
  </div>
</template>

<script>
import Auth from "../../services/Auth";
import router from "../../router";

export default {
  name: "Navigation",
  data: function() {
    return {
      logged_user: null
    };
  },
  methods: {
    logout() {
      Auth.clear();
      this.$events.emit("USER_LOGGED_OUT");
      router.push("login");
    }
  },
  events: {
    USER_LOGGED_IN: function() {
      this.logged_user = Auth.user();
    },
    USER_LOGGED_OUT: function() {
      this.logged_user = null;
    }
  },
  created: function() {
    this.logged_user = Auth.user();
  }
};
</script>

<style scoped>
</style>
