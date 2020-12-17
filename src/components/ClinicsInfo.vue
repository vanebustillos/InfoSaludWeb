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
              <span> ({{ averageScores }}) </span>
              <v-rating
                v-model="averageScores"
                background-color="yellow accent-4"
                color="yellow accent-4"
                dense
                half-increments
                hover
                readonly
                size="30"
              ></v-rating>
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
        <v-col cols="12" md="8">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Comentarios
                </v-list-item-title>
                <v-divider></v-divider>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="6" md="4">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Dar puntuación de {{ name }}
                </v-list-item-title>
                <v-divider></v-divider>
                <v-card-actions class="pa-4">
                  <v-spacer></v-spacer>
                  <span> ({{ rating }}) </span>
                  <v-rating
                    v-model="rating"
                    background-color="yellow accent-4"
                    color="yellow accent-4"
                    dense
                    half-increments
                    hover
                    v-if="availableRating"
                    size="30"
                  ></v-rating>
                  <v-rating
                    v-model="rating"
                    background-color="yellow accent-4"
                    color="yellow accent-4"
                    dense
                    half-increments
                    hover
                    readonly
                    v-else
                    size="30"
                  ></v-rating>
                  <v-spacer></v-spacer>
                  <v-btn
                    rounded
                    outlined
                    v-if="availableRating"
                    @click="setScore()"
                  >
                    Puntuar
                  </v-btn>
                  <v-btn rounded outlined v-else disabled>
                    Puntuar
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col md="8">
          <Comments place="clinicas" :doc="_getId()" />
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
import Comments from "@/components/Comments.vue";
import Citas from "@/components/Citas.vue";
import { db } from "@/firebaseConfig.js";
import { gmapsMap, gmapsMarker } from "x5-gmaps";

export default {
  name: "HospitalsInfo",
  components: {
    Citas,
    gmapsMap,
    gmapsMarker,
    Comments
  },

  data() {
    return {
      doc: "",
      id: "",
      name: "",
      address: "",
      telephones: "",
      web: "",
      email: "",
      facebook: "",
      lat: Number,
      lng: Number,
      specialties: [],
      services: [],
      attention: [],
      available: Boolean,
      img: "",
      items: [],
      appointment: {},
      dialog: false,
      value: "",
      place: "",
      markers: [
        {
          //position: { lat: this.lat, lng: this.lng },
          position: { lat: -17.37863551610984, lng: -66.16464417294189 },
          title: this.name
        }
      ],
      mapOptions: {
        // center: { lat: this.lat, lng: this.lng },
        center: { lat: -17.37863551610984, lng: -66.16464417294189 },
        zoom: 16
      },
      puntuationTotal: 0,
      rating: 0,
      averageScores: 0,
      availableRating: true,
      quantity: 0
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
    setScore() {
      db.collection("clinicas")
        .doc(this.id)
        .update({
          puntuation: {
            accumulated: this.puntuationTotal + this.rating,
            quantity: this.quantity + 1
          }
        });
      this.availableRating = false;
      console.log("saved");
    },
    _retrieveData() {
      db.collection("clinicas")
        .doc(this.id)
        .get()
        .then(querySnapshot => {
          this.name = querySnapshot.data().name;
          this.address = querySnapshot.data().location;
          this.web = querySnapshot.data().webpage;
          this.email = querySnapshot.data().email;
          this.facebook = querySnapshot.data().facebook;
          this.img = querySnapshot.data().img;
          this.lat = querySnapshot.data().position.lat;
          this.lng = querySnapshot.data().position.lng;
          console.log("Position: " + this.lat + " , " + this.lng);

          querySnapshot.data().phones.forEach(phone => {
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
          this._getServices(querySnapshot.data().services);
          this._getImages(querySnapshot.data().carrousel);
          this._getScore();
        });
    },

    _getAttention(attentionArray) {
      let cont = 0;
      attentionArray.forEach(hour => {
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
      specialtiesArray.forEach(specialty => {
        db.collection("especialidades")
          .doc(specialty)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.data() != null) {
              this.specialties.push(querySnapshot.data().name);
            }
          });
      });
    },

    _getServices(servicesArray) {
      servicesArray.forEach(service => {
        db.collection("servicios")
          .doc(service)
          .get()
          .then(querySnapshot => {
            this.services.push(querySnapshot.data().name);
          });
      });
    },

    _getImages(imagesArray) {
      imagesArray.forEach(image => {
        this.items.push(image);
      });
    },
    _getScore() {
      db.collection("clinicas")
        .doc(this.id)
        .get()
        .then(querySnapshot => {
          this.puntuationTotal = querySnapshot.data().puntuation.accumulated;
          this.quantity = querySnapshot.data().puntuation.quantity;
          this._averageScores();
        });
    },
    _averageScores() {
      if (this.quantity != 0 && this.accumulated != 0) {
        var score = this.puntuationTotal / this.quantity;
        this.averageScores = parseFloat(score.toFixed(1));
        console.log(parseFloat(score));
        console.log(this.averageScores);
      } else {
        this.averageScores = 0;
      }
    }
  }
};
</script>
