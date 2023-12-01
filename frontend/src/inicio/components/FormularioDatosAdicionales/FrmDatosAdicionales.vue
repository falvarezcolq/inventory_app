<template>
  <div>
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">DATOS PERSONALES COMPLEMENTARIOS:</p>
        <div class="row form-group">
          <div class="col-sm-12 col-md-6">
            <label class="form-label">ESTADO CIVIL:</label>
            <span class="lb-error" v-if="formError.estado_civil">Campo requerido</span>
            <select class="form-control" v-model="datosAdicionales.estado_civil"
              :class="{ error: formError.estado_civil }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in tipoEstadoCivilList" :key="index" :value="item.nombre">
                {{
                  item.nombre
                }}
              </option>
            </select>
          </div>
          <div class="col-sm-12 col-md-6">
            <label class="form-label">NRO DE HIJOS(AS):</label>
            <span class="lb-error"></span>
            <input type="text" class="form-control" required autocomplete="off"
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" v-model="datosAdicionales.nro_hijos" />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">GRADO DE INSTRUCCIÓN:</label>
            <span class="lb-error" v-if="formError.grado_instruccion">Campo requerido</span>
            <select class="form-control" v-model="datosAdicionales.grado_instruccion"
              :class="{ error: formError.grado_instruccion }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in tipoGradoInsList" :key="index" :value="item.nombre">{{ item.nombre }}
              </option>
            </select>
          </div>
          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">PROFESIÓN:</label>
            <span class="lb-error" v-if="formError.profesion">
              Campo requerido
            </span>
            <select class="form-control" v-model="datosAdicionales.profesion" :class="{ error: formError.profesion }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in tipoProfesionList" :key="index" :value="item.nombre">{{ item.nombre }}
              </option>
            </select>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">OCUPACIÓN:</label>
            <span class="lb-error"></span>
            <input type="text" class="form-control" v-model="datosAdicionales.ocupacion"
              @input="datosAdicionales.ocupacion = $event.target.value.toUpperCase()" />
          </div>

          <div class="col-md-6 col-sm-12 mt-3" v-show="isCoCe">
            <label class="form-label">TIEMPO DE PERMANENCIA EN BOLIVIA:</label>
            <span class="lb-error" v-if="formError.tiempo">Campo requerido</span>



            <div class="row">
              <div class="col-md-12">
                <div class="form-control">
                  {{ datosAdicionales.tiempo }}
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-control">
                  {{ datosAdicionales.tiempo_permanencia }}
                </div>
              
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3" v-if="datosAdicionales.estado_civil == 'CASADO(A)' ">
          <div v-if="inicio.getDatosAdicionalesDConyugue.module==false">
            <button type="button" class="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#myModalConyugue"
            :disabled="datosAdicionales.estado_civil != 'CASADO(A)'">DATOS CONYUGUE</button>
          </div>
          <div v-else>
              <h3>¡La informacion del conyugue ya fue registrado con exito!</h3>
          </div>
        </div>
      </div>
    </div>
  
    <FrmModalDialogConyuge />
  </div>
</template>

<script>
import api from '@/services/api';
import FrmModalDialogConyuge from './FrmModalDialogConyuge.vue';
import * as Yup from "yup";
import { useInicioStore } from "@/stores/useInicioStore";

export default {
  components: {
    FrmModalDialogConyuge,
  },
  props: [
    'datosAdicionales',
    'formError',
    'isCoCe',
    'validador',
    'tramiteData',
  ],
  data() {
    return {
      dataForm: {
        estado_civil:"",
        nro_hijos:"",
        grado_instruccion:"",
        profesion:"",
        ocupacion:"",
        tiempo:"",
        tiempo_permanencia:"",
      },
      tipoProfesionList:[''],
      tipoEstadoCivilList: [''],
      tipoGradoInsList:[''],
      tipoPermanenciaList:[''],
      activarIndefinido: false,
      inicio:useInicioStore(),
    }
  },
  methods: {
    
    asignarValidacion(){

        this.validador.estado_civil=Yup.string().required();
        this.validador.grado_instruccion=Yup.string().required();
        this.validador.profesion=Yup.string().required();

        if (this.isCoCe){
           this.validador.tiempo_permanencia=Yup.string().required();
          this.validador.tiempo= Yup.string().required();
        }       
    },

    asignarValoresDeTramite(){
     if(this.tramiteData && this.isCoCe){
      this.datosAdicionales.tiempo = this.tramiteData.tiempo;
      this.datosAdicionales.tiempo_permanencia = 'DIA(S)'

     }
    },
    async fetchTipoGradoInst () {
      api.get("/getGrado").then(response => {
        this.tipoGradoInsList = response.data.contenido;
      });
    },
    async fetchTipoEstadoCivil() {
      api.get("/getEstadoCivil").then(response => {
        this.tipoEstadoCivilList = response.data.contenido;
      });
    },
    async fetchPermananciaInst () {
      api.get("/getTiempoPermanencia").then(response => {
        this.tipoPermanenciaList = response.data.contenido;
      });
    },
    async fetchProfesionInst() {     
       api.get("/getProfesion").then(response => {
        this.tipoProfesionList = response.data.contenido;
      });
    }
  },
  mounted() {
    this.fetchTipoEstadoCivil();
    this.fetchTipoGradoInst();
    this.fetchPermananciaInst();
    this.fetchProfesionInst();
    this.asignarValidacion();
    this.asignarValoresDeTramite()
  }
}
</script>