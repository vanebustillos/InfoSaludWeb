<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="7">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-avatar tile size="100" color="grey">
                <v-img
                  src="https://www.lostiempos.com/sites/default/files/media_imagen/2018/6/27/_dsc4496.jpg"
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
                  Hospital Univalle
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
                <v-list-item-subtitle>
                  {{ attention }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="available">
                  Espacios disponibles en sala de emergencia
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                  No existen espacios disponibles en sala de emergencia
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-btn rounded block outlined v-if="available"
                >Agedar una cita</v-btn
              >
              <v-btn rounded block outlined disabled v-else
                >Agedar una cita</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";
export default {
  name: "HospitalsInfo",
  components: {
    // HelloWorld
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
      attention: "",
      available: Boolean,
      items: [
        {
          src: "https://www.marcelovaldivia.com/img/univalle.png",
        },
        {
          src: "https://lh3.googleusercontent.com/proxy/HhqL0xUfYqYAHmIqLKXEVzUCD90yRIQ_d2gv1P4YsaD0zqxYNXKOA_VkVI4cvACnbSbjDTP0eROclLIGHcZW4kcXKFqtx_4AWvRN2c1jwh93h15JSXby7hEVG1LD49RMr-mLpJi0sMMbj7qMAoq3uB7MFvQ",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzKpAldb8Q1XMfvA1e1E2DQ_YPUAmZh4dMdA&usqp=CAU",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE3XrQjTWLHlKeQHjkuqbpwzAlXbIzy87sFA&usqp=CAU",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    this._retrieveData();
  },
  methods: {
    _retrieveData() {
      db.collection("hospitales")
        .doc("H1")
        .get()
        .then((querySnapshot) => {
          this.name = querySnapshot.data().name;
          this.address = querySnapshot.data().location;
          this.web = querySnapshot.data().webpage;
          this.email = querySnapshot.data().email;
          this.attention = querySnapshot.data().attention;

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
    },
  },
};
</script>
