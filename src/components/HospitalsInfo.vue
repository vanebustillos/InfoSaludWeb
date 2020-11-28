<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="7">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-avatar tile size="100" color="grey">
                <v-img
                  src="https://www.lostiempos.com/sites/default/files/media_imagen/2018/6/27/_dsc4496.jpg"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Hospital Univalle
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon> mdi-map-marker </v-icon>
                  Av. América entre Libertador Bolivar y Tarija
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-icon> mdi-phone </v-icon>
                  4456812-4623874
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="6" md="5">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Contactos
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon> mdi-web </v-icon>
                  www.hospitalunivalle.com.bo/hospital-de-norte/
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-icon> mdi-email </v-icon>
                  fterrazasi@hospital.univalle.edu
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-icon> mdi-facebook </v-icon>
                  Hospital Univalle
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
      <v-row>
        <v-col cols="12" md="7">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-avatar tile height="250" width="700" color="grey">
                <v-img
                  src="https://lh3.googleusercontent.com/proxy/HD-IeYsFUKqbgYhzULiRvMVtw4tU8GmOn58lFk_AhI6qedKKyS_aElLpY8Msep23b_1kAQXc6Rn2MrPJfhShIg_IaTRMKQYwwmobFZtORXaBOeXJ-t0uJRQLrEPopcwZWECKFfEycYkXcDQo5z4-ZlfYz-8"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="6" md="5">
          <v-card class="pa-2" outlined tile>
            <v-list-item three-line>
              <v-list-item-avatar tile height="250" width="500" color="grey">
                <v-img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU0v7eyrhtZP0te27KU_5_PabF_z_sVE75Cw&usqp=CAU"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <!-- Columns are always 50% wide, on mobile and desktop -->
      <v-row>
        <v-col cols="6" md="4">
          <v-card class="pa-2" height="150" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Especialidades
                </v-list-item-title>
                <v-list-item-subtitle>
                  Pediatría
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Cardiología
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Traumatología
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Gastroentología
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="6" md="4">
          <v-card class="pa-2" height="150" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Otros Servicios
                </v-list-item-title>
                <v-list-item-subtitle>
                  Laboratorio
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Farmacia
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Rayos X
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="6" md="4">
          <v-card class="pa-2" height="150" outlined tile>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  <v-icon> mdi-clock-time-eight-outline </v-icon>
                  Horarios de Atención
                </v-list-item-title>
                <v-list-item-subtitle>
                  24 Horas-Abierto Ahora
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  10 espacios disponibles en sala de emergencia
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HospitalsInfo",
  components: {
    // HelloWorld
  },

  data: () => ({
    //
  }),
};
</script>