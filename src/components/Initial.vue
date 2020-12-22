<template>
  <div>
    <br />
    <v-row class="mb-6" justify="center" dense>
      <v-col cols="10">
        <v-carousel
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          height="570"
          cycle
          show-arrows-on-hover
        >
          <div class="secondary" dark>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item"
            ></v-carousel-item>
          </div>
        </v-carousel>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row class="mb-6" justify="center" dense>
        <v-col v-for="card in cards" :key="card.title" cols="3" md="3">
          <v-card color="primary" dark @click="routingViews(card.title)">
            <div align="center">
              <v-icon size="100">{{ card.icon }}</v-icon>
            </div>
            <v-card-title v-text="card.title"></v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <span>{{ card.description }}</span>
              <v-spacer></v-spacer>
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
  name: "Initial",
  data() {
    return {
      cards: [
        {
          title: "HOSPITALES",
          icon: "mdi-hospital-building",
          description: "Hospitales Públicos y Privados"
        },
        {
          title: "CLÍNICAS",
          icon: "mdi-hospital",
          description: "Clínicas Públicas y Privadas"
        },
        {
          title: "MÉDICOS",
          icon: "mdi-doctor",
          description: "Médicos Privados"
        }
      ],
       items: []
    };
  },
  mounted() {
    this._getImages();
  },
  computed: {},
  methods: {
    routingViews(clicked) {
      if (clicked == "HOSPITALES") {
        this.$router.push("/hospitales").catch(() => {});
      }
      if (clicked == "CLÍNICAS") {
        this.$router.push("/clinicas").catch(() => {});
      }
      if (clicked == "MÉDICOS") {
        this.$router.push("/medicos").catch(() => {});
      }
    },
    async _getImages() {
      await db
        .collection("inicio")
        .doc("I1")
        .get()
        .then(querySnapshot => {
          //  if (querySnapshot.data() != null) {
          querySnapshot.data().carrousel.forEach(image => {
            console.log(image);
            this.items.push(image);
          });
          //   }
          console.log(querySnapshot.data());
        });

      console.log(this.items.length);
      //return this.items;
    }
  }
};
</script>
