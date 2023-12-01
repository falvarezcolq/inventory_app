import { defineStore } from 'pinia';
function InitialState(){
  return {
    cod_inicio:"",
    fecha_emision_permanencia:"",
    cod_registro:"",
    fecha_conclusion_permanencia:"",
    tipo_tramite:"",
    nombres_apellidos:"",
    fecha_nacimiento:"",
    tipo_documento:"",
    nacionalidad:"",
    nro_documento:"",
    sexo:"",
    tramite:"",
    cite_informe_extranjeria:"",
    fecha_informe_extranjeria:"",
    id_persona:0,
    dias_afuera:""
  }
}
export const useCancelacionStore= defineStore('cancelacion', {
  state: () => (new InitialState() ),
  actions: {
    addCodInicio(payload){
      this.cod_inicio=payload
    },
    addFechaEmisionPermanencia(payload){
      this.fecha_emision_permanencia=payload
    },
    addCodRegistro(payload){
      this.cod_registro=payload
    },
    addFechaConclusionPermanencia(payload){
      this.fecha_conclusion_permanencia=payload
    },
    addTipoTramite(payload){
      this.tipo_tramite=payload
    },
    addNombreApellido(payload){
        this.nombres_apellidos = payload
    },
    addTipoDocumento(paylod){
        this.tipo_documento=paylod
    },
    addNumeroDoc(payload){
        this.nro_documento=payload
    },
    addFechaNac(payload){
        this.fecha_nacimiento=payload
    },
    addNacionalidad(payload){
        this.nacionalidad=payload
    },
    addSexo(payload){
        this.sexo=payload
    },
    addCiteInforme(payload){
      this.cite_informe_extranjeria=payload
    },
    addFechaInforme(payload){
      this.fecha_informe_extranjeria=payload
    },
    addIdPersona(payload){
      this.id_persona=payload
    }, 
    addDiaAfuera(payload){
      this.dias_afuera=payload
    },

    reset(){
      Object.assign(this, new InitialState())
    }
  },
  getters: {
    getCodInicio:(state)=>state.cod_inicio,
    getCodRegistro: (state) => state.cod_registro,
    getNombreApellido: (state) => state.nombres_apellidos,
    getTipoDocumento: (state) => state.tipo_documento,
    getNumeroDoc: (state) => state.nro_documento,
    getFechaNac: (state) => state.fecha_nacimiento,
    getNacionalidad: (state) => state.nacionalidad,
    getSexo: (state) => state.sexo,
    getIdPersona: (state) => state.id_persona,
    getFechaVisa: (state) => state.fecha_emision_permanencia,
    getFechaConVisa: (state) => state.fecha_conclusion_permanencia,
    getTipoTramite: (state) => state.tipo_tramite,
    getCodTramite: (state) => state.cod_inicio,
    getCiteInformeExtr:(state)=>state.cite_informe_extranjeria,
    getFechaInformeExtr:(state)=>state.fecha_informe_extranjeria,
    getDiasAfuera:(state)=>state.dias_afuera
  }
});