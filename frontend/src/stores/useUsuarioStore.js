import { defineStore } from 'pinia';
import decode from 'jwt-decode';

export const useUsuarioStore = defineStore( 'usuario', {
  state: () => ({
    usuario: '',
    tokenJWT: '',
    token: '',
    cred:'ailsud9e938fe8h3u6843980jk34j87ijo7',
  }),
  actions: {
    addUsuario(stoken){
      this.usuario = payload;
    },
    addToken(payload){
      this.tokenJWT = payload;
      this.token = decode(payload);
      localStorage.setItem(this.cred, payload);
      this.usuario = this.token.usuario;
    },
    cerrarSesion(){
      localStorage.removeItem(this.cred)
      this.usuario= '';
      this.tokenJWT= '';
      this.token= '';
    },

    verificarAutenticacion(){
      const stoken = localStorage.getItem(this.cred);
      this.tokenJWT = stoken ? stoken:'';
      this.token = stoken ? decode(stoken):'';
      this.usuario = stoken ? this.token.usuario:'';
      this.actualizar = stoken ? this.token.actualizar :false;
    },

  },
  getters: {
    getUsuario: (state) => state.usuario,
    getToken: (state) => {state.token},
    getTokenJWT: (state) => state.tokenJWT,
  },
  //persist: true,
});
