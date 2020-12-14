import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
// import * as vueGoogleApi from "vue-google-api";
import x5GMaps from "x5-gmaps";
// Vue.use(vueGoogleApi, {
// load: { key: "AIzaSyAEVJ4DoKRtV2DziWUDNCQMA5IGOiU02E0" }
// });
Vue.use(x5GMaps, "AIzaSyAEVJ4DoKRtV2DziWUDNCQMA5IGOiU02E0");

// const vue_config = {
// apiKey: "AIzaSyAEVJ4DoKRtV2DziWUDNCQMA5IGOiU02E0"
// };

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  // vueGoogleApi,
  // vue_config,
  render: h => h(App)
}).$mount("#app");
