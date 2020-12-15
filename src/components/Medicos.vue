<template>
  <div>
    <v-container fluid>
      <v-row class="mx-auto">
        <v-spacer></v-spacer>
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
        <v-col class="d-flex" cols="12" sm="4">
          <v-btn
            img
            color="primary"
            i:hover
            fab
            v-if="selectedSpecialty"
            @click="filterData()"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row v-for="(medico, index) in filteredData" :key="index">
        <v-col class="mx-auto" cols="12" md="6">
          <v-card tile hover color="#F6F6F6">
            <v-list-item three-line>
              <v-list-item-avatar tile size="100" color="#FFFFFF">
                <v-img :src="medico.img"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  {{ medico.name }}{{ medico.lastname }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon> mdi-map-marker </v-icon>
                  {{ medico.location }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-icon> mdi-phone </v-icon>
                  {{ medico.phones }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <router-link :to="{
                name: 'IndependentDocsInfo',
                params: { id: medico.id }
              }">
                <v-btn
                class="ma-2"
                id="info"
                :rounded="true"
                color="#D6DBDF"
                @click.stop="openInfoDialog(medico.id)"
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
      doctors: [],
      specialties: [],
      selectedSpecialty: "",
      filteredData: []
    };
  },
  router,
  created() {
    this._getdoctors();
    this._getSpecialties();
  },
  computed: {
    ...mapGetters(["getdoctorsData"])
  },
  methods: {
    ...mapActions(["getdoctors"]),
    _getdoctors() {
      db.collection("medicosInd")
        .orderBy("id")
        .get()
        .then(querySnapshot => {
          //Get the last element
          this.last = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(doc => {
            this.doctors.push(doc.data());
            this.filteredData.push(doc.data());
          });
        });
    },
    _getSpecialties() {
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
              this.doctors.forEach(doctor => {
                if (doctor.specialties.includes(doc.id))
                  this.filteredData.push(doctor);
              });
              return;
            }
          });
        });
    }
  }
};
</script>
