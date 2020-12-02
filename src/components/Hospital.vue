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
            :items="especialties"
            v-model="selectedEspecialty"
            item-text="name"
            label="Especialidades"
            outlined
            solo
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          <v-btn img color="primary" i:hover fab>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row v-for="(hospital, index) in hospitals" :key="index">
        <v-col class="mx-auto" cols="12" md="8">
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
              <v-btn
                class="ma-2"
                id="info"
                :rounded="true"
                color="#D6DBDF"
                @click.stop="openInfoDialog(hospital.id)"
                >Ver más</v-btn
              >
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
export default {
  data() {
    return {
      hospitals: [],
      especialties: [],
      selectedRegion: null,
      selectedEspecialty: "",
      regions: ["Cercado", "Colcapirhua", "Tiquipaya", "Quillacollo", "Sacaba"]
    };
  },
  created() {
    this._getHospitales();
    this._getEspecialties();
  },
  computed: {
    ...mapGetters(["getHospitalsData"])
  },
  methods: {
    ...mapActions(["getHospitals", "getDatos"]),
    async _getHospitales() {
      db.collection("hospitales")
        .limit(2)
        .orderBy("id")
        .get()
        .then(querySnapshot => {
          //Get the last element
          this.last = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(doc => {
            this.hospitals.push(doc.data());
          });
        });
    },
    async _getEspecialties() {
      db.collection("especialidades")
        .limit(2)
        .orderBy("name")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.especialties.push(doc.data());
          });
        });
    }
  }
};
</script>
