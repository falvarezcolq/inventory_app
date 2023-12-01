import { defineStore } from 'pinia';


function InitialData(){
  return {
    id_persona: 0,
    id_proceso: 0,
    id_tramite: 0,
    cod_tramite: '',
    cod_inicio: '',
    tramite: null,
    tipo_tramite: '',
    proceso_inicio: null,
  }
}

export const useRegistroStore = defineStore('registro', {
  state: () => ( new InitialData() ),
  actions: {
    addIDPersona(payload){
      this.id_persona = payload;
    },
    addIDTramite(payload){
      this.id_tramite = payload;
    },
    addIDProceso(payload){
      this.id_proceso = payload;
    },
    addCodTramite(payload){
      this.cod_tramite = payload;
    },
    addCodInicio(payload){
      this.cod_inicio = payload;
    },
    addTramite(payload){
      this.tramite = payload;
    },
    addTipoTramite(payload){
      this.tipo_tramite = payload;
    },
    addProcesoInicio(payload){
      this.proceso_inicio = payload;
    },
    reset(){
      Object.assign(this,new InitialData());
    }
  },
  getters: {
    getIDPersona: (state) => state.id_persona,
    getIDTramite: (state) => state.id_tramite,
    getIDProceso: (state) => state.id_proceso,
    getCodInicio: (state) => state.cod_inicio,
    getCodTramite: (state) => state.cod_tramite,
    getTramite: (state) => state.tramite,
    getTipoTramite: (state) => state.tipo_tramite,
    getProcesoInicio:(state) => state.proceso_inicio,
  },
  //persist: true,

});