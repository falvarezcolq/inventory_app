import { defineStore } from 'pinia';

export const useAdicionalesCRStore= defineStore('adicionales', {
  state: () => (
    {
        datos:{
          tipo_organizacion: "",
          actividad_desempenado: "",
          nombre_organizacion: "",       
          rubro: "",
          tipo_contrato: "",
          duracion_contrato: "",
          tiempo_contrato: "",
          cd_departamento: "",
          cd_provincia: "",
          cd_localidad: "",
          cd_direccion: "",
          cd_telefono: "",
          cd_roe: "",
          cd_tipo_moneda: "",
          cd_monto: "",
            
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