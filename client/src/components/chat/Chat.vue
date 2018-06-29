<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card special-border">
          <div class="card-header">
            <h4 class="text-center">Chat</h4>
          </div>
          <div class="card-body">

            <Messages/>

          </div>
        </div>

        <div class="card mt-2 border-0">
          <div class="card-body">

            <div class="row justify-content-center">
              <div class="col-md-6">
                <div class="form-group">
                  <textarea class="form-control" rows="3" placeholder="Message"></textarea>
                </div>

                <a href="#" class="btn btn-outline-primary pull-right">Send</a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Messages from "./Messages";
  import Auth from '../../services/Auth';

  export default {
    name: "Chat",
    components: {Messages},
    created: function () {
      Auth.checkWithRedirect();
    }
  }
</script>
