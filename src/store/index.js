import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const db = require("@/firebaseConfig.js");

export default new Vuex.Store({
  state: {
    hospitales: [
      {
        id: "H",
        name: "H",
        location: "H",
        map: 0,
        description: "H",
        schedule: "H",
        phones: [],
        email: "",
        specialties: [],
        availabilityEmergencyRoom: "H",
        public_private: "H"
      }
    ]
  },
  mutations: {
    set_hospital: (state, hospital) => {
      state.hospitales.push(hospital);
      db.hospitalCollection.doc(hospital.id).set(hospital);
    }
  },
  actions: {
    setHospital: ({ commit }, hospital) => {
      commit("set_hospital", hospital);
    }
  },
  getters: {
    getHospitals(state) {
      return state.hospitales;
    }
  },
  modules: {}
});
