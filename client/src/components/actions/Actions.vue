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
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
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
          console.log(this.actions);
        }
      });
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
