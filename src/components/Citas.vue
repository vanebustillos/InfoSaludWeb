<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="900px">
      <v-card class="spacing-playground pa-5" fluid>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title class="title">
            <v-row align="center" justify="center">
              <h2>{{ "Agendar Cita Médica" }}</h2></v-row
            ></v-card-title
          >
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="appointment.clientName"
                    label="Nombre(s) :"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="appointment.clientSurnames"
                    label="Apellidos :"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="appointment.clientCi"
                    label="CI :"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="appointment.clientPhone"
                    label="Teléfono de Referencia :"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    v-model="menu_date"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="appointment.date"
                        label="Fecha :"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="appointment.date"
                      @input="menu_date = false"
                      color="#82c9eb"
                      :landscape="true"
                      class="mt-4"
                      min="2020-06-10"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    v-model="menu_hour"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="300px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="appointment.hour"
                        label="Hora :"
                        v-bind="attrs"
                        v-on="on"
                        readonly
                        required
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      label="Start"
                      v-model="appointment.hour"
                      @input="menu_hour = false"
                      class="mt-4"
                      format="24hr"
                      color="#82c9eb"
                      :landscape="true"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <!-- <v-row align="center" justify="center"> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <div>
              <v-btn
                depressed
                large
                color="#82c9eb"
                class="white--text ma-2 "
                v-if="newMovement"
                @click="addAppointment()"
                >SAVE
                <v-icon right dark>mdi-checkbox-marked-circle</v-icon>
              </v-btn>
            </div>
            <div>
              <v-btn
                depressed
                large
                class="ma-2"
                outlined
                color="red"
                text
                @click="cancel"
                >Cancel
                <v-icon right dark>mdi-minus-circle</v-icon>
              </v-btn>
            </div>
          </v-card-actions>
          <!-- </v-row> -->
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { db } from "@/firebaseConfig.js";
// const db = require("@/firebaseConfig.js");

export default {
  name: "Citas",
  data: () => ({
    valid: false,
    now: new Date().toISOString().substr(0, 10),
    menu_date: false,
    showCurrent: true,
    menu_hour: false,
    agenda: {}
  }),
  props: {
    newMovement: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: false
    },
    appointment: {
      type: Object,
      default: function() {
        return {
          id: "",
          clientName: "",
          clientSurnames: "",
          clientCi: "",
          clientPhone: "",
          date: new Date().toISOString().substr(0, 10),
          hour: ""
        };
      }
    }
  },
  computed: {
    ...mapGetters(["getAppointments"]),
    appointments_list() {
      return this.getAppointments;
    }
  },
  methods: {
    ...mapActions(["setAppointment"]),
    cancel() {
      // this.$emit("close");
      this.appointment.id = "";
      this.appointment.clientName = "";
      this.appointment.clientSurnames = "";
      this.appointment.clientCi = "";
      this.appointment.clientPhone = "";
      this.appointment.date = "";
      this.appointment.hour = "";
    },

    addAppointment() {
      this.setAppointment({
        id: "cita-2",
        clientName: this.appointment.clientName,
        clientSurnames: this.appointment.clientSurnames,
        clientCi: this.appointment.clientCi,
        clientPhone: this.appointment.clientPhone,
        date: this.appointment.date,
        hour: this.appointment.hour
      });
      this.cancel();

      alert("La cita ha sido guardada exitosamente");
    },

    getAppointmentId() {
      let newId = 1;
      let numberOfAppointments = this.getAppointments.length;
      if (numberOfAppointments > 0) {
        let lastId = this.getAppointments[numberOfAppointments - 1].id;
        newId = parseInt(lastId.split("-")[1]) + 1;
      }
      return "Cita-" + newId;
    }
  }
};
</script>
<style>
.title {
  background-color: #82c9eb;
  color: white;
}
</style>
