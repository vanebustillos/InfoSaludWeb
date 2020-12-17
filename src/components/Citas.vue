<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="800px">
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
                    :counter="50"
                    :rules="rules.clientNameRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="appointment.clientSurnames"
                    label="Apellidos :"
                    :counter="60"
                    :rules="rules.clientSurnameRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="appointment.clientCi"
                    label="CI :"
                    :counter="10"
                    :rules="rules.clientCIRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    autocomplete="off"
                    v-model="appointment.clientPhone"
                    label="Teléfono de Referencia :"
                    :counter="15"
                    :rules="rules.clientPhoneRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="specialties"
                    label="Especialidades"
                    v-model="appointment.specialty"
                  >
                  </v-select>
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
                        :rules="rules.dateRule"
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="appointment.date"
                      @input="menu_date = false"
                      color="#82c9eb"
                      :landscape="true"
                      class="mt-4"
                      min="2020-12-01"
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
                        :rules="rules.dateRule"
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

export default {
  name: "Citas",
  data: () => ({
    now: new Date().toISOString().substr(0, 10),
    menu_date: false,
    showCurrent: true,
    menu_hour: false,
    appointments_list: [],
    specialties: [],
    valid: true,
    rules: {
      clientNameRules: [
        v => !!v || "Debe especificar el nombre para agendar la cita!",
        v =>
          (v && v.length <= 50) ||
          "*Este campo no puede contener mas de 40 caracteres!",
        v =>
          (v && v.length >= 2) ||
          "*Este campo debe contener al menos dos caracteres!"
      ],
      clientSurnameRules: [
        v => !!v || "Debe especificar los apellidos para agendar la cita!",
        v =>
          (v && v.length <= 60) ||
          "*Este campo no puede contener mas de 60 caracteres!",
        v =>
          (v && v.length >= 3) ||
          "*Este campo debe contener al menos tres caracteres!"
      ],
      clientPhoneRules: [
        v => !!v || "Debe especificar el Telefono de Referencia!",
        v =>
          (v && v.length >= 7) ||
          "*El numero de telefono debe contener menos 7 caracteres!",
        v =>
          (v && v.length <= 15) ||
          "*El numero de telefono no debe contener mas de 15 caracteres"
      ],
      clientCIRules: [
        v => !!v || "Debe especificar el numero de Carnet de Identidad!",
        v =>
          (v && v.length >= 7) ||
          "*El numero del CI debe contener menos 7 caracteres!",
        v =>
          (v && v.length <= 10) ||
          "*El numero del CI no debe contener mas de 10 caracteres"
      ],
      dateRule: [v => !!v || "Este campo es requerido!"]
    }
  }),
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
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
          specialty: "",
          date: new Date().toISOString().substr(0, 10),
          hour: "",
          health_place: ""
        };
      }
    }
  },
  created: async function() {
    console.log(this.value);
    let citasDB = [];
    await db.citasCollection.get().then(cita => {
      cita.forEach(doc => {
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
    // this._getSpecialties();
    let especialidadesDB = [];
    await db.especialidadesCollection.get().then(especialidad => {
      especialidad.forEach(doc => {
        // doc.data().establishments.forEach(establecimiento => {
        // if (establecimiento === this.id) {
        especialidadesDB.push(doc.data().name);
        // }
        // });

        // console.log(`${doc.id} => ${doc.data().name}`);
      });
    });
    if (especialidadesDB === null) {
      this.specialties = [];
    } else {
      especialidadesDB.forEach(especialidad => {
        this.specialties.push(especialidad);
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
      this.appointment.health_place = "";
    },

    addAppointment: async function() {
      if (this._validateData()) {
        if (this._validateDateFormat(this.appointment.date)) {
          await db.citasCollection.doc(this.getAppointmentId()).set({
            id: this.getAppointmentId(),
            clientName: this.appointment.clientName,
            clientSurnames: this.appointment.clientSurnames,
            clientCi: this.appointment.clientCi,
            clientPhone: this.appointment.clientPhone,
            specialty: this.appointment.specialty,
            date: this.appointment.date,
            hour: this.appointment.hour,
            health_place: this.value
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

    getAppointmentId() {
      let newId = 1;
      let numberOfAppointments = this.appointments_list.length;
      if (numberOfAppointments > 0) {
        let lastId = this.appointments_list[numberOfAppointments - 1].id;
        newId = parseInt(lastId.split("-")[1]) + 1;
      }
      return "Cita-" + newId;
    },
    _getRouterId() {
      return this.$route.params.id;
    },

    _validateData() {
      return (
        this.appointment.clientName !== "" &&
        this.appointment.clientSurnames !== "" &&
        this.appointment.clientCi !== "" &&
        this.appointment.clientPhone !== "" &&
        this.appointment.specialty !== "" &&
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
  /* background-color: #82c9eb; */
  /* color: white; */
  color: black;
}
</style>
