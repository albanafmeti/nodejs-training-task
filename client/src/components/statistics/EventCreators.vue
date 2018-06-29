<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header card-special-border">
            <h4 class="text-center">Generate Events</h4>
          </div>
          <div class="card-body">

            <div class="form">

              <div class="form-group mb-5">
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input">
                  <label class="custom-control-label" for="customRadioInline1">Toggle this custom radio</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input">
                  <label class="custom-control-label" for="customRadioInline2">Or toggle this other custom radio</label>
                </div>
              </div>

              <div class="form-group mb-5">
                <label class="mr-sm-2">Select Option</label>
                <select class="custom-select">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div class="form-group mb-5">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="customCheck1">
                  <label class="custom-control-label" for="customCheck1">Check this custom checkbox</label>
                </div>
              </div>

              <div class="form-group mb-5">
                <input type="number" class="form-control" placeholder="Insert Number"/>
              </div>

              <div class="form-group mb-5">
                <input type="button" class="btn btn-outline-primary" value="Click Here"/>
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
    name: "EventCreators",
    created: function () {
      Auth.checkWithRedirect();
    }
  }
</script>

<style scoped>

</style>
