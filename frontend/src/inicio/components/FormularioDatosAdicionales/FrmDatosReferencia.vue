<template>
  <div class="col-lg-6 col-md-12 col-ms-12 mt-3">
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">DATOS DE REFERENCIA</p>
        <div class="row">
          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label" >TIPO:</label>
            <span class="lb-error" v-if="formError.tipo_referencia">
              Campo
              requerido
            </span>
            <select class="form-control" v-model="datosAdicionales.tipo_referencia"
              :class="{ error: formError.tipo_referencia }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in tipoTipoRefList" :key="index" :value="item.nombre">{{ item.nombre }}
              </option>
            </select>
          </div>
          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">NOMBRE DE LA EMPRESA O LUGAR DE TRABAJO:</label>
            <span class="lb-error"></span>
            <input type="text" class="form-control"
              :disabled="datosAdicionales.tipo_referencia != 'DE TRABAJO' "
              v-model="datosAdicionales.lugar_referencia"
              @input="datosAdicionales.lugar_referencia = $event.target.value.toUpperCase()" />
          </div>
          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">NOMBRE REFERENCIA:</label>
            <span class="lb-error" v-if="formError.nombre_referencia">
              Campo
              requerido
            </span>
            <input type="text" class="form-control" v-model="datosAdicionales.nombre_referencia"
              :class="{ error: formError.nombre_referencia }"
              @input="datosAdicionales.nombre_referencia = $event.target.value.toUpperCase()" />
          </div>
          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">N° CELULAR O TELEFONO:</label>
            <span class="lb-error"></span>
            <input type="text" class="form-control" equired autocomplete="off"
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
              v-model="datosAdicionales.celular_referencia"
              @input="datosAdicionales.celular_referencia = $event.target.value.toUpperCase()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Yup from "yup";
import api from '@/services/api';
export default {
  props: [
    'datosAdicionales',
    'formError',
    'validador',
  ],
  data() {
    return {
      dataForm: {
        tipo_referencia:"",
        lugar_referencia:"",
        nombre_referencia:"",
        celular_referencia:"",
      },
      tipoTipoRefList: [],
      activarIndefinido: false,
    }
  },
  methods: {
    async fetchTipoRefInst() {
      api.get("/getTipoRef").then(response => {
        this.tipoTipoRefList = response.data.content;
      });
    },

    asignarValidacion(){
        this.validador.tipo_referencia=Yup.string().required();
        // this.validador.lugar_referencia=Yup.string().required();
        this.validador.nombre_referencia=Yup.string().required();
    },
  },
  mounted() {
    this.asignarValidacion();
    this.fetchTipoRefInst();
  }
}
</script>