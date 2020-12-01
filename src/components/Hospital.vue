<template>
  <div>
    <v-container>
      <v-row v-for="(hospital, index) in hospitals" :key="index">
        <v-col cols="12" md="7">
          <v-card tile hover>
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
              <router-link :to="{
                name: 'HospitalsInfo',
                params: { id: hospital.id }
              }">
                <v-btn
                class="ma-2"
                id="info"
                :rounded="true"
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
      hospitals: []
    };
  },
  router,
  created() {
    this._getHospitales();
  },
  computed: {
    ...mapGetters(["getHospitalsData"])
  },
  methods: {
    ...mapActions(["getHospitals"]),
    _getHospitales() {
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
    }
  }
};
</script>
