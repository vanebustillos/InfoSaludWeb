import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { db } from "@/firebaseConfig.js";

export default new Vuex.Store({
  state: {
    hospitals: null
  },
  mutations: {
    set_hospital: (state, hospital) => {
      state.hospitales.push(hospital);
      db.hospitalCollection.doc(hospital.id).set(hospital);
    },
    getHospitals: state => {
      let items = [];
      db.collection("hospitales")
        .orderBy("created_at")
        .onSnapshot(snapshot => {
          items = [];
          snapshot.forEach(doc => {
            items.push({
              id: doc.id,
              attention: doc.data().attention,
              availability: doc.data().availability,
              description: doc.data().description,
              email: doc.data().email,
              facebook: doc.data().facebook,
              location: doc.data().location,
              name: doc.data().name,
              phones: doc.data().phones,
              position: doc.data().position,
              services: doc.data().services,
              specialties: doc.data().specialties,
              type: doc.data().type,
              webpage: doc.data().webpage
            });
          });
          state.hospitals = items;
        });
    }
  },
  actions: {
    setHospital: ({ commit }, hospital) => {
      commit("set_hospital", hospital);
    },
    getHospitals: context => {
      context.commit("getHospitals");
    }
  },
  getters: {
    getHospitals(state) {
      return state.hospitales;
    },
    getHospitalsData(state) {
      return state.hospitals;
    }
  },
  modules: {}
});
