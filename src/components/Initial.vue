<template>
  <div>
    <br />
    <v-row class="mb-6" justify="center" dense>
      <v-col cols="10">
        <v-carousel
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          height="550"
          cycle
          show-arrows-on-hover
        >
          <div class="secondary" dark>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
          </div>
        </v-carousel>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row class="mb-6" justify="center" dense>
        <v-col v-for="card in cards" :key="card.title" cols="3">
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
      items: [
        {
          src:
            "https://www.lostiempos.com/sites/default/files/styles/noticia_detalle/public/media_imagen/2010/2/12/103224.jpg?itok=0ZxcMBJM"
        },
        {
          src:
            "https://isaicontroles.com/wp-content/uploads/2018/11/clinica-ebriovid-2-2000x1200.jpg"
        },
        {
          src:
            "https://elpotosi.net/img/contents/images_980/2020/06/23/819958af-951d-45af-a426-aa671e00f701.jpg"
        }
      ]
    };
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
    }
  }
};
</script>
