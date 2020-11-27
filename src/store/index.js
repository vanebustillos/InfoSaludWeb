import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const db = require("@/firebaseConfig.js");

export default new Vuex.Store({
  state: {
    hospital: [
      /*  {
        id: "",
        name: "",
        location: "",
        map: 0,
        description: "",
        schedule: "",
        phones: [],
        email: "",
        specialties: [],
        availabilityEmergencyRoom: "",
        public_private: ""
      }*/
    ]
  },
  mutations: {
    set_hospital: (state, hospital) => {
      state.hospital.push(hospital);
      db.hospitalCollection.doc(hospital.id).set(hospital);
    }
  },
  actions: {
    setHospital: ({ commit }, hospital) => {
      commit("set_hospital", hospital);
    }
  },
  modules: {}
});
