<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="7">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-avatar tile size="100" color="grey">
                <v-img :src="this.img"></v-img>
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
          <v-card class="pa-2" outlined tile height="150">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Contactos
                </v-list-item-title>
                <v-divider></v-divider>
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
                    :src="item"
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
                  <!-- <v-img -->
                  <!-- src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU0v7eyrhtZP0te27KU_5_PabF_z_sVE75Cw&usqp=CAU" -->
                  <!-- ></v-img> -->
                  <gmaps-map :options="mapOptions">
                    <gmaps-marker
                      :key="index"
                      v-for="(m, index) in markers"
                      :position="m.position"
                      :title="m.title"
                      :clickable="true"
                      :draggable="true"
                      @click="center = m.position"
                    ></gmaps-marker>
                  </gmaps-map>
                </v-list-item-avatar>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" md="6">
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
        <v-col cols="6" md="6">
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
                v-on:click="sendData(appointment, value)"
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
import { gmapsMap, gmapsMarker } from "x5-gmaps";

export default {
  name: "HospitalsInfo",
  components: {
    Citas,
    gmapsMap,
    gmapsMarker
  },

  data() {
    return {
      id: "",
      name: "",
      address: "",
      telephones: "",
      email: "",
      facebook: "",
      specialties: [],
      attention: [],
      available: Boolean,
      img: "",
      items: [],
      appointment: {},
      dialog: false,
      value: this.$route.params.id,
      lat: Number,
      lng: Number,
      markers: [
        {
          //position: { lat: this.lat, lng: this.lng },
          position: { lat: -17.377195905887, lng: -66.156870748678 },
          title: this.name
        }
      ],
      mapOptions: {
        // center: { lat: this.lat, lng: this.lng },
        center: { lat: -17.377195905887, lng: -66.156870748678 },
        zoom: 18
      },
    };
  },
  computed: {},
  mounted() {
    this.id = this._getId();
    this._retrieveData();
  },
  methods: {
    _getId() {
      return this.$route.params.id;
    },
    
    sendData: function(appointment, value) {
      this.appointment = {
        ...appointment
      };
      this.dialog = true;
      this.value = value;
    },
    
    _retrieveData() {
      db.collection("medicosInd")
        .doc(this.id)
        .get()
        .then((querySnapshot) => {
          this.name =
            querySnapshot.data().name + " " + querySnapshot.data().lastname;
          this.address = querySnapshot.data().location;
          this.web = querySnapshot.data().webpage;
          this.email = querySnapshot.data().email;
          this.facebook = querySnapshot.data().facebook;
          this.img = querySnapshot.data().img;
          this.lat = querySnapshot.data().position.lat;
          this.lng = querySnapshot.data().position.lng;
          console.log("Position: " + this.lat + " , " + this.lng);

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

          if (querySnapshot.data().availability) this.available = true;
          else this.available = false;

          this._getAttention(querySnapshot.data().attention);
          this._getSpecialties(querySnapshot.data().specialties);
          this._getImages(querySnapshot.data().carrousel);
        });
    },
    
    _getAttention(attentionArray) {
      let cont = 0;
      attentionArray.forEach((hour) => {
        if (cont == 0) {
          this.attention.push("Lunes: " + hour);
          cont++;
        } else if (cont == 1) {
          this.attention.push("Martes: " + hour);
          cont++;
        } else if (cont == 2) {
          this.attention.push("Miércoles: " + hour);
          cont++;
        } else if (cont == 3) {
          this.attention.push("Jueves: " + hour);
          cont++;
        } else if (cont == 4) {
          this.attention.push("Viernes: " + hour);
          cont++;
        } else if (cont == 5) {
          this.attention.push("Sábado: " + hour);
          cont++;
        } else if (cont == 6) {
          this.attention.push("Domingo: " + hour);
          cont = 0;
        }
      });
    },
    
    _getSpecialties(specialtiesArray) {
      specialtiesArray.forEach((specialty) => {
        db.collection("especialidades")
          .doc(specialty)
          .get()
          .then((querySnapshot) => {
            this.specialties.push(querySnapshot.data().name);
          });
      });
    },
    
    _getImages(imagesArray) {
      imagesArray.forEach((image) => {
        this.items.push(image);
      });
    }
  },
};
</script>
