<template>
  <div>
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
      medicos: []
    };
  },
  created() {
    this._getmedicos();
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
    }
  }
};
</script>
