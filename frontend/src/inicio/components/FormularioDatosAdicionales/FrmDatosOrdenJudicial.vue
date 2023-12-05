<template>
  <div class="col-lg-6 col-md-12 col-ms-12 ">
    <div class="busqueda">
      <div class="busqueda_seccion mt-4">
        <p class="title">DATOS ORDEN JUDICIAL</p>
        <div class="row">
          <div class="col-md-6 col-sm-12 ">
            <label class="form-label">INSTITUCION QUE ORDENA:</label>
            <span class="lb-error" v-if="formError.institucion">Campo requerido</span>
            <select class="form-control" v-model.trim="datosAdicionales.institucion"
              :class="{ error: formError.institucion }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in institucionList" :key="index" :value="item.nombre">{{ item.nombre }}
              </option>
            </select>
          </div>


          <div class="col-md-6 col-sm-12">
            <label class="form-label">NOMBRE DE LA INSTITUCION:</label>
            <span class="lb-error" v-if="formError.nombre_institucion">
              Campo
              requerido
            </span>
            <input type="text" class="form-control" v-model.trim="datosAdicionales.nombre_institucion"
              :class="{ error: formError.nombre_institucion }"
              @input="datosAdicionales.nombre_institucion = $event.target.value.toUpperCase()" />
          </div>


          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">NOMBRE DE LA AUTORIDAD:</label>
            <span class="lb-error" v-if="formError.nombre_autoridad">
              Campo
              requerido
            </span>
            <input type="text" class="form-control" v-model.trim="datosAdicionales.nombre_autoridad"
              :class="{ error: formError.nombre_autoridad }"
              @input="datosAdicionales.nombre_autoridad = $event.target.value.toUpperCase()" />
          </div>

          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">CIUDAD EMISION:</label>
            <span class="lb-error" v-if="formError.ciudad">
              Campo
              requerido
            </span>
            <select class="form-control" v-model.trim="datosAdicionales.ciudad" :class="{ error: formError.ciudad }">
              <option value="">SELECCIONAR</option>
              <option v-for="(item, index) in ciudadList" :key="index" :value="item.nombre">{{ item.nombre }}</option>
            </select>
          </div>

          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">MOTIVO:</label>
            <span class="lb-error" v-if="formError.motivo">
              Campo
              requerido
            </span>
            <input type="text" class="form-control" v-model.trim="datosAdicionales.motivo"
              :class="{ error: formError.motivo }" @input="datosAdicionales.motivo = $event.target.value.toUpperCase()" />
          </div>

          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">NRO. RESOLUCION:</label>
            <span class="lb-error" v-if="formError.nro_resolucion">
              Campo
              requerido
            </span>
            <input type="text" class="form-control" v-model.trim="datosAdicionales.nro_resolucion"
              :class="{ error: formError.nro_resolucion }"
              @input="datosAdicionales.nro_resolucion = $event.target.value.toUpperCase()" />
          </div>

          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">NRO. IANUS:</label>
            <span class="lb-error" v-if="formError.nro_ianus">
              Campo
              requerido
            </span>
            <input type="text" class="form-control" v-model.trim="datosAdicionales.nro_ianus"
              :class="{ error: formError.nro_ianus }"
              @input="datosAdicionales.nro_ianus = $event.target.value.toUpperCase()" />
          </div>

          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">FEHA DE RESOLUCION:</label>
            <span class="lb-error" v-if="formError.fecha_resolucion">
              Campo
              requerido
            </span>
            <input type="date" class="form-control" v-model.trim="datosAdicionales.fecha_resolucion"
              :class="{ error: formError.fecha_resolucion }"
              :max="maxDate"
              />
          </div>

          <div class="col-md-6 col-sm-12 mt-3">
            <label class="form-label">QUERELLANTE:</label>
            <span class="lb-error" v-if="formError.querellante">
              Campo
              requerido
            </span>
            <input type="text" class="form-control" v-model.trim="datosAdicionales.querellante"
              :class="{ error: formError.querellante }"
              @input="datosAdicionales.querellante = $event.target.value.toUpperCase()" />
          </div>

          <div class="col-md-6 col-sm-12 mt-3" v-if="isLA">
            <label class="form-label">FEHA DE INICIO:</label>
            <span class="lb-error" v-if="formError.fecha_inicio">
              Campo
              requerido
            </span>
            <input type="date" class="form-control" v-model.trim="datosAdicionales.fecha_inicio"
              :class="{ error: formError.fecha_inicio }" @change="calcularDiferencia" />
          </div>

          <div class="col-md-6 col-sm-12 mt-3" v-if="isLA">
            <label class="form-label">FEHA DE FIN:</label>
            <span class="lb-error" v-if="formError.fecha_fin">
              La fecha debe ser mayor a la de inicio
            </span>
            <input type="date" class="form-control" v-model.trim="datosAdicionales.fecha_fin"
              :class="{ error: formError.fecha_fin }" @change="calcularDiferencia" />
          </div>

          <div class="col-md-6 col-sm-12 mt-3" v-if="isLA">
            <label class="form-label">DIAS:</label>
            <input type="text" class="form-control" v-model.trim="diferenciaDias" :contenteditable="false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import * as Yup from 'yup';
export default {
  props: [
    'datosAdicionales',
    'formError',
    'maxDate',
    'isLA',
    'validador',
  ],
  data() {
    return {
      dataForm: {
        institucion: "",
        nombre_institucion: "",
        nombre_autoridad: "",
        ciudad: "",
        motivo: "",
        nro_resolucion: "",
        nro_ianus: "",
        fecha_resolucion: "",
        querellante: "",
        fecha_inicio: "",
        fecha_fin: "",
      },
      institucionList: [],
      ciudadList: [],
      diferenciaDias: null,
    }
  },
  methods: {
    asignarValidador() {
      this.validador.institucion = Yup.string().required();
      this.validador.nombre_institucion = Yup.string().required();
      this.validador.nombre_autoridad = Yup.string().required();
      this.validador.ciudad = Yup.string().required();
      this.validador.motivo = Yup.string().required();
      this.validador.nro_resolucion = Yup.string().required();
      // this.validador.nro_ianus=Yup.string().required();
      this.validador.fecha_resolucion=Yup.date();
      this.validador.querellante = Yup.string().required();
      if (this.isLa) {
        this.validador.fecha_inicio = Yup.string().required();
        this.validador.fecha_fin = Yup.string().required();
      }
    },
    async fetchInstitucionesQueOrdenan() {
      api.get("/getInstituciones").then(response => {
        this.institucionList = response.data.content;
      });
    },
    async fetchCiudades() {
      api.get("/getCiudad").then(response => {
        this.ciudadList = response.data.content;
      });
    },
    calcularDiferencia() {
      const fechaInicio = new Date(this.datosAdicionales.fecha_inicio);
      const fechaFin = new Date(this.datosAdicionales.fecha_fin);
      const diffTime = fechaFin.getTime() - fechaInicio.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // divide by the number of milliseconds in a day and round up
      diffDays;
      if (diffDays > 0) {
        this.diferenciaDias = diffDays + 1;
        this.formError.fecha_fin = false;
      } else {
        this.diferenciaDias = null;
        this.formError.fecha_fin = true;
      }
    }

  },
  mounted() {
    this.fetchInstitucionesQueOrdenan();
    this.fetchCiudades();
    this.asignarValidador();
  }
}
</script>