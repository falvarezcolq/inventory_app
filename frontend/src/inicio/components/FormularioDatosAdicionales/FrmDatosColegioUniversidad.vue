<template>
  <div class="col-lg-6 col-md-12 col-sm-12 mt-3">
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">DATOS DEL COLEGIO O INSTITUTO O UNIVERSIDAD</p>
        <div class="row">
          <div class="col-md-6">
            <label class="form-label">NOMBRE:</label>
            <span class="lb-error" v-if="formError.nombre_col_ins_univ">
              Campo
              requerido
            </span>
            <input type="text" class="form-control" 
            :class="{ error: formError.nombre_col_ins_univ }"
            v-model="datosAdicionales.nombre_col_ins_univ"
              @input="datosAdicionales.nombre_col_ins_univ = $event.target.value.toUpperCase()"
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">DIRECCIÓN:</label>
            <span class="lb-error" v-if="formError.direccion_col_ins_univ">
              Campo
              requerido
            </span>
            <input type="text" class="form-control"
              :class="{ error: formError.direccion_col_ins_univ }"
              v-model="datosAdicionales.direccion_col_ins_univ"
                @input="datosAdicionales.direccion_col_ins_univ = $event.target.value.toUpperCase()" />
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
    'datosAdicionales',
    'formError',
    'validador'
  ],
  data() {
    return {
      dataForm: {
        nombre_col_ins_univ: "",
        direccion_col_ins_univ: "",
      },
    }
  },
  mounted() {
    this.validador.nombre_col_ins_univ = Yup.string().required();
    this.validador.direccion_col_ins_univ = Yup.string().required();
  }
}
</script>