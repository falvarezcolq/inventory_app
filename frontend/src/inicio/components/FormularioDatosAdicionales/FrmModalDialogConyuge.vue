<template>
  <div class="modal" id="myModalConyugue" data-bs-backdrop="static" ref="myModalConyugue">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">TIPO DE TRÁMITE:</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-6 col-md-8 col-sm-12">
              <div class="busqueda">
                <div class="busqueda_seccion">
                  <p class="title">DATOS DE LA CONYUGE</p>
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                      <label class="form-label mt-3">NOMBRE:</label>
                      <span class="lb-error" v-if="formError1.cony_nombres">Campo requerido</span>
                      <input class="form-control" type="text" v-model.trim="datosAdicionalesDConyugue.cony_nombres"
                        :class="{ error: formError1.cony_nombres }"
                        @input="datosAdicionalesDConyugue.cony_nombres = $event.target.value.toUpperCase()" />

                      <label class=" form-label mt-3">PRIMER APELLIDO:</label>
                      <span class="lb-error" v-if="formError1.cony_primer_apellido">Campo requerido</span>
                      <input class="form-control" type="text"
                        v-model.trim="datosAdicionalesDConyugue.cony_primer_apellido"
                        :class="{ error: formError1.cony_primer_apellido }"
                        @input="datosAdicionalesDConyugue.cony_primer_apellido = $event.target.value.toUpperCase()" />
                      <label class="form-label mt-3">SEGUNDO APELLIDO:</label>
                      <input type="text" class="form-control"
                        v-model.trim="datosAdicionalesDConyugue.cony_segundo_apellido"
                        @input="datosAdicionalesDConyugue.cony_segundo_apellido = $event.target.value.toUpperCase()" />
                      <label class="form-label mt-3">OTROS APELLIDOS:</label>
                      <input type="text" class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_otro_apellido"
                        @input="datosAdicionalesDConyugue.cony_otro_apellido = $event.target.value.toUpperCase()" />
                      <label class="form-label mt-3">SEXO:</label>
                      <span class="lb-error" v-if="formError1.cony_genero">Campo requerido</span>
                      <select class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_genero"
                        :class="{ error: formError1.cony_genero }">
                        <option value="">SELECCIONAR</option>
                        <option v-for="(item, index) in generoList" :key="index" :value="item.cod_clasificador">{{
                          item.nombre }}</option>
                      </select>
                      <label class="form-label mt-3">FECHA DE NACIMIENTO:</label>
                      <input type="date" class="form-control"
                        v-model.trim="datosAdicionalesDConyugue.cony_fecha_nacimiento"
                        :max="maxDate" />
                      <label class="form-label mt-3">NACIONALIDAD:</label>
                      <span class="lb-error" v-if="formError1.cony_nacionalidad">Campo requerido</span>
                      <select class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_nacionalidad"
                        :class="{ error: formError1.cony_nacionalidad }">
                        <option value="">SELECCIONAR</option>
                        <option v-for="(item, index) in nacionalidadList" :key="index" :value="item.nombre_pais">{{
                          item.nombre_pais }}</option>
                      </select>
                      <label class="form-label mt-3">LUGAR DE NACIMIENTO</label>
                      <input type="text" class="form-control"
                        v-model.trim="datosAdicionalesDConyugue.cony_lugar_nacimiento"
                        @input="datosAdicionalesDConyugue.cony_lugar_nacimiento = $event.target.value.toUpperCase()" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                      <label class="form-label">GRADO DE INSTRUCCIÓN O NIVEL DE EDUCACIÓN</label>
                      <span class="lb-error" v-if="formError1.cony_grado_instruccion">Campo requerido</span>
                      <select class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_grado_instruccion"
                        :class="{ error: formError1.cony_grado_instruccion }">
                        <option value="">SELECCIONAR</option>
                        <option v-for="(item, index) in tipoGradoInsList" :key="index" :value="item.nombre">{{ item.nombre
                        }}</option>
                      </select>

                      <label class="form-label mt-3">PROFESIÓN</label>
                      <span class="lb-error" v-if="formError1.cony_profesion">
                        Campo
                        requerido
                      </span>
                      <select class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_profesion"
                        :class="{ error: formError1.cony_profesion }">
                        <option value="">SELECCIONAR</option>
                        <option v-for="(item, index) in tipoProfesionList" :key="index" :value="item.nombre">{{
                          item.nombre }}</option>
                      </select>

                      <label class="form-label mt-3">OCUPACIÓN</label>
                      <input type="text" class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_ocupacion"
                        @input="datosAdicionalesDConyugue.cony_ocupacion = $event.target.value.toUpperCase()" />
                      <label class="form-label mt-3">NRO DE DEPENDIENTES O HIJOS(AS)</label>
                      <span class="lb-error" v-if="formError1.cony_nro_hijos">Campo requerido</span>
                      <input type="text" class="form-control" required autocomplete="off"
                        onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                        v-model.trim="datosAdicionalesDConyugue.cony_nro_hijos"
                        :class="{ error: formError1.cony_nro_hijos }" />
                      <label class="form-label mt-3">DIRECCIÓN DE DOMICILIO</label>
                      <span class="lb-error" v-if="formError1.cony_direccion">Campo requerido</span>
                      <input type="text" class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_direccion"
                        :class="{ error: formError1.cony_direccion }"
                        @input="datosAdicionalesDConyugue.cony_direccion = $event.target.value.toUpperCase()" />
                      <label class="form-label mt-3">NRO DE TELEFONO O CELULAR</label>
                      <input type="text" class="form-control" required autocomplete="off"
                        onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                        v-model.trim="datosAdicionalesDConyugue.cony_telefono" />
                      <label class="form-label mt-3">TIEMPO DE PERMANENCIA EN BOLIVIA</label>
                      <span class="lb-error" v-if="formError1.cony_tiempo_perm">Campo requerido</span>
                      <div class="row">
                        <div class="col-md-4">
                          <input type="text" class="form-control" required autocomplete="off"
                            onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                            v-model.trim="datosAdicionalesDConyugue.cony_tiempo_perm"
                            :class="{ error: formError1.cony_tiempo_perm }" />
                        </div>
                        <div class="col-md-8">
                          <select class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_tiempo_permanencia"
                            :class="{ error: formError1.cony_tiempo_permanencia }">
                            <option value="">SELECCIONAR</option>
                            <option v-for="(item, index) in tipoPermanenciaList" :key="index" :value="item.nombre">
                              {{
                                item.nombre
                              }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <label class="form-label mt-3">CORREO ELECTRONICO</label>
                      <input type="text" class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_email" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-4 col-sm-6">
              <div class="busqueda">
                <div class="busqueda_seccion">
                  <p class="title">DATOS DEL DOCUMENT0 DE LA O EL CONYUGE</p>
                  <label class="form-label mt-3">TIPO DE DOCUMENT0</label>
                  <select class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_tipo_documento">
                    <option value="">SELECCIONAR</option>
                    <option v-for="(item, index) in tipoDocumentoList" :key="index" :value="item.nombre">
                      {{
                        item.nombre
                      }}
                    </option>
                  </select>
                  <label class="form-label mt-3">NRO DE DOCUMENT0</label>
                  <input type="text" class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_nro_documento"
                  @input="datosAdicionalesDConyugue.cony_nro_documento = $event.target.value.toUpperCase()">
                  <label class="form-label mt-3">FECHA DE EMISIÓN</label>
                  <input type="date" class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_fecha_emision"
                  :max="maxDate" />
                  <div class="row">
                    <div class="col-md-6">
                      <label class="form-label mt-3">FECHA DE EXPIRACIÓN</label>
                      <input type="date" class="form-control"
                        v-model.trim="datosAdicionalesDConyugue.cony_fecha_expiracion" :disabled="activarIndefinido" 
                        :min="minDate"/>
                    </div>
                    <div class="col-md-6">
                      <input class="mt-4 mx-1 md-4" type="checkbox" v-model="activarIndefinido" />
                      <label>INDEFINIDO</label>
                    </div>
                  </div>
                  <label class="form-label mt-3">LUGAR DE EMISIÓN</label>
                  <select class="form-control" v-model.trim="datosAdicionalesDConyugue.cony_lugar_emision">
                    <option value="">SELECCIONAR</option>
                    <option v-for="(item, index) in nacionalidadList" :key="index" :value="item.cod_nacionalidad">{{
                      item.nombre_pais }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="col-md-6" style="text-align:right">
            <button @click="Guardar()" type="button" class="btn btn-outline-primary btn-sm">
              <i class="fa fa-save"></i>
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import { useInicioStore } from "@/stores/useInicioStore";
import moment from "moment";
import * as Yup from "yup";
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
export default {
  props: [
    'idTramiteData',
  ],

  setup() {
    let myModalConyugue = ref(null);
    let maxDate = moment().format('YYYY-MM-DD');
    let minDate = moment().format('YYYY-MM-DD');
    let datosAdicionalesDConyugue = ref({
      cony_genero: '',
      cony_nacionalidad: '',
      cony_grado_instruccion: '',
      cony_profesion: '',
      cony_tiempo_permanencia: '',
      cony_tipo_documento: '',
      cony_lugar_emision: '',
    });
    let tipoGradoInsList = ref([]);
    let tipoProfesionList = ref([]);
    let tipoPermanenciaList = ref([]);
    let nacionalidadList = ref([]);
    let tipoDocumentoList = ref([]);
    let generoList = ref([]);
    let activarIndefinido = ref(false);
    let idPersonaData = ref();
    let idTramiteData = ref();
    let inicio = useInicioStore();
    let formError1 = ref({});
    idPersonaData.value = inicio.getIDPersona;
    idTramiteData.value = inicio.getIDTramite;

    let schemaForm1 = Yup.object().shape({
      cony_nombres: Yup.string().required(),
      cony_primer_apellido: Yup.string().required(),
      cony_genero: Yup.string().required(),
      cony_nacionalidad: Yup.string().required(),
      cony_nro_hijos: Yup.string().required(),
      cony_direccion: Yup.string().required(),
      cony_tiempo_perm: Yup.string().required(),
      cony_tiempo_permanencia: Yup.string().required()
    });

    let fetchGenero = () =>
      api.get("/getParametro/PAR_GENERO").then(response => {
        generoList.value = response.data.contenido;
      });

    let fetchTipoGradoInst = () =>
      api.get("/getGrado").then(response => {
        tipoGradoInsList.value = response.data.contenido;
      });

    let fetchProfesionInst = () =>
      api.get("/getProfesion").then(response => {
        tipoProfesionList.value = response.data.contenido;
      });

    let fetchPermananciaInst = () =>
      api.get("/getTiempoPermanencia").then(response => {
        tipoPermanenciaList.value = response.data.contenido;
      });

    let fetchNacionalidad = () =>
      api.get("/getNacionalidad").then(response => {
        nacionalidadList.value = response.data.contenido;
      });

    let fetchTipoDocumento = () =>
      api.get("/getTipoDoc").then(response => {
        tipoDocumentoList.value = response.data.contenido;
      });

    let Guardar = async () => {

      let datosDC = {
        datosAdicionalesDConyugue: datosAdicionalesDConyugue.value,
        idPersonaData: idPersonaData.value,
        idTramiteData: idTramiteData.value
      };
      try {
        await schemaForm1.validate(datosAdicionalesDConyugue.value, {
          abortEarly: false
        });

        // let result = await api.post("/datosAdicionalesDConyugue", datosDC);

        // if (result.status === 201 && result.data.codigo === 1) {
          Swal.fire({ text: "Registro de conyugue correctamente.", icon: "success", confirmButtonText: "ACEPTAR", confirmButtonColor: "#198754", allowOutsideClick: false })
          datosAdicionalesDConyugue.value = '';
          inicio.addDatosAdicionalesDConyugue(datosDC);
          Modal.getInstance(myModalConyugue.value).hide();
        // }

      } catch (err) {
          //console.log(err.message)
          formError1.value = {};
          err.inner.forEach(error => {
          if (error.path && !formError1[error.path]) {
            formError1.value[error.path] = error.message;
          }
        });
      }
    };

    onMounted(fetchTipoGradoInst);
    onMounted(fetchProfesionInst);
    onMounted(fetchPermananciaInst);
    onMounted(fetchNacionalidad);
    onMounted(fetchTipoDocumento);
    onMounted(fetchGenero);
    return {
      tipoGradoInsList,
      tipoProfesionList,
      nacionalidadList,
      tipoDocumentoList,
      tipoPermanenciaList,
      activarIndefinido,
      generoList,
      Guardar,
      datosAdicionalesDConyugue,
      formError1,
      myModalConyugue,
      maxDate,
      minDate,
    };
  },

  data() {
    return {
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>