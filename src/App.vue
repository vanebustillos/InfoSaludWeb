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
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
          <label>Inicio</label>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon>
          <v-icon>mdi-hospital-building</v-icon>
          <label>hospitales</label>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon>
          <v-icon>mdi-hospital</v-icon>
          <label>clínicas</label>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn icon>
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
    <div><br /></div>
    <v-main>
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
  }
};
</script>
