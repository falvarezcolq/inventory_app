import { defineStore } from 'pinia';

export const useAdicionalesSRStore= defineStore('adicionales', {
  state: () => (
    {
        datos:{
          actividad_desempena: "" ,
          tiempo_actividad: "",
          tiempo_actividad_anios: "",          
          departamento: "",
          provincia: "",
          localidad: "",
          lugar_direccion: "",
          roe: "",
          sd_tipo_moneda: "",
          monto: "",
            
        }
    }
  ),
  actions: {
    addIDProceso(payload){
      this.id_proceso = payload
    }
  },
  getters: {
    getIDProceso: (state) => state.id_proceso,
  },
  //persist: true,

});