<template>
  <div class="text-center">
    <v-btn class="ma-2" large @click.stop="addhospital()">Add Hospital</v-btn>
    <h1>This is an</h1>
  </div>
</template>
<script>
const db = require("@/firebaseConfig.js");
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Hospital",
  //data() {
  //  return 0;
  //},
  computed: {
    ...mapGetters(["getHospitals"])
  },
  methods: {
    ...mapActions(["setHospital"]),
    addhospital() {
      //this.setHospital({
      db.hospitalCollection.doc("H3").set({
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
