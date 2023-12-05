<template>
  <div class="col-lg-6 col-md-12 col-sm-12 mt-3">
        <div class="busqueda">
          <div class="busqueda_seccion">
            <p class="title">TRIPULANTE - DATOS DE EMPRESA</p>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <label class="form-label">RAZON SOCIAL Y/O NOMBRE DE LA EMPRESA:</label> 
                <span class="lb-error" v-if="formError.razon_social">Campo requerido</span>
                <input type="text" class="form-control"
                   v-model="datosAdicionales.razon_social" 
                   :class="{ error: formError.razon_social }"
                   @input="datosAdicionales.razon_social=$event.target.value.toUpperCase()" />
              </div>   
              
              <div class="col-md-6 col-sm-12">
                <label class="form-label">NIT:</label>
                <span class="lb-error" v-if="formError.nit">Campo requerido</span>
                <input type="text" class="form-control"
                   v-model="datosAdicionales.nit" 
                   :class="{ error: formError.nit }"
                   @input="datosAdicionales.nit=$event.target.value.toUpperCase()" />
              </div>

              <div class="col-md-6 col-sm-12">
                <label class="form-label">DIRECCION DE LA EMPRESA:</label>
                <span class="lb-error" v-if="formError.direccion_empresa">Campo requerido</span>
                <input type="text" class="form-control"
                   v-model="datosAdicionales.direccion_empresa" 
                   :class="{ error: formError.direccion_empresa }"
                   @input="datosAdicionales.direccion_empresa=$event.target.value.toUpperCase()" />
              </div>

              <div class="col-md-6 col-sm-12">
                <label class="form-label">TELEFONO Y/O FAX:</label>
                <span class="lb-error" v-if="formError.telefono_fax">Campo requerido</span>
                <input type="text" class="form-control"
                   v-model="datosAdicionales.telefono_fax" 
                   :class="{ error: formError.telefono_fax }"
                   @input="datosAdicionales.telefono_fax=$event.target.value.toUpperCase()" />
              </div>


              <div class="col-md-6 col-sm-12">
                <label class="form-label">GERENTE O REPRESENTANTE LEGAL:</label>
                <span class="lb-error" v-if="formError.gerente_general">Campo requerido</span>
                <input type="text" class="form-control"
                   v-model="datosAdicionales.gerente_general" 
                   :class="{ error: formError.gerente_general }"
                   @input="datosAdicionales.gerente_general=$event.target.value.toUpperCase()" />
                   
              </div>


              <div class="col-md-6 col-sm-12 mt-3">
                <label class="form-label">GRUPO SANGUINEO:</label>
                <span class="lb-error" v-if="formError.grupo_sanguineo">Campo requerido</span>
                <select class="form-control" 
                      v-model="datosAdicionales.grupo_sanguineo"
                      :class="{ error: formError.grupo_sanguineo }">
                      <option value="">SELECCIONAR</option>
                      <option v-for="(item, index) in tiposangreList" 
                        :key="index" :value="item.nombre">{{
                        item.nombre
                      }}
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
        razon_social:"",
        nit:"",
        direccion_empresa:"",
        telefono_fax:"",
        gerente_general:"",
        grupo_sanguineo:"",
      },
      tiposangreList:[],
    }
  },
  methods: {

    async getGrupoSanguineo () {  api.get("/getGrupoSanguineo").then(response => {
        this.tiposangreList = response.data.content;
      });
    }
  },
  mounted() {
    this.validador.razon_social=Yup.string().required(),
    this.validador.nit=Yup.string().required(),
    this.validador.direccion_empresa=Yup.string().required(),
    this.validador.telefono_fax=Yup.string().required(),
    this.validador.gerente_general=Yup.string().required(),
    this.validador.grupo_sanguineo=Yup.string().required(),
    this.getGrupoSanguineo();
  }
}
</script>