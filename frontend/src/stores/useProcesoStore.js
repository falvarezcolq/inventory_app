import { defineStore } from 'pinia';

function InitialState(){
  return {
    id_proceso:0,
    proceso:null,
    impreso:false,
  }
}

export const useProcesoStore = defineStore('proceso', {
  state: () => (new InitialState()
  ),
  actions: {
    addIDProceso(payload){ this.id_proceso = payload  },
    addProceso(payload){ this.proceso = payload },
    addImpreso(payload){ this.impreso = payload },
    reset(){
      Object.assign(this, new InitialState());
    },
  },
  getters: {
    getIDProceso: (state) => state.id_proceso,
    getProceso: (state) => state.proceso,
    getImpreso: (state) => state.impreso,
  },
  //persist: true,

});