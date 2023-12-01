<template>
  <div class="col-lg-6 col-md-12 col-sm-12 mt-3">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">DATOS DE SOLICITUD (Motivo):</p>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <label class="form-label">MOTIVO DE SOLICITUD:</label> 
                <span class="lb-error" v-if="formError.motivo_solicitud">Campo requerido</span>
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
                <label class="form-label">PAIS A VIAJAR:</label>
                <span class="lb-error" v-if="formError.pais_a_viajar">Campo requerido</span>
                <select class="form-control" v-model="datosAdicionales.pais_a_viajar"
                      :class="{ error: formError.pais_a_viajar }">
                      <option value="">SELECCIONAR</option>
                      <option v-for="(item, index) in nacionalidadList" 
                        :key="index" :value="item.cod_nacionalidad">
                        {{item.nombre_pais}}
                    </option>
                </select>
              </div>
              <div class="col-md-6 col-sm-12 mt-3">
                <label class="form-label">DESCRIPCION:</label>
                <span class="lb-error" v-if="formError.motivo_descripcion">
                  Campo
                  requerido
                </span>
                  <input type="text" class="form-control"
                   v-model="datosAdicionales.motivo_descripcion" 
                   :class="{ error: formError.motivo_descripcion }"
                   @input="datosAdicionales.motivo_descripcion = $event.target.value.toUpperCase()"
                   />
                   
                   </div>

              <div class="col-md-6 col-sm-12 mt-3">
                <label class="form-label">PAIS DE RESIDENCIA:</label>
                <span class="lb-error" v-if="formError.pais_residencia">Campo requerido</span>
                <select class="form-control" 
                      v-model="datosAdicionales.pais_residencia"
                      :class="{ error: formError.pais_residencia }">
                      <option value="">SELECCIONAR</option>
                      <option v-for="(item, index) in nacionalidadList" 
                        :key="index" :value="item.cod_nacionalidad">{{
                        item.nombre_pais
                      }}
                    </option>
                </select>
              </div>

              <div class="col-md-6 col-sm-12 mt-3">
                <label class="form-label">LUGAR RESIDENCIA:</label>
                <span class="lb-error" v-if="formError.lugar_residencia">
                  Campo
                  requerido
                </span>
                <input type="text" class="form-control"
                   :class="{ error: formError.lugar_residencia }"
                   v-model="datosAdicionales.lugar_residencia" 
                   @input="datosAdicionales.lugar_residencia=$event.target.value.toUpperCase()" />
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
    'idTramiteData',
    'datosAdicionales',
    'formError',
    'validador',
    'nacionalidadList',
  ],
  data() {
    return {
      dataForm: {
        motivo_solicitud:"",
        pais_a_viajar:"",
        motivo_descripcion:"",
        pais_residencia:"",
        lugar_residencia:"",
      },
      motivoSolicitud: [],

    }
  },
  methods: {

    async fetchMotivoPasaporte () {  api.get("/getMotivoPasaporte").then(response => {
        this.motivoSolicitud = response.data.contenido;
      });
    }
  },
  mounted() {
    this.validador.motivo_solicitud=Yup.string().required();
    this.validador.pais_a_viajar=Yup.string().required();
    this.validador.motivo_descripcion=Yup.string().required();
    this.fetchMotivoPasaporte();
  }
}
</script>