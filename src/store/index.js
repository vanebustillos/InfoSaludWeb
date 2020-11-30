import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);
// const db = require("@/firebaseConfig.js");

// export default new Vuex.Store({
const state = {
  idToPass: "",
  hospitales: [
    {
      id: "H",
      name: "H",
      location: "H",
      map: 0,
      description: "H",
      schedule: "H",
      phones: [],
      email: "H",
      specialties: [],
      availabilityEmergencyRoom: "H",
      public_private: "H"
    }
  ],
  appointments: [
    {
      id: "Cita-1",
      clientName: "Andrea",
      clientSurnames: "Villarroel",
      clientCI: "9234609",
      clientPhone: "7773244",
      date: "2020-11-29",
      hour: "9:00"
    }
  ]

  // mutations: {

  // },
  // actions: {
  // },
  // getters: {

  // },
  // modules: {}
};
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {}
});
