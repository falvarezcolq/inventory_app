<template>
  <div>
    <div class="row">
      <div class="row form-group">
        <div class="mt-4 col-md-12" style="color: orange">
          <b> DATOS DE LA O EL CONYUGUE</b>
        </div>

        <div class="mt-2 col-md-6">
          <label for="">NOMBRE:</label
          ><span class="lb-error" v-if="formError.nombres">
            Campo requerido</span
          >
          <input
            class="form-control"
            type="text"
            v-model.trim="datosAdicionalesDConyugue.cony_nombres"
            :class="{ error: formError.cony_nombres }"
            @keyup="
              datosAdicionalesDConyugue.cony_nombres =
                datosAdicionalesDConyugue.cony_nombres.toUpperCase()
            "
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for="">PRIMER APELLIDO:</label
          ><span class="lb-error" v-if="formError.cony_primer_apellido">
            Campo requerido</span
          >
          <input
            class="form-control"
            type="text"
            v-model.trim="datosAdicionalesDConyugue.cony_primer_apellido"
            :class="{ error: formError.cony_primer_apellido }"
            @keyup="
              datosAdicionalesDConyugue.cony_primer_apellido =
                datosAdicionalesDConyugue.cony_primer_apellido.toUpperCase()
            "
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for="">SEGUNDO APELLIDO:</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_segundo_apellido"
            @keyup="
              datosAdicionalesDConyugue.cony_segundo_apellido =
                datosAdicionalesDConyugue.cony_segundo_apellido.toUpperCase()
            "
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for="">OTROS APELLIDOS:</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_otro_apellido"
            @keyup="
              datosAdicionalesDConyugue.cony_otro_apellido =
                datosAdicionalesDConyugue.cony_otro_apellido.toUpperCase()
            "
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for="">GÉNERO:</label
          ><span class="lb-error" v-if="formError.cony_genero">
            Campo requerido</span
          >
          <select
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_genero"
            :class="{ error: formError.cony_genero }"
          >
            <option value="">SELECCIONAR</option>
            <option
              v-for="(item, index) in generoList"
              :key="index"
              :value="item.cod_clasificador"
            >
              {{ item.nombre }}
            </option>
          </select>
        </div>
        <div class="mt-2 col-md-6">
          <label for="">FECHA DE NACIMIENTO:</label>
          <input
            type="date"
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_fecha_nacimiento"
            :max="maxDate"
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for="">NACIONALIDAD:</label
          ><span class="lb-error" v-if="formError.cony_nacionalidad">
            Campo requerido</span
          >
          <select
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_nacionalidad"
            :class="{ error: formError.cony_nacionalidad }"
          >
            <option value="">SELECCIONAR</option>
            <option
              v-for="(item, index) in nacionalidadList"
              :key="index"
              :value="item.nombre_pais"
            >
              {{ item.nombre_pais }}
            </option>
          </select>
        </div>
        <div class="mt-2 col-md-6">
          <label for="">LUGAR DE NACIMIENTO</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_lugar_nacimiento"
            @keyup="
              datosAdicionalesDConyugue.cony_lugar_nacimiento =
                datosAdicionalesDConyugue.cony_lugar_nacimiento.toUpperCase()
            "
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for="">GRADO O NIVEL DE EDUCACIÓN</label
          ><span class="lb-error" v-if="formError.cony_grado_instruccion">
            Campo requerido</span
          >
          <select
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_grado_instruccion"
            :class="{ error: formError.cony_grado_instruccion }"
          >
            <option value="">SELECCIONAR</option>
            <option
              v-for="(item, index) in tipoGradoInsList"
              :key="index"
              :value="item.cod_clasificador"
            >
              {{ item.nombre }}
            </option></select
          >../../..
        </div>
        <div class="mt-2 col-md-6">
          <label for="">OCUPACIÓN</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_ocupacion"
            @keyup="
              datosAdicionalesDConyugue.cony_ocupacion =
                datosAdicionalesDConyugue.cony_ocupacion.toUpperCase()
            "
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for="">NRO DE DEPENDIENTES O HIJOS(AS)</label
          ><span class="lb-error" v-if="formError.nro_hijos">
            Campo requerido</span
          >
          <input
            type="text"
            class="form-control"
            equired
            autocomplete="off"
            onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
            v-model.trim="datosAdicionalesDConyugue.cony_nro_hijos"
            :class="{ error: formError.cony_nro_hijos }"
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for="">DIRECCIÓN DE DOMICILIO</label
          ><span class="lb-error" v-if="formError.cony_direccion">
            Campo requerido</span
          >
          <input
            type="text"
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_direccion"
            :class="{ error: formError.cony_direccion }"
            @keyup="
              datosAdicionalesDConyugue.cony_direccion =
                datosAdicionalesDConyugue.cony_direccion.toUpperCase()
            "
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for="">NRO DE TELEFONO O CELULAR</label>
          <input
            type="text"
            class="form-control"
            equired
            autocomplete="off"
            onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
            v-model.trim="datosAdicionalesDConyugue.cony_telefono"
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for="">TIEMPO DE PERMANENCIA EN BOLIVIA</label
          ><span class="lb-error" v-if="formError.cony_tiempo_perm">
            Campo requerido</span
          >
          <div class="row">
            <div class="col-md-4">
              <input
                type="text"
                class="form-control"
                equired
                autocomplete="off"
                onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                v-model.trim="datosAdicionalesDConyugue.cony_tiempo_perm"
                :class="{ error: formError.cony_tiempo_perm }"
              />
            </div>
            <div class="col-md-8">
              <select
                class="form-control"
                v-model.trim="datosAdicionalesDConyugue.cony_tiempo_permanencia"
                :class="{ error: formError.cony_tiempo_permanencia }"
              >
                <option value="">SELECCIONAR</option>
                <option
                  v-for="(item, index) in tipoPermanenciaList"
                  :key="index"
                  :value="item.nombre"
                >
                  {{ item.nombre }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-2 col-md-6">
          <label for="">CORREO ELECTRONICO</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_email"
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for=""> TIPO DE DOCUMENT0</label>
          <select
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_tipo_documento"
          >
            <option value="">SELECCIONAR</option>
            <option
              v-for="(item, index) in tipoDocumentoList"
              :key="index"
              :value="item.nombre"
            >
              {{ item.nombre }}
            </option>
          </select>
        </div>
        <div class="mt-2 col-md-6">
          <label for="">NRO DE DOCUMENT0</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_nro_documento"
          />
        </div>
        <div class="mt-2 col-md-6">
          <label for="">FECHA DE EMISIÓN</label>
          <input
            type="date"
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_fecha_emision"
          />
        </div>
        <div class="mt-2 col-md-6">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="">FECHA DE EXPIRACIÓN</label>
              <input
                type="date"
                class="form-control"
                v-model.trim="datosAdicionalesDConyugue.cony_fecha_expiracion"
                :disabled="activarIndefinido"
              />
            </div>
            <div class="col-md-6">
              <input
                class="mt-4 mx-1 md-4"
                type="checkbox"
                v-model="activarIndefinido"
              /><label>INDEFINIDO</label>
            </div>
          </div>
        </div>

        <div class="mt-2 col-md-6">
          <label for="">LUGAR DE EMISIÓN</label>
          <select
            class="form-control"
            v-model.trim="datosAdicionalesDConyugue.cony_lugar_emision"
          >
            <option value="">SELECCIONAR</option>
            <option
              v-for="(item, index) in nacionalidadList"
              :key="index"
              :value="item.nombre_pais"
            >
              {{ item.nombre_pais }}
            </option>
          </select>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-12 col-md-12">
          <button type="button" class="btn btn-secondary btn-sm"
            @click="Cancelar"
          ><i class="fa fa-close"></i> CANCELAR
          </button>&nbsp;
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="Continuar()"
          >
            <i class="fa fa-save"></i> CONTINUAR
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import api from "@/services/api";
import ProgressStep from "@/inicio/components/ProgressStep.vue";
import DatosTramite from "@/inicio/components/DatosTramite.vue";
import { useInicioStore } from "@/stores/useInicioStore";
import * as Yup from "yup";
import moment from "moment";

export default {
  components: { ProgressStep, DatosTramite },
  setup() {
    let datosAdicionalesDConyugue = ref({
      cony_genero: '',
      cony_nacionalidad: '',
      cony_grado_instruccion: '',
      cony_tiempo_permanencia: '',
      cony_tipo_documento: '',
      cony_lugar_emision: '',

    });
    let tipoActividadDesempenaList = ref([]);
    let maxDate = moment().format("YYYY/MM/DD");
    let router = useRouter();
    let activarIndefinido = ref(false);
    let tipoGradoInsList = ref([]);
    let tipoProfesionList = ref([]);
    let tipoPermanenciaList = ref([]);
    let nacionalidadList = ref([]);
    let tipoDocumentoList = ref([]);
    let formError = ref({});
    let generoList = ref([]);
    let idPersonaData = ref();
    let idTramiteData = ref();
    let idDefinitivaData = ref();
    let sInicio = useInicioStore();
    
    idPersonaData.value = sInicio.getIDPersona;
    idTramiteData.value = sInicio.getIDTramite;
    idDefinitivaData.value = sInicio.getIDDefinitiva;

    let schemaForm = Yup.object().shape({
      cony_nombres: Yup.string().required(),
      cony_primer_apellido: Yup.string().required(),
      cony_genero: Yup.string().required(),
      cony_nacionalidad: Yup.string().required(),
      cony_grado_instruccion: Yup.string().required(),
      cony_profesion: Yup.string().required(),
      nro_hijos: Yup.string().required(),
      cony_direccion: Yup.string().required(),
      cony_tiempo_perm: Yup.string().required(),
      cony_tiempo_permanenciacony: Yup.string().required(),
    });

    let fetchTipoGradoInst = () =>
      api.get("/getGrado").then((response) => {
        tipoGradoInsList.value = response.data.content;
      });
    let fetchProfesionInst = () =>
      api.get("/getParametro/PAR_PROFESION").then((response) => {
        tipoProfesionList.value = response.data.content;
      });
    let fetchPermananciaInst = () =>
      api.get("/getParametro/PAR_TIEMPO").then((response) => {
        tipoPermanenciaList.value = response.data.content;
      });

    let fetchGenero = () =>
      api.get("/getParametro/").then((response) => {
        generoList.value = response.data.content;
      });

    let fetchNacionalidad = () =>
      api.get("/getNacionalidad").then((response) => {
        nacionalidadList.value = response.data.content;
      });
    let fetchTipoDocumento = () =>
      api.get("/getParametro/PAR_TIPO_DOCUMENTO").then((response) => {
        tipoDocumentoList.value = response.data.content;
      });

    let Continuar = async () => {
      let datosDC = {
        datosAdicionalesDConyugue: datosAdicionalesDConyugue.value,
        idDefinitivaData: idDefinitivaData.value,
        idPersonaData: idPersonaData.value,
        idTramiteData: idTramiteData.value,
      };
      try {
        await schemaForm.validate(datosAdicionalesDConyugue.value, {
          abortEarly: false,
        });
        // let result = await api.post('/datosAdicionalesDConyugue', datosAdicionalesDConyugue.value);
        let result = await api.post("/datosAdicionalesDConyugue", datosDC);
        // console.log("RESULT",result);
        if (result.status === 201 && result.data.code === 1) {
          router.push({ path: "/documentos" });
        }
      } catch (err) {
        formError.value = {};
        err.inner.forEach((error) => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message;
          }
        });
      }
    };

    let Regresar = () => {
      // router.push({ path: '/OtroIngreso' })
      console.log(
        "datosAdicionales.value.motivo_solicitud",
        datosAdicionales.value.tipo_ing_economico
      );
      if (datosAdicionales.value.tipo_ing_economico === "CON DEPENDENCIA") {
        router.push({ path: "/ConRelacion" });
      } else {
        if (datosAdicionales.value.tipo_ing_economico === "SIN DEPENDENCIA") {
          router.push({ path: "/SinRelacion" });
        } else {
          router.push({ path: "/OtroIngreso" });
        }
      }
    };

    let Cancelar = () => {
      Mensaje.Confirmar( "¿Confirma la cancelación del trámite?", () => {
        sInicio.reset();
        router.push({path: '/mistramites'});
      });
    }

    onMounted(fetchTipoGradoInst);
    onMounted(fetchProfesionInst);
    onMounted(fetchPermananciaInst);
    onMounted(fetchNacionalidad);

    onMounted(fetchGenero);
    onMounted(fetchTipoDocumento);
    onMounted(fetchNacionalidad);

    return {
      Regresar,
      Continuar,
      tipoActividadDesempenaList,
      datosAdicionalesDConyugue,
      generoList,
      tipoProfesionList,
      tipoGradoInsList,
      tipoDocumentoList,
      nacionalidadList,
      formError,
      maxDate,
      activarIndefinido,
      tipoPermanenciaList,
      Cancelar
    };
  },
};
</script>
