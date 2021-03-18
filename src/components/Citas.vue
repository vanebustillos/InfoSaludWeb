<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card class="spacing-playground pa-5" fluid>
        <v-form ref="form">
          <v-card-title class="title">
            <v-row align="center" justify="center">
              <h2>{{ "Agendar Cita Médica" }}{{ pageName }}</h2></v-row
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
                    @change="getDoctorData()"
                  >
                  </v-select>
                </v-col>
                <v-col
                  cols="12"
                  v-if="place != 'medicosInd' && appointment.specialty != null"
                >
                  <v-select
                    :items="doctors"
                    label="Medico"
                    v-model="appointment.doctor"
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <div v-if="_validateData()">
              <v-btn
                depressed
                large
                color="primary"
                class="white--text ma-2 "
                v-if="_validateData()"
                @click="getQR()"
                >PAGAR
                <v-icon right dark>mdi-credit-card-outline</v-icon>
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
          <v-row>
            <v-col class="mx-auto" cols="12" sm="6">
              <div class="mx-auto" v-if="this.showPaymentSection">
                <h4>1. Escanee el código QR</h4>
                <br />
                <img class="preview" height="268" width="356" :src="qrURL" />
              </div>
            </v-col>
            <v-col
              class="mx-auto"
              cols="12"
              sm="6"
              v-if="this.showPaymentSection"
            >
              <div class="mx-auto" v-if="this.showPaymentSection">
                <h4>2. Cargue el comprobante de pago</h4>
                <v-card-actions>
                  <div>
                    <v-btn
                      depressed
                      large
                      color="#82c9eb"
                      class="white--text ma-2 "
                      @click="loadVoucher()"
                      >Cargar</v-btn
                    >
                  </div>
                  <div>
                    <div>
                      <input
                        type="file"
                        ref="input1"
                        style="display: none"
                        @change="previewImage"
                        accept="image/*"
                      />
                    </div>
                    <div v-if="imageData != null">
                      <img
                        class="preview"
                        height="250"
                        width="200"
                        :src="voucherURL"
                      />
                      <br />
                    </div>
                  </div>
                </v-card-actions>
              </div>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div v-if="_validateData() && imageData != null">
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
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";
import firebase from "firebase";

export default {
  name: "Citas",
  data: () => ({
    place: "",
    pageName: "",
    now: new Date().toISOString().substr(0, 10),
    menu_date: false,
    showCurrent: true,
    menu_hour: false,
    appointments_list: [],
    specialties: [],
    especialidadesDB: [],
    doctors: [],
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
    },
    qrURL: "",
    voucherURL: "",
    imageData: null,
    showPaymentSection: false
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
          doctor: "",
          date: new Date().toISOString().substr(0, 10),
          hour: "",
          health_place: "",
          voucherURL: ""
        };
      }
    }
  },
  created: async function() {
    this.putName();
    await db
      .collection(this.place)
      .doc(this.value)
      .get()
      .then(query => {
        this.pageName += query.data().name;
        if (this.place === "medicosInd") {
          this.pageName += " " + query.data().lastname;
        }
      });
    this.getAppointments();
    this.getSpecialties();
  },
  mounted() {},
  computed: {
    // getData: function() {
    //   return this.getDoctors();
    // }
  },
  methods: {
    cancel() {
      this.$emit("close");
      this.appointment.id = "";
      this.appointment.clientName = "";
      this.appointment.clientSurnames = "";
      this.appointment.clientCi = "";
      this.appointment.clientPhone = "";
      this.appointment.specialty = "";
      this.appointment.doctor = "";
      this.appointment.date = "";
      this.appointment.hour = "";
      this.appointment.health_place = "";
      this.showPaymentSection = false;
    },

    async getAppointments() {
      let citasDB = [];
      await db
        .collection("citas")
        .get()
        .then(cita => {
          cita.forEach(doc => {
            citasDB.push(doc);
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

    async getSpecialties() {
      this.especialidadesDB = [];
      await db
        .collection("especialidades")
        .get()
        .then(especialidad => {
          especialidad.forEach(doc => {
            doc.data().establishments.forEach(q => {
              if (q === this.value) {
                this.especialidadesDB.push({
                  id: doc.data().id,
                  name: doc.data().name
                });
              }
            });
          });
        });
      if (this.especialidadesDB === null) {
        this.specialties = [];
      } else {
        this.especialidadesDB.forEach(especialidad => {
          this.specialties.push(especialidad.name);
        });
      }
    },

    async getDoctors() {
      this.doctors = [];
      await db
        .collection("especialidades")
        .get()
        .then(especialidad => {
          especialidad.forEach(doc => {
            if (this.appointment.specialty === doc.data().name) {
              this.getDoctorData(doc.data().doctors);
              alert(doc.data().doctors);
            }
          });
        });
    },
    // async getDoctorData(DoctorsArray) {
    async getDoctorData() {
      this.doctors = [];
      let doctoresDB = [];
      await db
        .collection("medicos")
        .get()
        .then(medico => {
          medico.forEach(doc => {
            if (
              doc.data().establishments === this.value &&
              this.getSpecialtyId(this.appointment.specialty) ===
                doc.data().specialty
            ) {
              let name =
                doc.data().abbreviation +
                " " +
                doc.data().name +
                " " +
                doc.data().lastname;
              // alert(name);
              doctoresDB.push(name);
            }
          });
        });
      if (doctoresDB === null) {
        this.doctors = [];
      } else {
        doctoresDB.forEach(doctor => {
          this.doctors.push(doctor);
        });
      }
    },

    addAppointment: async function() {
      if (this._validateData()) {
        if (this._validateDateFormat(this.appointment.date)) {
          await db
            .collection("citas")
            .doc(this.getAppointmentId())
            .set({
              id: this.getAppointmentId(),
              clientName: this.appointment.clientName,
              clientSurnames: this.appointment.clientSurnames,
              clientCi: this.appointment.clientCi,
              clientPhone: this.appointment.clientPhone,
              specialty: this.getSpecialtyId(this.appointment.specialty),
              doctor: this.appointment.doctor,
              date: this.appointment.date,
              hour: this.appointment.hour,
              health_place: this.value,
              voucherURL: this.voucherURL
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
        this.appointments_list.forEach(appointment => {
          let actualvalue = parseInt(appointment.id.split("-")[1]);
          if (actualvalue >= newId) {
            newId = actualvalue + 1;
          }
        });
      }
      return "Cita-" + newId;
    },

    getSpecialtyId(name) {
      let id = "";
      this.especialidadesDB.forEach(especialidad => {
        if (especialidad.name === name) {
          id = especialidad.id;
        }
      });
      return id;
    },

    _validateData() {
      return (
        this.appointment.clientName !== "" &&
        this.appointment.clientSurnames !== "" &&
        this.appointment.clientCi !== "" &&
        this.appointment.clientPhone !== "" &&
        this.appointment.specialty !== "" &&
        this.appointment.doctor !== "" &&
        this.appointment.date !== "" &&
        this.appointment.hour !== ""
      );
    },

    _validateDateFormat(appointmentDate) {
      let now = new Date();
      let year = parseInt(now.getFullYear());
      let day = parseInt(now.getDate());
      let month = parseInt(now.getMonth() + 1);
      let app_date = appointmentDate.split("-");
      return (
        parseInt(app_date[0]) >= year &&
        parseInt(app_date[1]) >= month &&
        parseInt(app_date[2]) >= day
      );
    },

    getQR() {
      this.showPaymentSection = true;
      this.qrURL = null;
      const storageRef = firebase.storage().ref("images/QR1.jpeg");
      storageRef.getDownloadURL().then(url => {
        this.qrURL = url;
        console.log(url);
      });
    },

    loadVoucher() {
      this.$refs.input1.click();
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.voucherURL = null;
      this.imageData = event.target.files[0];
      this.onUploadVoucher();
    },

    onUploadVoucher() {
      this.voucherURL = null;
      const storageRef = firebase
        .storage()
        .ref("/comprobantes/" + this.getAppointmentId())
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.voucherURL = url;
            console.log(this.voucherURL);
          });
        }
      );
    },

    putName() {
      if (this.value[0] === "M" && this.value[1] === "I") {
        this.place = "medicosInd";
        this.pageName = " con ";
      } else {
        if (this.value[0] === "C") {
          this.place = "clinicas";
          this.pageName = " en la ";
        } else {
          this.place = "hospitales";
          this.pageName = " en el ";
        }
      }
    }
  }
};
</script>

<style>
.title {
  /* background-color: #82c9eb; */
  color: black;
}
</style>
