<template>
  <div class="col-lg-6 col-md-12 col-ms-12 mt-3">
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">DATOS DE CONTROL MIGRATORIO</p>
        <div class="row">
          <div class="col-md-6">
            <label class="form-label">PUNTO DE CONTROL MIGRATORIO:</label>
            <span class="lb-error" v-if="formError.punto_control">Campo requerido</span>
            <select class="form-control" v-model="datosAdicionales.punto_control"
              :class="{ error: formError.punto_control }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in tipoPuntoControlList" :key="index" :value="item.cod_oficina">{{ item.nombre }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">FECHA DE INGRESO:</label>
            <span class="lb-error" v-if="formError.fecha_ingreso">
              Campo
              requerido
            </span>
            <input type="date" class="form-control" v-model="datosAdicionales.fecha_ingreso"
              :class="{ error: formError.fecha_ingreso }" :min="maxDate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import * as Yup from "yup";
export default {
  props: [
    'datosAdicionales',
    'formError',
    'maxDate',
    'validador',
  ],
  data() {
    return {
      dataForm: {
        punto_control: "",
        fecha_ingreso: "",
      },
      tipoPuntoControlList: [],
    }
  },
  methods: {
    async fetchPuntoControlInst() {
      api.get("/getPuestoControl").then(response => {
        this.tipoPuntoControlList = response.data.content;
      });
    },

  },
  mounted() {
    this.validador.punto_control = Yup.string().required();
    this.validador.fecha_ingreso = Yup.string().required();
    this.fetchPuntoControlInst();
  }
}
</script>