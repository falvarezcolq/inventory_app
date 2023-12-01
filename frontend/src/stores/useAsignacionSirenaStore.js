import { defineStore } from 'pinia';

export const useAsignacionSirenaStore= defineStore('adicionales', {
  state: () => (
    {
      id_solicitud: 0,
      id_persona: 0,
      origen: 0,
      punto: '',
      fecha: '',
    } 
  ),
  
  actions: {
    addIDSolicitud(payload){this.id_solicitud = payload},
    addFechaSolicitud(payload){this.fecha = payload},
    addIDOrigen(payload){this.origen =payload},
    addIDPunto(payload){this.punto =payload},
    addIDPersonaSirena(payload){
      this.id_persona = payload;
    },
  },

  getters: {
    getIDSolicitud: (state) => state.id_solicitud,
    getIDFecha: (state) => state.fecha,
    getIDOrigen: (state) => state.origen,
    getIDPunto: (state) => state.punto,
    getIDPersonaSirena: (state) => state.id_persona,
  },
  //persist: true,

});


