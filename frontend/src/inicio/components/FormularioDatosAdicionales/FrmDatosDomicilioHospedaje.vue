<template>
  <div class="col-lg-6 col-md-12 col-sm-12 mt-3">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">DATOS DE DOMICILIO U HOSPEDAJE</p>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <label class="form-label">DEPARTAMENTO:</label>
                <span class="lb-error" v-if="formError.departamento">
                  Campo
                  requerido
                </span>
                <select
                  class="form-control"
                  v-model="datosAdicionales.departamento"
                  :class="{ error: formError.departamento }"
                  @change="fetchProvinciaInst(datosAdicionales.departamento)"
                >
                  <option value="">SELECCIONAR</option>
                  <option
                    v-for="(item, index) in tipoDepartamentoList"
                    :key="index"
                    :value="item.cod_clasificador"
                  >
                    {{
                    item.nombre
                    }}
                  </option>
                </select>
              </div>
              <div class="col-md-6 col-sm-12">
                <label class="form-label">PROVINCIA</label>
                <span class="lb-error"></span>
                <select
                  class="form-control"
                  v-model="datosAdicionales.provincia"
                  @change="fetchLocalidadInst(datosAdicionales.provincia)"
                >
                  <option value="">SELECCIONAR</option>
                  <option
                    v-for="(item, index) in tipoProvinciaList"
                    :key="index"
                    :value="item.cod_clasificador"
                  >
                    {{
                    item.nombre
                    }}
                  </option>
                </select>
              </div>
              <div class="col-md-6 col-sm-12 mt-3">
                <label class="form-label">LOCALIDAD:</label>
                <span class="lb-error"></span>
                <select class="form-control" v-model="datosAdicionales.localidad">
                  <option value="">SELECCIONAR</option>
                  <option
                    v-for="(item, index) in tipoLocalidadList"
                    :key="index"
                    :value="item.nombre"
                  >{{ item.nombre }}</option>
                </select>
              </div>
              <div class="col-md-6 col-sm-12 mt-3">
                <label class="form-label">TIPO HOSPEDAJE:</label>
                <span class="lb-error" v-if="formError.tipo_hospedaje">
                  Campo
                  requerido
                </span>
                <select
                  class="form-control"
                  v-model="datosAdicionales.tipo_hospedaje"
                  :class="{ error: formError.tipo_hospedaje }"
                >
                  <option value="">SELECCIONAR</option>
                  <option
                    v-for="(item, index) in tipoHospedaje"
                    :key="index"
                    :value="item.id"
                  >{{ item.nombre }}</option>
                </select>
              </div>

              <div class="col-md-6 col-sm-12 mt-3">
                <label class="form-label">NOMBRE HOSPEDAJE:</label>
                <span class="lb-error" v-if="formError.nombre_hospedaje">
                  Campo
                  requerido
                </span>
                <input
                  type="text"
                  class="form-control"
                  v-model="datosAdicionales.nombre_hospedaje"
                  :class="{ error: formError.nombre_hospedaje }"
                  @input="datosAdicionales.nombre_hospedaje = $event.target.value.toUpperCase()"
                />
              </div>

              <div class="col-md-6 col-sm-12 mt-3">
                <label class="form-label">ZONA Y/O AVENIDA:</label>
                <span class="lb-error" v-if="formError.direccion_zona">
                  Campo
                  requerido
                </span>
                <input
                  type="text"
                  class="form-control"
                  v-model="datosAdicionales.direccion_zona"
                  :class="{ error: formError.direccion_zona }"
                  @input="datosAdicionales.direccion_zona = $event.target.value.toUpperCase()"
                />
              </div>
              <div class="col-md-6 col-sm-12 mt-3">
                <label class="form-label">CALLE Y NRO:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="datosAdicionales.direccion_calles"
                  @input="datosAdicionales.direccion_calles = $event.target.value.toUpperCase()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import api from '@/services/api';
import {TipoHospedaje} from '@/constantes/TipoHospedaje';
import * as Yup from "yup";
export default {
  props: [
    'datosAdicionales',
    'formError',
    'validador',
  ],
  data() {
    return {
      dataForm: {
          departamento:"",
          provincia:"",
          localidad:"",
          tipo_hospedaje:"",
          nombre_hospedaje:"",
          direccion_zona:"",
          direccion_calles:"",
      },
      tipoDepartamentoList:[],
      tipoProvinciaList:[],
      tipoLocalidadList:[],
      tipoHospedaje:TipoHospedaje,
    }
  },
  methods: {
    asignarValidacion(){
        this.validador.departamento=Yup.string().required();
        // this.validador.provincia=Yup.string().required();
        // this.validador.localidad=Yup.string().required();
        this.validador.tipo_hospedaje=Yup.string().required();
        // this.validador.nombre_hospedaje=Yup.string().required();
        this.validador.direccion_zona=Yup.string().required();
        // this.validador.direccion_calles=Yup.string().required();
    },
    async fetchDepartamentoInst() {
      api.get("/getCiudad").then(response => {
        this.tipoDepartamentoList = response.data.contenido;
      });
    },
    async fetchProvinciaInst( ciudad ){
      api.get(`/getProvincias/${ciudad}`).then(response => {
        this.tipoProvinciaList = response.data.contenido;
      });
    },
    async fetchLocalidadInst ( provincia ){
      api.get(`/getLocalidad/${provincia}`).then(response => {
        this.tipoLocalidadList = response.data.contenido;
      });
    },

    // async fetchHospedajeInst (){
    //   api.get("/getTipoRef").then(response => {
    //     this.tipoHospedaje = response.data.contenido;
    //   });
    // }
  },
  mounted() {
    this.fetchDepartamentoInst();
    this.asignarValidacion();
  }
}
</script>