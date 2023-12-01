import { defineStore } from 'pinia'

function InitialState(){
  return {
  id_persona: 0,
  id_tramite: 0,
  id_proceso_proceso: 0,
  id_definitiva: 0,
  cod_tramite: '',
  tipo_tramite: '',
  estado_civil: '',
  edad: 0,
  nroFojas:'',
  cantDocIdentidad:null,
  observacion:'',
  fotoInicio:null,
  tramite_data:null,
  inicio: {
    persona: { module: false, data: null },
    tramite: { module: false, data: null },
    requisitos: { module: false, data: null },
    datos_adicionales: { module: false, data: null },
    datos_adicionalesSR: { module: false, data: null },
    datos_adicionalesCR: { module: false, data: null },
    datos_adicionalesDConyugue: { module: false, data: null },
    datos_adicionalesOtroIng: { module: false, data: null },
    documentos: { module: false, data: null },
  }}
}

export const useInicioStore = defineStore('inicio', {
  state: () => (new InitialState() ),
  actions: {
    addIDPersona(id_persona){
      this.id_persona = id_persona;
    },
    addIDTramite(id_tramite){
      this.id_tramite = id_tramite;
    },
    addCodTramite(cod_tramite){
      this.cod_tramite = cod_tramite;
    },
    addTipoTramite(tipo_tramite){
      this.tipo_tramite = tipo_tramite;
    },

    addEstadoCivil(estado_civil){
      this.estado_civil = estado_civil;
    },
    addIDProceso(id_proceso_proceso){
      this.id_proceso_proceso = id_proceso_proceso;
    },
    addPersona(persona){
      this.inicio.persona.module = true;
      this.inicio.persona.data = persona;
    },
    addTramite(tramite){
      this.inicio.tramite.module = true;
      this.inicio.tramite.data = tramite;
    },
    addDefinitiva(definitiva){
      this.inicio.definitiva.module = true;
      this.inicio.definitiva.data = definitiva;
    },
    addRequisitos(requisitos){
      this.inicio.requisitos.module = true;
      this.inicio.requisitos.data = requisitos;
    },
    addDatosAdicionales(datos_adicionales){
      this.inicio.datos_adicionales.module = true;
      this.inicio.datos_adicionales.data = datos_adicionales;
    },
    addDatosAdicionalesSR(datos_adicionalesSR){
      this.inicio.datos_adicionalesSR.module = true;
      this.inicio.datos_adicionalesSR.data = datos_adicionalesSR;
    },
    addDatosAdicionalesCR(datos_adicionalesCR){
      this.inicio.datos_adicionalesCR.module = true;
      this.inicio.datos_adicionalesCR.data = datos_adicionalesCR;
    },
    addDatosAdicionalesDConyugue(datos_adicionalesDConyugue){
      this.inicio.datos_adicionalesDConyugue.module = true;
      this.inicio.datos_adicionalesDConyugue.data = datos_adicionalesDConyugue;
    },
    addDatosAdicionalesOtroIng(datos_adicionalesOtroIng){
      this.inicio.datos_adicionalesOtroIng.module = true;
      this.inicio.datos_adicionalesOtroIng.data = datos_adicionalesOtroIng;
    },
    addEdad(paylod){
      this.edad = paylod;
    },
    addNroFojas(paylod){
      this.nroFojas = paylod;
    },
    addCantDocIdentidad(paylod){
      this.cantDocIdentidad = paylod;
    },
    addObservacion(paylod){
      this.observacion = paylod;
    },
    addFotoInicio(payload){
      this.fotoInicio =payload;
    },

    addTramiteData(payload){
      this.tramite_data = payload;
    },
    
    reset(){
       Object.assign(this, new InitialState())
    },
  },
  getters: {  
    getIDPersona: (state) => state.id_persona,
    getIDTramite: (state) => state.id_tramite,
    getIDProcesoInicio: (state) => state.id_proceso_proceso,
    getPersona: (state) => state.inicio.persona,
    getTramite: (state) => state.inicio.tramite,
    getRequisitos: (state) => state.inicio.requisitos,
    getCodTramite: (state) => state.cod_tramite,
    getTipoTramite: (state) => state.tipo_tramite,
    getEstadoCivil: (state) => state.estado_civil,
    getDatosAdicionales:(state)=> state.inicio.datos_adicionales,
    getDatosAdicionalesSR: (state) => state.inicio.datos_adicionalesSR,
    getDatosAdicionalesCR: (state) => state.inicio.datos_adicionalesCR,
    getDatosAdicionalesDConyugue: (state) => state.inicio.datos_adicionalesDConyugue,
    getDatosAdicionalesOtroIng: (state) => state.inicio.datos_adicionalesOtroIng,
    getEdad: (state) => state.edad,
    getNroFojas: (state) => state.nroFojas,
    getCantDocIdentidad: (state) => state.cantDocIdentidad,
    getObservacion: (state) => state.observacion,
    getFotoInicio:(state) => state.fotoInicio,
    getTramiteData:(state)=>state.tramite_data

  },

})
