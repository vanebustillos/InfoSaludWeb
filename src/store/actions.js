" use strict";

const setAppointment = ({ commit }, appointmentToAdd) => {
  commit("mutateAddAppointment", appointmentToAdd);
};

const setHospital = ({ commit }, hospital) => {
  commit("set_hospital", hospital);
};
export default {
  setAppointment,
  setHospital
};
