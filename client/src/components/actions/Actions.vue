<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card special-border">
          <div class="card-header">
            <h4 class="text-center">Actions</h4>
          </div>
          <div class="card-body">

            <div class="table-responsive">
              <table class="table table-hovertable-bordered">
                <thead class="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Type</th>
                  <th scope="col">Message</th>
                  <th scope="col">Author</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="action in actions" :key="action._id">
                  <th scope="row">{{ getDate(action.created_at) }}</th>
                  <td>{{ action.type }}</td>
                  <td>{{ action.content }}</td>
                  <td>{{ getAuthor(action) }}</td>
                </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../../services/Auth";
import ApiClient from "../../services/ApiClient";
import Notification from "../../services/Notification";

export default {
  name: "Actions",
  data: function() {
    return {
      actions: []
    };
  },
  methods: {
    getActions() {
      ApiClient.get("/actions").then(response => {
        let body = response.data;
        if (!body.success) {
          Notification.error(body.message);
        } else {
          this.actions = body.data.actions;
        }
      });
    },
    getAuthor(action) {
      const logged_user = Auth.user();
      if (action.by_admin) {
        return "Admin";
      } else {
        if (logged_user.is_admin) {
          return action.user_id.name;
        } else if (logged_user._id === action.user_id._id) {
          return "Me";
        }
      }
    },
    getDate(date) {
      const dateStr = new Date(date);
      return dateStr.toLocaleDateString() + " " + dateStr.toLocaleTimeString();
    }
  },
  created: function() {
    Auth.checkWithRedirect();
    this.getActions();
  }
};
</script>

<style scoped>
</style>
