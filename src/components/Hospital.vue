<template>
  <div class="text-center">
    <v-btn class="ma-2" large @click="addhospital()">cargar Hospital</v-btn>
    <h1>This is an</h1>
  </div>
</template>
<script>
//import { mapActions } from "vuex";
const db = require("@/firebaseConfig.js");
export default {
  name: "Hospital",
  //data() {
  //  return 0;
  //},
  computed: {},
  methods: {
    // ...mapActions(["setHospital"]),
    addhospital() {
      //this.setHospital({
      db.hospitalCollection.doc("H1").set({
        id: "H1",
        name: "Univalle",
        location: "Tiquipaya",
        map: 12,
        description: "sad",
        schedule: "saa",
        phones: [4312334, 43424],
        email: "@w",
        specialties: ["sa", "sasa"],
        availabilityEmergencyRoom: "ds",
        public_private: "private"
      });
      console.log("saved");
    }
  }
};
</script>
