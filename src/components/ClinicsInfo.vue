<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="7">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-avatar tile size="100" color="grey">
                <v-img
                  src="data:image/jpeg;base64,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"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  {{ name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon> mdi-map-marker </v-icon>
                  {{ address }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-model="telephones">
                  <v-icon> mdi-phone </v-icon>
                  {{ telephones }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="6" md="5">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Contactos
                </v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle>
                  <v-icon> mdi-web </v-icon>
                  {{ web }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-icon> mdi-email </v-icon>
                  {{ email }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-model="facebook">
                  <v-icon> mdi-facebook </v-icon>
                  {{ facebook }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="7">
          <v-card class="pa-0" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-carousel
                  cycle
                  height="320"
                  hide-delimiter-background
                  show-arrows-on-hover
                >
                  <v-carousel-item
                    v-for="(item, i) in items"
                    :key="i"
                    :src="item.src"
                  >
                  </v-carousel-item>
                </v-carousel>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="6" md="5">
          <v-card class="pa-0" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Mapa de Ubicación
                </v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-avatar tile height="253" width="500" color="grey">
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU0v7eyrhtZP0te27KU_5_PabF_z_sVE75Cw&usqp=CAU"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" md="4">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Especialidades
                </v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle
                  v-for="specialty in specialties"
                  :key="specialty.id"
                >
                  {{ specialty }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="6" md="4">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Otros Servicios
                </v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle
                  v-for="service in services"
                  :key="service.id"
                >
                  {{ service }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="6" md="4">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  <v-icon> mdi-clock-time-eight-outline </v-icon>
                  Horarios de Atención
                </v-list-item-title>
                <v-divider></v-divider>
                <v-list-item-subtitle v-for="hour in attention" :key="hour.id">
                  {{ hour }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="available">
                  Espacios disponibles para agendar una cita
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                  No existen espacios disponibles para agendar una cita
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn
                rounded
                block
                outlined
                v-if="available"
                v-on:click="sendData(appointment, 'C1')"
              >
                Agedar una cita
              </v-btn>
              <v-btn rounded block outlined disabled v-else
                >Agedar una cita</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Citas
      :appointment="appointment"
      :dialog="dialog"
      :value="value"
      @close="dialog = false"
    />
  </div>
</template>

<script>
import Citas from "@/components/Citas.vue";
import { db } from "@/firebaseConfig.js";

export default {
  name: "HospitalsInfo",
  components: {
    Citas
  },

  data() {
    return {
      name: "",
      address: "",
      telephones: "",
      web: "",
      email: "",
      facebook: "",
      specialties: [],
      services: [],
      attention: [],
      available: Boolean,
      appointment: {},
      dialog: false,
      value: "",
      items: [
        {
          src:
            "https://www.boliviaentusmanos.com/amarillas/blogos/clinica-los-angeles-logo.jpg"
        },
        {
          src:
            "https://www.lostiempos.com/sites/default/files/styles/noticia_home_apertura/public/media_imagen/2017/1/21/1eesp02-03_los_angeles.jpg?itok=Rt7zY4Eg"
        },
        {
          src:
            "https://correodelsur.com/img/contents/images_980/2017/06/25/nota63825_imagen63141.jpg"
        },
        {
          src:
            "https://www.boliviaentusmanos.com/amarillas1/businesscard/imagenes/clinica_los_angeles_1.jpg"
        }
      ]
    };
  },
  computed: {},
  mounted() {
    this._retrieveData();
  },
  methods: {
    sendData: function(appointment, value) {
      this.appointment = {
        ...appointment
      };
      this.dialog = true;
      this.value = value;
    },

    _retrieveData() {
      db.collection("clinicas")
        .doc("C1")
        .get()
        .then(querySnapshot => {
          this.name = querySnapshot.data().name;
          console.log(querySnapshot.data().name);
          this.address = querySnapshot.data().location;
          this.web = querySnapshot.data().webpage;
          this.email = querySnapshot.data().email;
          this.facebook = querySnapshot.data().facebook;

          let cont=0;
          querySnapshot.data().attention.forEach((hour) => {
            if (cont == 0){
              this.attention.push("Lunes: "+hour);
              cont++;
            }else if (cont == 1){
              this.attention.push("Martes: "+hour);
              cont++;
            }else if (cont == 2){
              this.attention.push("Miércoles: "+hour);
              cont++;
            }else if (cont == 3){
              this.attention.push("Jueves: "+hour);
              cont++;
            }else if (cont == 4){
              this.attention.push("Viernes: "+hour);
              cont++;
            }else if (cont == 5){
              this.attention.push("Sábado: "+hour);
              cont++;
            }else if (cont == 6){
              this.attention.push("Domingo: "+hour);
              cont=0;
            }
          });
          querySnapshot.data().phones.forEach((phone) => {
            if (this.telephones == "") {
              this.telephones = phone;
            } else {
              this.telephones = this.telephones + " - " + phone;
            }
          });
          querySnapshot.data().specialties.forEach((specialty) => {
            this.specialties.push(specialty);
          });
          querySnapshot.data().services.forEach((service) => {
            this.services.push(service);
          });
          if (querySnapshot.data().availability) this.available = true;
          else this.available = false;
        });
    }
  }
};
</script>
