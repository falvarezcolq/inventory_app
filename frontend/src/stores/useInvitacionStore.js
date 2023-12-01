import { defineStore } from 'pinia';

export const useInvitacionStore= defineStore('invitacion', {
  state: () => (
    {
      id_proceso:'',
      id_persona:'',
      cod_registro:'',
      cod_inicio:'',
      tramite: '',
      fecha_reg: '',
      nombres:'',
      primer_apellido:'',
      segundo_apellido:'',
      id_proceso_persona:'',
      genero:'',
      nro_documento:'',
    } 
    
  ),
  
  actions: {
    

    addIDRegistro(payload){this.cod_registro = payload},
    addIDPersona(payload){this.id_persona = payload},
    addIDInicio(payload){this.cod_inicio =payload},
    addIDTramite(payload){this.tramite =payload},
    addIDFecha(payload){this.fecha_reg =payload},
    addIDNombre(payload){this.nombres =payload},
    addIDPrimerApellido(payload){this.primer_apellido =payload},
    addIDSegundoApellido(payload){this.segundo_apellido =payload},
    addIDProceso(payload){this.id_proceso = payload},
    addIDProcesoUso(payload){this.id_proceso_persona = payload},    
    addIDDocumento(payload){this.nro_documento = payload},
    addIDGenero(payload){this.genero = payload},
  },

  getters: {
    getIDPersona: (state) => state.id_persona,
    getIDRegistro: (state) => state.cod_registro,
    getIDInicio: (state) => state.cod_inicio,
    getIDTramite: (state) => state.tramite,
    getIDFecha: (state) => state.fecha_reg,
    getIDNombre: (state) => state.nombres,
    getIDPrimerApellido: (state) => state.primer_apellido,
    getIDSegundoApellido: (state) => state.segundo_apellido,
    getIDProceso: (state) => state.id_proceso,
    getIDPocesoPersona : (state) => state.id_proceso_persona,
    getIDDocumento : (state) => state.nro_documento,
    getIDGenero : (state) => state.genero,
  },
  
  //persist: true,

});



