import { defineStore } from 'pinia';

export const useAdicionalesDConyugueStore= defineStore('adicionales', {
  state: () => (
    {
        datos:{
          nombres: "",
          primer_apellido: "",
          segundo_apellido: "",
          otro_apellido: "",
          genero: "",
          fecha_nacimiento: "",
          nacionalidad: "",
          lugar_nacimiento: "",
          grado_instruccion: "",
          profesion: "",
          ocupacion: "",
          nro_hijos: "",
          direccion: "",
          telefono: "",
          tiempo_perm: "",
          tiempo_permanencia: "",
          email: "",
          tipo_documento: "",
          nro_documento: "",
          fecha_emision: "",
          fecha_expiracion: "",
          lugar_emision: "",
            
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