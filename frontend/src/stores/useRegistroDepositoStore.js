import { defineStore } from 'pinia';

export const useRegistroDepositoStore= defineStore('adicionales', {
  state: () => (
    {
        datos:{
          cod_inicio: "" ,
          nro_form: "" ,
          tipo_deposito: "" ,
          nro_deposito: "" ,
          moneda: "" ,
          monto: "" ,
          literal: "" ,
          fecha_deposito: "" ,
          descripcion: "" ,
          cod: "" ,
          cur: "" ,
          fecha_ingreso: "" ,
          puc: "" ,
          tipo_rec: "" ,
          pago: "" ,
          fecha_ini_multa: "" , 
          fecha_fin_multa: "" ,
         
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