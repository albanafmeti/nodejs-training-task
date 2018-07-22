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
                <li class="list-group-item" v-for="(command, index) in commands" :key="command._id">
                  Command {{ index + 1 }}:&nbsp;&nbsp;&nbsp;<pre>{{ command.content }}</pre>
                </li>
              </ul>

              <div class="form-group">
                <textarea class="form-control" rows="3" placeholder="Insert Command" v-model="command"></textarea>
              </div>

              <div class="form-row">
                <div class="col">
                  <div class="form-group mb-5">
                    <select class="form-control" v-model="destinationUserId"> 
                      <option :value="client._id" v-for="client in clients" :key="client._id">{{ client.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group mb-5">
                    <input type="button" class="btn btn-outline-primary pull-right" value="Submit" @click.prevent="sendCommand"/>
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
import Auth from "../../services/Auth";
import Notification from "../../services/Notification";
import ApiClient from "../../services/ApiClient";

export default {
  name: "Commands",
  data: function() {
    return {
      clients: [],
      destinationUserId: null,
      command: null,
      commands: []
    };
  },
  watch: {
    destinationUserId: function() {
      this.getCommands();
    }
  },
  methods: {
    getClients() {
      ApiClient.get("/users/clients").then(response => {
        let body = response.data;
        if (!body.success) {
          Notification.error(body.message);
        } else {
          this.clients = body.data.clients;
          this.destinationUserId = this.clients[0] ? this.clients[0]._id : null;
          this.getCommands();
        }
      });
    },
    getCommands() {
      ApiClient.get(`/commands/${this.destinationUserId}`).then(response => {
        let body = response.data;
        if (!body.success) {
          Notification.error(body.message);
        } else {
          this.commands = body.data.commands;
        }
      });
    },
    sendCommand() {
      if (!this.command) {
        return Notification.error("Command is required.");
      }

      ApiClient.post("/commands/create", {
        dest_user_id: this.destinationUserId,
        command: this.command
      }).then(response => {
        let body = response.data;
        if (!body.success) {
          Notification.error(body.message);
        } else {
          Notification.success(body.message);
          this.commands.push(body.data.command);
          this.command = null;
        }
      });
    }
  },
  created: function() {
    Auth.redirectNonAdmin();
    this.getClients();
  }
};
</script>

<style scoped>
pre {
  display: inline;
}
</style>
