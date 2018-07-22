<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card special-border">
          <div class="card-header">
            <h4 class="text-center">Chat</h4>
          </div>
          <div class="card-body">

            <Messages :messages="messages"/>

          </div>
        </div>

        <div class="card mt-2 border-0">
          <div class="card-body">

            <div class="row justify-content-center">
              <div class="col-md-6">
                <div class="form-group" v-if="loggedUser.is_admin">
                  <select class="form-control" v-model="destinationUserId">
                    <option :value="client._id" v-for="client in clients" :key="client._id">{{ client.name }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <textarea class="form-control" rows="3" placeholder="Message" v-model="message"></textarea>
                </div>

                <a href="#" class="btn btn-outline-primary pull-right" @click.prevent="sendMessage">Send</a>
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
import Auth from "../../services/Auth";
import Notification from "../../services/Notification";
import ApiClient from "../../services/ApiClient";

export default {
  name: "Chat",
  components: { Messages },
  data: function() {
    return {
      loggedUser: null,
      destinationUserId: null,
      clients: [],
      message: null,
      messages: []
    };
  },
  watch: {
    destinationUserId: function() {
      this.getMessages();
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
          this.getMessages();
        }
      });
    },
    getAdmin() {
      ApiClient.get("/users/admin").then(response => {
        let body = response.data;
        if (!body.success) {
          Notification.error(body.message);
        } else {
          this.destinationUserId = body.data.admin._id;
          this.getMessages();
        }
      });
    },
    sendMessage() {
      if (!this.message) {
        return Notification.error("Message is required.");
      }

      ApiClient.post("/messages/create", {
        dest_user_id: this.destinationUserId,
        message: this.message
      }).then(response => {
        let body = response.data;
        if (!body.success) {
          Notification.error(body.message);
        } else {
          Notification.success(body.message);
          this.messages.push(body.data.message);
          this.message = null;
        }
      });
    },
    getMessages() {
      ApiClient.get(`/messages/${this.destinationUserId}`).then(response => {
        let body = response.data;
        if (!body.success) {
          Notification.error(body.message);
        } else {
          this.messages = body.data.messages;
        }
      });
    }
  },
  created: function() {
    Auth.checkWithRedirect();

    const user = Auth.user();

    this.loggedUser = user;

    if (user.is_admin) {
      this.getClients();
    } else {
      this.getAdmin();
    }
  },
  mounted: function() {
    this.$options.sockets.new_message = data => {
      this.getMessages();
    };
  }
};
</script>
