import { defineStore } from 'pinia';

export const useAdicionalesStore= defineStore('adicionales', {
  state: () => (
    {
        datos:{
            fecha_emision: "",
            fecha_expiracion: "",
            estado_civil: "",
            nro_hijos: "",
            grado_instruccion: "",
            profesion: "",
            ocupacion: "",
            tiempo: "",
            tipo_permanencia:"",            
            departamento: "",
            provincia: "",
            localidad: "",
            tipo_hospedaje: "",
            nombre_hospedaje: "",
            direccion_zona: "",
            direccion_calles: "",
            motivo_solicitud: "",
            actividad_desarrollar: "",
            contrato_trabajo: "",
            tipo_ing_economico: "",
            relacion_tutor: "",
            nombre_tutor: "",
            primer_ap_tutor: "",
            segundo_ap_tutor:"",
            otro_ap_tutor:"",
            nacionalidad_tutor,
            tipo_doc_tutor,
            num_doc_tutor: "",
            tipo_referencia: "",
            lugar_referencia:"",
            nombre_referencia: "",
            celular_referencia:"",
            punto_control:"",
            fecha_ingreso: "",
            nombre_col_ins_univ:"",
            direccion_col_ins_univ:"",
            nro_resolucionConare:"",
            fecha_resolucionConare:"",
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