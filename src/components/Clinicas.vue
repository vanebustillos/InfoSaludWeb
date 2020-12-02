<template>
  <div>
    <v-container fluid>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="4">
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
        <v-col class="d-flex" cols="12" sm="4">
          <v-btn img color="primary" i:hover>
            Buscar
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row v-for="(clinica, index) in clinicas" :key="index">
        <v-col cols="12" md="7">
          <v-card tile hover>
            <v-list-item three-line>
              <v-list-item-avatar tile size="100" color="#FFFFFF">
                <v-img :src="clinica.img"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  {{ clinica.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon> mdi-map-marker </v-icon>
                  {{ clinica.location }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-icon> mdi-phone </v-icon>
                  {{ clinica.phones }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn
                class="ma-2"
                id="info"
                :rounded="true"
                @click.stop="openInfoDialog(clinica.id)"
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
      clinicas: [],
      especialties: [],
      selectedRegion: null,
      selectedEspecialty: "",
      regions: ["Cercado", "Colcapirhua", "Tiquipaya", "Quillacollo", "Sacaba"]
    };
  },
  created() {
    this._getclinicas();
    this._getEspecialties();
  },
  computed: {
    ...mapGetters(["getclinicasData"])
  },
  methods: {
    ...mapActions(["getclinicas"]),
    _getclinicas() {
      db.collection("clinicas")
        .limit(2)
        .orderBy("id")
        .get()
        .then(querySnapshot => {
          //Get the last element
          this.last = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(doc => {
            this.clinicas.push(doc.data());
          });
        });
    },
    _getEspecialties() {
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
