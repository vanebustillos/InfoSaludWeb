<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo1.jpg"
          transition="scale-transition"
          width="200"
        />
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon @click="home()">
          <v-icon>mdi-home</v-icon>
          <label>Inicio</label>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon @click="hospital()">
          <v-icon>mdi-hospital-building</v-icon>
          <label>hospitales</label>
        </v-btn>
        <!-- </router-link> -->
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon @click="clinicas()">
          <v-icon>mdi-hospital</v-icon>
          <label>clínicas</label>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon @click="medicos()">
          <v-icon>mdi-doctor</v-icon>
          <label>médicos</label>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";
import router from "@/router/index.js";
export default {
  name: "App",
  router,
  components: {
    // HelloWorld
  },

  data() {
    return {};
  },
  methods: {
    home() {
      this.$router.push("/").catch(() => {});
    },
    hospital() {
      this.$router.push("/hospitales").catch(() => {});
    },
    clinicas() {
      this.$router.push("/clinicas").catch(() => {});
    },
    medicos() {
      this.$router.push("/medicos").catch(() => {});
    }
  }
};
</script>
