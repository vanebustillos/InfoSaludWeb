<template>
  <div>
    <v-container fluid>
      <v-row class="mx-auto">
        <v-col class="d-flex" cols="12" sm="6">
          <v-spacer></v-spacer>
          <v-select
            :items="regions"
            v-model="selectedRegion"
            label="Regiones"
            outlined
            solo
          >
          </v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            :items="specialties"
            v-model="selectedSpecialty"
            item-text="name"
            label="Especialidades"
            outlined
            solo
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          <v-btn
            img
            color="primary"
            i:hover
            fab
            v-if="selectedRegion && selectedSpecialty"
            @click="filterData()"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row v-for="(hospital, index) in filteredData" :key="index">
        <v-col class="mx-auto" cols="12" md="7">
          <v-card tile hover color="#F6F6F6">
            <v-list-item three-line>
              <v-list-item-avatar tile size="100" color="#FFFFFF">
                <v-img :src="hospital.img"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  {{ hospital.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon> mdi-map-marker </v-icon>
                  {{ hospital.location }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-icon> mdi-phone </v-icon>
                  {{ hospital.phones }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <router-link
                :to="{
                  name: 'HospitalsInfo',
                  params: { id: hospital.id }
                }"
              >
                <v-btn class="ma-2" id="info" :rounded="true" color="#D6DBDF"
                  >Ver más</v-btn
                >
              </router-link>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { db } from "@/firebaseConfig.js";
import router from "@/router/index.js";

export default {
  data() {
    return {
      hospitals: [],
      specialties: [],
      selectedRegion: "",
      selectedSpecialty: "",
      regions: [
        "Zona Norte",
        "Colcapirhua",
        "Tiquipaya",
        "Quillacollo",
        "Sacaba",
        "Zona Sud"
      ],
      filteredData: []
    };
  },
  router,
  created() {
    this._getHospitales();
    this._getspecialties();
  },
  computed: {
    ...mapGetters(["getHospitalsData"])
  },
  methods: {
    ...mapActions(["getHospitals", "getDatos"]),
    async _getHospitales() {
      db.collection("hospitales")
        .get()
        .then(querySnapshot => {
          this.last = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(doc => {
            this.hospitals.push(doc.data());
            this.filteredData.push(doc.data());
          });
        });
    },
    async _getspecialties() {
      db.collection("especialidades")
        .orderBy("name")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.specialties.push(doc.data());
          });
        });
    },
    filterData() {
      this.filteredData = [];
      db.collection("especialidades")
        .orderBy("name")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().name === this.selectedSpecialty) {
              this.hospitals.forEach(hospital => {
                if (
                  hospital.specialties.includes(doc.id) &&
                  //doc.data().establishments.includes(hospital.id);
                  hospital.region === this.selectedRegion
                )
                  this.filteredData.push(hospital);
              });
              return;
            }
          });
        });
    }
  }
};
</script>
