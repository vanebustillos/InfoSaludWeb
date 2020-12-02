<template>
  <div>
    <v-container fluid>
      <v-row align="center">
        <v-spacer></v-spacer>
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
      <v-row v-for="(medico, index) in medicos" :key="index">
        <v-col cols="12" md="7">
          <v-card tile hover>
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
              <v-btn
                class="ma-2"
                id="info"
                :rounded="true"
                @click.stop="openInfoDialog(medico.id)"
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
      medicos: [],
      especialties: [],
      selectedEspecialty: ""
    };
  },
  created() {
    this._getmedicos();
    this._getEspecialties();
  },
  computed: {
    ...mapGetters(["getmedicosData"])
  },
  methods: {
    ...mapActions(["getmedicos"]),
    _getmedicos() {
      db.collection("medicosInd")
        .limit(2)
        .orderBy("id")
        .get()
        .then(querySnapshot => {
          //Get the last element
          this.last = querySnapshot.docs[querySnapshot.docs.length - 1];
          querySnapshot.forEach(doc => {
            this.medicos.push(doc.data());
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
