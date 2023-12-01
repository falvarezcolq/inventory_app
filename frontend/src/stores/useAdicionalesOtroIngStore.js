import { defineStore } from 'pinia';

export const useAdicionalesOtroIngStore= defineStore('adicionales', {
  state: () => (
    {
        datos:{
          tipo_ingreso: "",
          otro_descripcion: "",
          tipo_moneda: "",
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