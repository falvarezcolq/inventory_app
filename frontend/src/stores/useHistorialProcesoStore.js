import { defineStore } from 'pinia';

export const useHistorialProcesoStore= defineStore('historialProceso', {
  state: () => (
    {
      datos:{
        cod_destino:""            
      }
    }
  ),
  actions: {
    addCodDestino(payload){
      this.cod_destino=payload
    }
  },
  getters: {
    getCodDestino: (state) => state.cod_destino
  }
});