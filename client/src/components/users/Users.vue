<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card special-border">
          <div class="card-header">
            <h4 class="text-center">Users</h4>
          </div>
          <div class="card-body">

            <div class="table-responsive">
              <table class="table table-hovertable-bordered">
                <thead class="thead-dark">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Created Date</th>
                  <th scope="col">Last Visit</th>
                  <th scope="col">Last Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="client in clients" :key="client._id">
                  <th scope="row">{{ client.name }}</th>
                  <td>{{ getDate(client.created_at) }}</td>
                  <td>{{ getDate(client.last_visit_at) }}</td>
                  <td>{{ getDate(client.last_action_at) }}</td>
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
  name: "Users",
  data: function() {
    return {
      clients: []
    };
  },
  methods: {
    getClients() {
      ApiClient.get("/users/clients").then(response => {
        let body = response.data;
        if (!body.success) {
          Notification.error(body.message);
        } else {
          this.clients = body.data.clients;
        }
      });
    },
    getDate(date) {
      const dateStr = new Date(date);
      return dateStr.toLocaleDateString() + " " + dateStr.toLocaleTimeString();
    }
  },
  created: function() {
    Auth.redirectNonAdmin();
    this.getClients();
  }
};
</script>

<style scoped>
</style>
