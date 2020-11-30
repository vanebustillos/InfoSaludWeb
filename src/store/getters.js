" use strict";

const getAppointments = state => {
  return state.appointments;
};

const getHospitals = state => {
  return state.hospitales;
};
export default {
  getAppointments,
  getHospitals
};
