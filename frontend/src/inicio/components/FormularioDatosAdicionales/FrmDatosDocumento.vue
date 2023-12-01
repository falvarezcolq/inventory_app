<template>
  
  <div class="busqueda">
    <div class="busqueda_seccion mt-4">
      <p class="title">DATOS DOCUMENTO:</p>
      <div class="row form-group">
        
        <div class="col-md-6 col-sm-12 ">
          <label class="form-label">TIPO DE DOCUMENTO:</label>
          <select 
            class="form-control"
            v-model="tipo_documento"
            disabled
          >
            <option v-for="(item, index) in tipoDocumentoList" :key="index" :value="item.cod_clasificador" >{{ item.nombre }}</option>
          </select>
         
        </div>
        <div class="col-md-6 col-sm-12">
          <label class="form-label">DOCUMENTO:</label>
          <input type="text" class="form-control"  v-model="nro_documento" disabled/>      
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-4 col-sm-12 mt-3">
          <label class="form-label">FECHA DE EMISIÓN:</label>
          <span class="lb-error" v-if="formError.fecha_emision">Campo requerido</span>
          <input type="date" class="form-control" v-model="datosAdicionales.fecha_emision"
            :class="{ error: formError.fecha_emision }"
            :max="maxDate"/>
        </div>
        <div class="col-md-4 col-sm-12 mt-3">
          <label class="form-label">FECHA DE EXPIRACIÓN:</label>
          <span class="lb-error" v-if="formError.fecha_expiracion">Campo requerido</span>
          <input type="date" class="form-control" v-model="datosAdicionales.fecha_expiracion"
            :disabled="activarIndefinido" 
            :class="{ error: formError.fecha_expiracion }" 
            :min="minDate"/>
        </div>
        <div class="mt-4 col-sm-12 col-md-4">
          <label class="form-check-label">INDEFINIDO</label><br>
          <input class="form-check-input mt-3" type="checkbox" v-model="activarIndefinido" />
        </div>
      </div>
      <div class="row form-group">
        <div class=" col-sm-12 col-md-6 mt-3">
          <label class="form-label">PAIS DE EMISIÓN:</label>
          <span class="lb-error" v-if="formError.nacionalidad_emision">Campo requerido</span>
          <select class="form-control" v-model="datosAdicionales.nacionalidad_emision"
            :class="{ error: formError.nacionalidad_emision }">
            <option value="">SELECCIONAR</option>
            <option v-for="(item, index) in nacionalidadList" :key="index" :value="item.cod_nacionalidad">{{
              item.nombre_pais
            }}</option>
          </select>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
// import api from '@/services/api';

import * as Yup from "yup";
import useTipoDocumento from '@/inicio/composables/useTipoDocumento'

export default {
props: [
  'datosAdicionales',
  'formError',
  'maxDate',
  'minDate',
  'nacionalidadList', // viene del componente padre
  'validador',
  'persona',
  'nacionalidad',
  
],
data() {
  return {
    dataForm: {
      documento:"",
      tipo_documento:"",
      fecha_emision:"",
      fecha_expiracion:"",
      nacionalidad:"",
    },
    tipoEstadoCivilList: [],
    activarIndefinido: false,
    validadorForm:{
      fecha_emision: Yup.string().required(),
    },
    tipo_documento:"",
    nro_documento:"",
    nacionalidad:"",
    tipoDocumentoList:[],
  }
},
methods: {
  
  asignarValidacion(){
    this.validador.fecha_emision=Yup.date();
    this.validador.fecha_expiracion=Yup.date();
    this.validador.nacionalidad_emision=Yup.string().required();
  },
  cargarDataDocumento(){
    if (this.persona.modulo != false ){
      this.tipo_documento = this.persona.data.tipo_documento;
      this.nro_documento = this.persona.data.nro_documento;
      this.nacionalidad = this.persona.data.nacionalidad;
    }

    const { data, isLoading, hasError, errorMessage } = useTipoDocumento()
    this.tipoDocumentoList = data;
  }
},

mounted() {
  this.asignarValidacion();
  this.cargarDataDocumento();
  }
}
</script>