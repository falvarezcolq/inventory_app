<template>
  <div class="col-lg-6 col-md-6 col-sm-12 mt-3" v-show="true || idTramiteData == 18 || idTramiteData == 272">
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">DATOS REFUGIADOS</p>
        <div class="row">
          <div class="col-md-6">
            <label class="form-label">NRO DE RESOLUCIÓN:</label>
            <span class="lb-error" v-if="formError.nro_resolucionConare">
              Campo
              requerido
            </span>
            <input type="text" class="form-control" :disabled="idTramiteData != '18' ? ' ' : disabled"
              v-model="datosAdicionales.nro_resolucionConare"
              @input="datosAdicionales.nro_resolucionConare = $event.target.value.toUpperCase()" />
          </div>
          <div class="col-md-6">
            <label class="form-label">FECHA RESOLUCIÓN:</label>
            <span class="lb-error" v-if="formError.fecha_resolucionConare">Campo requerido</span>
            <input type="date" class="form-control" :disabled="idTramiteData != '18' ? ' ' : disabled"
              v-model="datosAdicionales.fecha_resolucionConare"
              @input="datosAdicionales.fecha_resolucionConare = $event.target.value.toUpperCase()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import api from '@/services/api';
import * as Yup from 'yup';
export default {
  props: [
    'idTramiteData',
    'datosAdicionales',
    'formError',
    'validador',
  ],
  data() {
    return {
      dataForm: {
        nro_resolucionConare:"",
        fecha_resolucionConare:"",
      },
    }
  },
  mounted(){
    // this.validador.nro_resolucionConare=Yup.string().required();
    // this.validador.fecha_resolucionConare=Yup.string().required();
  }
}
</script>