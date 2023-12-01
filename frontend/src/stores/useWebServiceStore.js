import { defineStore } from 'pinia'

function InitialState(){
  return {
    usuario:null,
  }
}

export const useWebServiceStore = defineStore('webservices', {
  state: () => (new InitialState() ),
  actions: {
    addUsuario( payload ){
      this.usuario = payload;
    },
    reset(){
       Object.assign(this, new InitialState())
    },
  },
  getters: {
    getUsuario: (state) => state.usuario,
  },
})
