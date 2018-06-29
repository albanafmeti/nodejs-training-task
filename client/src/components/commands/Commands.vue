<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card special-border">
          <div class="card-header card-special-border">
            <h4 class="text-center">Commands</h4>
          </div>
          <div class="card-body">

            <div class="form">

              <ul class="list-group mb-5">
                <li class="list-group-item">Command 1:&nbsp;&nbsp;&nbsp;<pre>alert("Hello World!");</pre>
                </li>
                <li class="list-group-item">Command 2:&nbsp;&nbsp;&nbsp;<pre>alert("Hello World!");</pre>
                </li>
                <li class="list-group-item">Command 3:&nbsp;&nbsp;&nbsp;<pre>alert("Hello World!");</pre>
                </li>
              </ul>

              <div class="form-group">
                <textarea class="form-control" rows="3" placeholder="Insert Command"></textarea>
              </div>

              <div class="form-row">
                <div class="col">
                  <div class="form-group mb-5">
                    <select class="custom-select">
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group mb-5">
                    <input type="button" class="btn btn-outline-primary pull-right" value="Submit"/>
                  </div>
                </div>
              </div>


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
    name: "Commands",
    created: function () {
      Auth.redirectNonAdmin();
    }
  }
</script>

<style scoped>

  pre {
    display: inline;
  }
</style>
