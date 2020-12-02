<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="900px">
      <v-card class="spacing-playground pa-5" fluid>
        <v-form ref="form">
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
            <div v-if="_validateData()">
              <v-btn
                depressed
                large
                color="#82c9eb"
                class="white--text ma-2 "
                v-if="_validateData()"
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
const db = require("@/firebaseConfig.js");
// import * as firebase from 'firebase/app'
// import { Observable } from "rxjs/Observable";

export default {
  name: "Citas",
  data: () => ({
    now: new Date().toISOString().substr(0, 10),
    menu_date: false,
    showCurrent: true,
    menu_hour: false,
    appointments_list: []
  }),
  props: {
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
  created: async function() {
    let citasDB = [];
    await db.citasCollection.get().then(q => {
      q.forEach(doc => {
        citasDB.push(doc);
        // console.log(`${doc.id} => ${doc.data()}`);
      });
    });
    if (citasDB === null) {
      this.appointments_list = [];
    } else {
      citasDB.forEach(cita => {
        this.appointments_list.push(cita);
      });
    }
  },
  computed: {},
  methods: {
    cancel() {
      this.$emit("close");
      this.appointment.id = "";
      this.appointment.clientName = "";
      this.appointment.clientSurnames = "";
      this.appointment.clientCi = "";
      this.appointment.clientPhone = "";
      this.appointment.date = "";
      this.appointment.hour = "";
    },
    // getData() {
    // db.citasCollection.get().then(q => {
    // q.forEach(doc => {
    // this.appointments_list.push(doc);
    // console.log(`${doc.id} => ${doc.data()}`);
    // });
    // });
    // },
    addAppointment: async function() {
      if (this._validateData()) {
        if (this._validateDateFormat(this.appointment.date)) {
          await db.citasCollection.doc(this.getAppointmentId()).set({
            id: this.getAppointmentId(),
            clientName: this.appointment.clientName,
            clientSurnames: this.appointment.clientSurnames,
            clientCi: this.appointment.clientCi,
            clientPhone: this.appointment.clientPhone,
            date: this.appointment.date,
            hour: this.appointment.hour
          });
          this.cancel();
          alert("La cita ha sido guardada exitosamente");
        } else {
          alert(
            "No puede asignar una cita para el dia " + this.appointment.date
          );
        }
      } else {
        alert("Debe completar todos los campos de la cita!.");
      }
    },
    // all() {
    //   return Observable.create(function(observer) {
    //     db.citasCollection.onSnapshot(snapshot => {
    //       observer.next(snapshot.doc.map(docSnapshot => docSnapshot.data()));
    //     });
    //   });
    // },

    getAppointmentId() {
      // let appointments = this.getData().forEach(a => {
      // for (var i = 0; i <= this.getData.length(); i++) {
      // appointments[i] = a;
      // }
      // });
      let newId = 1;
      let numberOfAppointments = this.appointments_list.length;
      if (numberOfAppointments > 0) {
        let lastId = this.appointments_list[numberOfAppointments - 1].id;
        newId = parseInt(lastId.split("-")[1]) + 1;
      }
      return "Cita-" + newId;
    },

    _validateData() {
      return (
        this.appointment.clientName !== "" &&
        this.appointment.clientSurnames !== "" &&
        this.appointment.clientCi !== "" &&
        this.appointment.clientPhone !== "" &&
        this.appointment.date !== "" &&
        this.appointment.hour !== ""
      );
    },
    _validateDateFormat(appointmentDate) {
      //let now = new Date().toISOString().substr(0, 10);
      let now = new Date();
      let year = parseInt(now.getFullYear());
      let day = parseInt(now.getDate());
      let month = parseInt(now.getMonth() + 1);
      //let hour = parseInt(now.getHours());
      let app_date = appointmentDate.split("-");
      //let app_hour = startHour.split(":");
      return (
        parseInt(app_date[0]) >= year &&
        parseInt(app_date[1]) >= month &&
        parseInt(app_date[2]) >= day
      );
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
