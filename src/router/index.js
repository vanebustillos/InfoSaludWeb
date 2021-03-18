import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/hospitales",
    name: "Hospital",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Hospital.vue")
  },
  {
    path: "/clinicas",
    name: "Clinicas",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Clinicas.vue")
  },
  {
    path: "/medicos",
    name: "Medicos",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Medicos.vue")
  },
  {
    path: "/hospitalsInfo/:id",
    name: "HospitalsInfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/HospitalsInfo.vue")
  },
  {
    path: "/clinicsInfo/:id",
    name: "ClinicsInfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/ClinicsInfo.vue")
  },
  {
    path: "/independentDocsInfo/:id",
    name: "IndependentDocsInfo",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/IndependentDocsInfo.vue"
      )
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
