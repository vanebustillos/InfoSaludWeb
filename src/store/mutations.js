" use strict";
const db = require("@/firebaseConfig.js");

const mutateAddAppointment = (state, newAppointment) => {
  state.appointments.push(newAppointment);
  db.citasCollection.doc(newAppointment.id).set(newAppointment);
};

const set_hospital = (state, hospital) => {
  state.hospitales.push(hospital);
  db.hospitalCollection.doc(hospital.id).set(hospital);
};
export default {
  mutateAddAppointment,
  set_hospital
};
