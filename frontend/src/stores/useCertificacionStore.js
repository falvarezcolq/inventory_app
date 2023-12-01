import { defineStore } from 'pinia';


function InitialData(){
  return {
    id_persona: 0,
    id_proceso: 0,
    cod_area: '',
  }
}

export const useCertificacionStore = defineStore('certificacion', {
  state: () => ( new InitialData() ),
  actions: {
    addIDPersona(payload){
      this.id_persona = payload;
    },
    addIDProceso(payload){
      this.id_proceso = payload;
    },
    addCodArea(paylod){
      this.cod_area = paylod;
    },
    reset(){
      Object.assign(this,new InitialData());
    }
  },
  getters: {
    getIDPersona: (state) => state.id_persona,
    getIDProceso: (state) => state.id_proceso,
    getCodArea: (state) => state.cod_area,
  },
  //persist: true,

});