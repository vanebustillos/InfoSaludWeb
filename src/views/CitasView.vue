<template>
  <div>
    <v-toolbar color="#82c9eb">
      <v-toolbar-title>Citas</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        color="#304050"
        v-on:click="sendData(appointment)"
        class="mx-5"
      >
        Add
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon color="#304050" v-on:click="redirectHome()" class="mx-6">
        Home
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar>
    <Citas
      :appointment="appointment"
      :dialog="dialog"
      @close="dialog = false"
    />
  </div>
</template>

<script>
import Citas from "@/components/Citas.vue";
const db = require("@/firebaseConfig.js");

export default {
  name: "Appointments",

  components: {
    Citas
  },

  data: () => ({
    appointment: {},
    dialog: false,
    value: "",
    route: ""
  }),
  methods: {
    redirectHome() {
      this.$router.push("/");
    },

    redirectPostponed() {
      this.$router.push("/appointments");
    },

    getData() {
      db.citasCollection.get().then(q => {
        q.forEach(doc => {
          this.appointments_list.push(doc);
          // console.log(`${doc.id} => ${doc.data()}`);
        });
      });
    },
    sendData: function(appointment) {
      this.appointment = {
        ...appointment
      };
      this.dialog = true;
      // this.getData();
    }
  },

  computed: {}
};
</script>
