<template>
  <div class="col-lg-6 col-md-12 col-sm-12 mt-3">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">DATOS DE SOLICITUD:</p>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <label class="form-label">MOTIVO DE SOLICITUD:</label> <span class="lb-error" v-if="formError.motivo_solicitud">Campo requerido</span>
                <select class="form-control" 
                v-model="datosAdicionales.motivo_solicitud"
                :class="{ error: formError.motivo_solicitud }">
                  <option value="">SELECCIONAR</option>
                  <option
                    v-for="(item, index) in motivoSolicitud"
                    :key="index"
                    :value="item.nombre"
                  >
                    {{
                    item.nombre
                    }}
                  </option>
                </select>
              </div>             
              <div class="col-md-6 col-sm-12">
                <label class="form-label">ACTIVIDAD A DESARROLAR:</label>
                <span class="lb-error" v-if="formError.actividad_desarrollar">Campo requerido</span>
                <input
                  type="text"
                  class="form-control"
                  v-model="datosAdicionales.actividad_desarrollar"
                  :class="{ error: formError.actividad_desarrollar }"
                  @input="datosAdicionales.actividad_desarrollar = $event.target.value.toUpperCase()"
                />
              </div>
              <div class="col-md-6 col-sm-12 mt-3">
                <label class="form-label">CON CONTRATO DE TRABAJO:</label>
                <span class="lb-error"></span>
                <div class="form-check">
                  <label class="form-check-label" for="radio1">SI</label>
                  <input
                    class="form-check-input mx-2"
                    id="radio1"
                    type="radio"
                    name="optradio"
                    value="SI"
                    v-model="datosAdicionales.contrato_trabajo"
                  />
                </div>
                <div class="form-check">
                  <label class="form-check-label" for="radio2">NO</label>
                  <input
                    class="form-check-input mx-2"
                    id="radio2"
                    type="radio"
                    name="optradio"
                    value="NO"
                    checked
                    v-model="datosAdicionales.contrato_trabajo"
                  />
                </div>
              </div> 
                      
              <div class="col-md-6 col-sm-12 mt-3" v-show="idTramiteData != 18 || idTramiteData != 117">
                <label class="form-label">TIPO DE INGRESO ECONOMICO</label> <span class="lb-error" v-if="formError.tipo_ing_economico">Campo requerido</span>              
                <select
                  class="form-control"
                  v-model="datosAdicionales.tipo_ing_economico" 
                  :class="{ error: formError.tipo_ing_economico }"                                
                >
                  <option value="">SELECCIONAR</option>
                  <option v-for="(item, index) in tipoTipoIngresoList"
                    :key="index"
                    :value="item.cod_clasificador"
                  >{{ item.cod_clasificador }}</option>
                </select>
              </div>    
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import api from '@/services/api';
import { MotivoSolicitud } from '@/constantes/TipoSolicitud';
import * as Yup from "yup";
export default {
  props: [
    'idTramiteData',
    'datosAdicionales',
    'formError',
    'validador',
    'params',
  ],
  data() {
    return {
      dataForm: {
        motivo_solicitud:"",
        actividad_desarrollar:"",
        contrato_trabajo:"",
        tipo_ing_economico:"",
      },
      motivoSolicitud: [],
      tipoTipoIngresoList:[],
    }
  },
  methods: {
    async fetchTipoIngresoInst () {  api.get("/getTipoIngEco").then(response => {
        this.tipoTipoIngresoList = response.data.content;
      });
    },
    async fetchMotivoSolicitud(){
      api.get("/getMotivoSolicitud" , { params: this.params} ).then(response => {
        this.motivoSolicitud = response.data.content;
      });
    }
  },
  mounted() {
    this.validador.motivo_solicitud=Yup.string().required();
    this.validador.actividad_desarrollar=Yup.string().required();
    // this.validador.contrato_trabajo=Yup.string().required();
    this.validador.tipo_ing_economico=Yup.string().required();

    this.datosAdicionales.motivo_solicitud = this.params.clas3;
    this.fetchTipoIngresoInst();
    this.fetchMotivoSolicitud();
  }
}
</script>