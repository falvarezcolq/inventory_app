<template>
  <div>
    <div class="busqueda">
      <div class="busqueda_seccion">
        <p class="title">DE TRABAJO LUCRATIVO SIN RELACION DE DEPEDENCIA</p>
        <div class="row">
          <div class="mt-2 col-sm-12 col-lg-6 col-md-6">
            <label form="">ACTIVIDAD QUE DESEMPEÑA O DESEMPEÑARA:</label>   
            <span class="lb-error" v-if="formError.actividad_desempena">Campo requerido</span>
            <input
              class="mt-2 form-control"
              type="text"
              v-model="datosAdicionalesSR.actividad_desempena"
              :class="{error: formError.actividad_desempena}"
              @input="datosAdicionalesSR.actividad_desempena = $event.target.value.toUpperCase()"
            />
          </div>
          <div class="mt-2 col-sm-12 col-lg-6 col-md-6">
            <label for>TIEMPO DE DURACIÓN ACTIVIDAD:</label>
            <span class="lb-error" v-if="formError.tiempo_actividad">Campo requerido</span>
            <div class="row">
              <div class="col-md-4 mt-2">
                <input
                  type="text"
                  class="form-control"
                  equired
                  autocomplete="off"
                  onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
                  v-model="datosAdicionalesSR.tiempo_actividad"
                  :class="{error: formError.tiempo_actividad}"
                />
              </div>
              <div class="col-sm-12 col-lg-8 col-md-8 mt-2">
                <select
                  class="form-control"
                  v-model="datosAdicionalesSR.tiempo_actividad_anios"
                  :class="{error: formError.tiempo_actividad_anios}"
                >
                  <option value="">SELECCIONAR</option>
                  <option
                    v-for="(item, index) in tipoPermanenciaList"
                    :key="index"
                    :value="item.nombre"
                  >{{ item.nombre }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
            <label for>DEPARTAMENTO:</label>
            <span class="lb-error" v-if="formError.departamento">Campo requerido</span>
            <select
              class="form-control"
              v-model="datosAdicionalesSR.departamento"
              :class="{error: formError.departamento}"
              @change="fetchProvinciaInst(datosAdicionalesSR.departamento)"
            >
              <option value="">SELECCIONAR</option>
              <option
                v-for="(item, index) in tipoDepartamentoList"
                :key="index"
                :value="item.cod_clasificador"
              >{{ item.nombre }}</option>
            </select>
          </div>
          <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
            <label for>PROVINCIA:</label>
            <select
              class="form-control"
              v-model="datosAdicionalesSR.provincia"
              @change="fetchLocalidadInst(datosAdicionalesSR.provincia)"
            >
              <option value="">SELECCIONAR</option>
              <option
                v-for="(item, index) in tipoProvinciaList"
                :key="index"
                :value="item.cod_clasificador"
              >{{ item.nombre }}</option>
            </select>
          </div>
          <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
            <label for>LOCALIDAD:</label>
            <select
              class="form-control"
              v-model="datosAdicionalesSR.localidad"
            >
              <option value="">SELECCIONAR</option>
              <option
                v-for="(item, index) in tipoLocalidadList"
                :key="index"
                :value="item.nombre"
              >{{ item.nombre }}</option>
            </select>
          </div>
          <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
            <label for>LUGAR O DIRECCIÓN:</label>
            <span class="lb-error" v-if="formError.lugar_direccion">Campo requerido</span>
            <input
              type="text"
              class="form-control"
              v-model="datosAdicionalesSR.lugar_direccion"
              :class="{error: formError.lugar_direccion}"
              @input="datosAdicionalesSR.lugar_direccion = $event.target.value.toUpperCase()"
            />
          </div>
          <div class="col-sm-12 col-lg-6 col-md-6 mt-3">
            <label for>ROE:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Registro Obligatorio de Empladores"
              v-model="datosAdicionalesSR.roe"
              @input="datosAdicionalesSR.roe = $event.target.value.toUpperCase()"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="busqueda mt-4">
      <div class="busqueda_seccion">
        <p class="title">DATOS DE INGRESO MENSUAL</p>
        <div class="row">        
          <div class="col-sm-12 col-lg-6 col-md-6">
            <label for>TIPO DE MONEDA:</label>
            <span class="lb-error" v-if="formError.sd_tipo_moneda">Campo requerido</span>
            <select 
              class="form-control"
              v-model="datosAdicionalesSR.sd_tipo_moneda"
              :class="{error: formError.sd_tipo_moneda}"
            >
              <option value="">SELECCIONAR</option>
              <option
                v-for="(item, index) in tipoMonedaList"
                :key="index"
                :value="item.nombre"
              >{{item.nombre}}</option>
            </select>
          </div>
          <div class="col-sm-12 col-lg-6 col-md-6">
            <label for>MONTO:</label>
            <span class="lb-error" v-if="formError.monto">Campo requerido</span>
            <input
              type="text"
              class="form-control"
              v-model="datosAdicionalesSR.monto"
              equired autocomplete="off" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
              :class="{error: formError.monto}"
              
            />
          </div>
        </div>
      </div>
    </div> 
    <div class="row mt-3">
      <div class="col-12 col-md-12 text-end">
        <button type="button" class="btn btn-secondary btn-sm"
          @click="Cancelar"
        >
          <i class="fa fa-close"></i> CANCELAR
        </button>&nbsp;
        <button type="button" class="btn btn-primary btn-sm" @click="Continuar()" v-if="!moduleSR">
          <i class="fa fa-save"></i>
          CONTINUAR
        </button>
      </div>
    </div> 
  
  </div>
</template>

<script>
import { ref, onMounted} from "vue";
import { useRouter } from "vue-router";

import api from "@/services/api";
import ProgressStep from "@/inicio/components/ProgressStep.vue";
import DatosTramite from "@/inicio/components/DatosTramite.vue";
import { useInicioStore } from "@/stores/useInicioStore";
import { useRegistroStore } from "@/stores/useRegistroStore";

import * as Yup from "yup";
import { Mensaje } from "@/tools/Mensaje";
import { ws } from "@/services/webservices";
export default {
  components: { ProgressStep, DatosTramite },
  setup() {
    let datosAdicionalesSR = ref({
      tiempo_actividad_anios: '',
      departamento: '',
      provincia: '',
      localidad: '',
      sd_tipo_moneda: '',
    });
    let tipoActividadDesempenaList = ref([])

    let router = useRouter();
    let ciudad = ref();
    let provincia = ref();

    let tipoGradoInsList = ref([]);
    let tipoProfesionList = ref([]);
    let tipoPermanenciaList = ref([]);
    let tipoDepartamentoList = ref([]);
    let tipoProvinciaList = ref([]);
    let tipoLocalidadList = ref([]);
    let tipoMonedaList = ref([]);
    let nacionalidadList = ref([]);
    let tipoDocumentoList = ref([]);
    let formError = ref({});
    let generoList = ref([]);
    let idPersonaData = ref();
    let idTramiteData = ref();
    let idDefinitivaData = ref();
    let sInicio = useInicioStore();
    let sRegistro = useRegistroStore();
    idPersonaData.value = sInicio.getIDPersona;
    idTramiteData.value = sInicio.getIDTramite;
    idDefinitivaData.value = sInicio.getIDDefinitiva;

    let schemaForm = Yup.object().shape({
      actividad_desempena: Yup.string().required(),
      departamento: Yup.string().required(),
      tiempo_actividad: Yup.string().required(),
      lugar_direccion: Yup.string().required(),
      monto: Yup.string().required(),
      sd_tipo_moneda: Yup.string().required(),
      tiempo_actividad_anios: Yup.string().required()
    });

    let fetchTipoGradoInst = () =>
      api.get("/getGrado").then(response => {
        tipoGradoInsList.value = response.data.contenido;
      });
    let fetchProfesionInst = () =>
      api.get("/getParametro/PAR_PROFESION").then(response => {
        tipoProfesionList.value = response.data.contenido;
      });
    let fetchPermananciaInst = () =>
      api.get("/getParametro/PAR_TIEMPO").then(response => {
        tipoPermanenciaList.value = response.data.contenido;
      });

    let fetchDepartamentoInst = () =>
      api.get("/getCiudad").then(response => {
        tipoDepartamentoList.value = response.data.contenido;
      });
    let fetchProvinciaInst = ciudad =>
      api.get(`/getProvincias/${ciudad}`).then(response => {
        tipoProvinciaList.value = response.data.contenido;
      });

    let fetchLocalidadInst = provincia =>
      api.get(`/getLocalidad/${provincia}`).then(response => {
        tipoLocalidadList.value = response.data.contenido;
      });

    let fetchMoneda = () =>
      api.get("/getParametro/PAR_MONEDA").then(response => {
        tipoMonedaList.value = response.data.contenido;
      });
    let fetchGenero = () =>
      api.get("/getParametro/PAR_GENERO").then(response => {
        generoList.value = response.data.contenido;
      });

    let fetchNacionalidad = () =>
      api.get("/getNacionalidad").then(response => {
        nacionalidadList.value = response.data.contenido;
      });
    let fetchTipoDocumento = () =>
      api.get("/getParametro/PAR_TIPO_DOCUMENTO").then(response => {
        tipoDocumentoList.value = response.data.contenido;
      });

    let validar = async () =>{
      try{      
        await schemaForm.validate(datosAdicionalesSR.value, {abortEarly: false});
        return true;
      } catch (err) {
          formError.value = {}
          err.inner.forEach((error) => {
          if(error.path && !formError[error.path]){
              formError.value[error.path] = error.message
          }
          })
          return false;
      }
    }

    let Continuar = async () => {

      if (await validar()){
        try{      
          // let datosSR = {
          //   datosAdicionalesSR: datosAdicionalesSR.value,
          //   idDefinitivaData: idDefinitivaData.value,
          // };
          // let result = await api.post("/proceso_inicio/datosAdicionalesSR", datosSR);     
          // if (result.status === 201 && result.data.codigo === 1) {
          //   let procesoInicio  = await ws.getProcesoInicio(idDefinitivaData.value)
              sInicio.addDatosAdicionalesSR(datosAdicionalesSR.value)
              // sInicio.reset()
              // sRegistro.reset();
              // sRegistro.addIDProceso(idDefinitivaData.value);
              // sRegistro.addIDTramite(idTramiteData.value);
              // sRegistro.addProcesoInicio(procesoInicio)
              router.push({ path: "/subirdocumentosP" });
          // }

        } catch (err) {
          console.log(err.message)
          Mensaje.error("Ocurrio un error intente nuevamente");
        }
      }
     
    };


    let moduleSR = ref(false)
    let cargarStore = ()=>{
          let datos_adicionalesSR = sInicio.getDatosAdicionalesSR;
          moduleSR.value = datos_adicionalesSR.module; 
          if(moduleSR.value){
            datosAdicionalesSR.value = datos_adicionalesSR.data;
          }
      }

    onMounted(fetchTipoGradoInst);
    onMounted(fetchProfesionInst);
    onMounted(fetchPermananciaInst);
    onMounted(fetchDepartamentoInst);
    onMounted(fetchNacionalidad);
    onMounted(fetchMoneda);
    onMounted(fetchGenero);
    onMounted(fetchTipoDocumento);

    onMounted(cargarStore)


   
    let retornar = ()=>{
        router.push({ path: '/datosadicionales' })
    }

    
    let siguiente = ()=>{
        router.push({ path: '/documentos' })
    }

    let Cancelar = () => {
      Mensaje.Confirmar( "¿Confirma la cancelación del trámite?", () => {
        sInicio.reset();
        router.push({path: '/mistramites'});
      })
    }

    return {
      moduleSR,
      retornar,
      siguiente,
      Continuar,
      tipoActividadDesempenaList,
      datosAdicionalesSR,
      tipoDepartamentoList,
      tipoProvinciaList,
      tipoPermanenciaList,
      tipoMonedaList,
      tipoLocalidadList,
      ciudad,
      provincia,
      fetchProvinciaInst,
      fetchLocalidadInst,
      generoList,
      tipoProfesionList,
      tipoGradoInsList,
      nacionalidadList,
      tipoDocumentoList,
      formError,
      Cancelar
    };
  }
};
</script>