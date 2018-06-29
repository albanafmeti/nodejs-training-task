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
  import Auth from '../../services/Auth';

  export default {
    name: "Users",
    created: function () {
      Auth.redirectNonAdmin();
    }
  }
</script>

<style scoped>

</style>
