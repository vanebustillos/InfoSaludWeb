<template>
  <div>
    <v-row class="mb-6" justify="center" dense>
      <v-col color="secondary" cols="11">
        <v-carousel
          :cycle="cycle"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          height="300"
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row class="mb-6" justify="center" dense>
        <v-col v-for="card in cards" :key="card.title" cols="3">
          <v-card color="secondary" dark @click="routingViews(card.title)">
            <div align="center">
              <v-icon size="100">{{ card.icon }}</v-icon>
              <!--v-img :src="card.src" class="white--text align-end" height="180px"-->
            </div>
            <v-card-title v-text="card.title"></v-card-title>
            <!--/v-img-->

            <v-card-actions>
              <v-spacer></v-spacer>
              <span>{{ card.description }}</span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import hospitalImg from "@/assets/hospital.png";
export default {
  name: "Initial",
  data() {
    return {
      cards: [
        {
          title: "Hospitales",
          src: hospitalImg,
          icon: "mdi-hospital-building",
          description: "descripción de hospitales"
        },
        {
          title: "Clínicas",
          src: hospitalImg,
          icon: "mdi-hospital",
          description: "descripción de clínicas"
        },
        {
          title: "Médicos",
          src: hospitalImg,
          icon: "mdi-doctor",
          description: "descripción de Médicos"
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
      if (clicked == "Hospitales") {
        this.$router.push("/about");
      }
      if (clicked == "Clínicas") {
        this.$router.push("/hospital");
      }
      if (clicked == "Médicos") {
        this.$router.push("/about");
      }
    }
  }
};
</script>
