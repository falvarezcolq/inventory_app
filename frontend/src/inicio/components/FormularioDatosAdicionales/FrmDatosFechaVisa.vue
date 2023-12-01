<template>
  <div class="col-lg-6 col-md-12 col-sm-12 mt-3" >
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">DATOS ADICIONALES</p>
        <div class="row">
          <div class="col-md-12">
            <label class="form-label">FECHA DE EMISION DE LA VISA O PERMANENCIA:</label>
            <span class="lb-error" v-if="formError.fecha_tras">Campo requerido</span>
            <input type="date" class="form-control" 
              v-model="datosAdicionales.fecha_tras"
              :class="{ error: formError.fecha_tras }"
              @input="datosAdicionales.fecha_tras = $event.target.value.toUpperCase()" />
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
        fecha_tras:"",
      },
    }
  },
  mounted(){
     this.validador.fecha_tras=Yup.string().required();
  }
}
</script>