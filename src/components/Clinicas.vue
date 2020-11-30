<template>
  <div>
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
      clinicas: []
    };
  },
  created() {
    this._getclinicas();
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
    }
  }
};
</script>
