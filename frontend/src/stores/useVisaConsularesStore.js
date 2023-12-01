import { defineStore } from 'pinia';

function InitialState(){
  return {
    cod_inicio:'',    
    tipo_tramite:'',
    nombre:'',
    primer_apellido:'',
    segundo_apellido:'',
    tipo_documento:'',
    fecha_nacimiento:'',
    cod_registro:'',
    nombre_estado:'',
    numero_documento:'',
    nacionalidad:''  
  }
}

export const useVisaConsularesStore = defineStore('visaconsulares', {
  state: () => (new InitialState()
  ),
  actions: {
    addCodInicio(payload){ this.cod_inicio = payload  },
    addTipoTramite(payload){ this.tipo_tramite = payload },
    addNombre(payload){ this.nombre = payload },
    addPrimerApellido(payload){ this.primer_apellido = payload },
    addSegundoApellido(payload){this.segundo_apellido=payload},
    addTipoDocumento(payload){ this.tipo_tramite = payload },
    addFechaNacimiento(payload){ this.fecha_nacimiento = payload },
    addCodRegistro(payload){ this.cod_registro = payload },
    addNombreEstado(payload){ this.nombre_estado = payload },
    addNumeroDocumento(payload){this.numero_documento = payload},
    addNacionalidad(payload){this.nacionalidad = payload},
    reset(){
      Object.assign(this, new InitialState());
    },
  },
  getters: {
    getCodInicio: (state) => state.cod_inicio,
    getTipoTramite: (state) => state.tipo_tramite,
    getNombre: (state) => state.nombre,
    getPrimerApellido: (state)=> state.primer_apellido,
    getSegundoApellido: (state)=> state.segundo_apellido,
    getTipoDocumento: (state)=>state.tipo_documento,
    getFechaNacimiento: (state) => state.fecha_nacimiento,
    getCodRegistro: (state) => state.cod_registro,
    getNombreEstado: (state) => state.nombre_estado,
    getNumeroDocumento: (state) => state.numero_documento,
    getNacionalidad: (state) => state.nacionalidad
  }
});