<template>
  <div class="col-lg-6 col-md-12 col-sm-12 mt-3">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">PASO AUTORIZADO FRONTERA:</p>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <label class="form-label">PASO AUTORIZADO:</label> <span class="lb-error" v-if="formError.paso">Campo requerido</span>
                <select class="form-control" 
                v-model="datosAdicionales.paso"
                :class="{ error: formError.paso }">
                  <option value="">SELECCIONAR</option>
                  <option
                    v-for="(item, index) in pasos"
                    :key="index"
                    :value="item.id_paso"
                  >
                  
                    {{item.localidad}} - {{item.localidad_frontera}}
                  </option>
                </select>
              </div>             
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import api from '@/services/api';
import { pasos } from '@/constantes/TipoSolicitud';
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
        paso:"",
      },
      pasos: [],
    }
  },
  methods: {

    async fetchPasoAutorizado(){
      api.get("/getpasosautorizados" , { params: this.params} ).then(response => {
        this.pasos = response.data.contenido;
      });
    }
  },
  mounted() {
    this.validador.paso=Yup.string().required();
    this.fetchPasoAutorizado();
  }
}
</script>