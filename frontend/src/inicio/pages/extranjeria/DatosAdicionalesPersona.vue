<template>
  <div>
     <!-- <div class="col-lg-12 col-md-12 col-ms-12 mt-3">
        <FrmFotoInicio ref="fotoInicio" />
      </div> -->

    <div class="row" v-if="tramiteData">
      <div class="col-12">
        <TramiteDetalle :id_tramite="tramiteData.id_tramite"/>
      </div>
    </div>
    <div class="row" v-if="tramiteData && tramiteData != '' && tramiteData.clas1 != 'PASAPORTES'">
      <div class="col-lg-6 col-md-12 col-ms-12 mt-3"
        v-if="formulariosValidos.includes('C') || formulariosValidos.includes('CE')">
        <FrmDatosAdicionales
           v-if="formulariosValidos.includes('C') || formulariosValidos.includes('CE')"
          :isCoCe="formulariosValidos.includes('C') || formulariosValidos.includes('CE')"
          :datosAdicionales="datosAdicionales" :formError="formError"
          :validador="validador"
          :tramiteData="tramiteData"/>
      </div>

      <FrmDatosReferencia :datosAdicionales="datosAdicionales" :formError="formError"
        v-if="formulariosValidos.includes('RE')" :validador="validador" />

      <FrmDatosControlMigratorio :datosAdicionales="datosAdicionales" :formError="formError" :maxDate="maxDate"
        v-if="formulariosValidos.includes('F')" :validador="validador" />

      <FrmDatosDomicilioHospedaje :datosAdicionales="datosAdicionales" :formError="formError"
        v-if="formulariosValidos.includes('H')" :validador="validador" />

      <FrmDatosMotivo :idTramiteData="idTramiteData" :datosAdicionales="datosAdicionales" :formError="formError"
        v-if="formulariosValidos.includes('M')" :validador="validador" :nacionalidadList="nacionalidadList" />

      <FrmDatosSolicitud :idTramiteData="idTramiteData" :datosAdicionales="datosAdicionales" :formError="formError"
        v-if="formulariosValidos.includes('S')" :validador="validador" :params="params" />

      <FrmDatosColegioUniversidad :datosAdicionales="datosAdicionales" :formError="formError"
        v-if="formulariosValidos.includes('E') || idTramiteData == 301 || idTramiteData == 311 || idTramiteData == 262 || idTramiteData == 261 || idTramiteData == 54 || idTramiteData == 51 || idTramiteData == 17 || idTramiteData == 318"
        :validador="validador" />

      <FrmDatosRefugiados :idTramiteData="idTramiteData" :datosAdicionales="datosAdicionales" :formError="formError"
        v-if="formulariosValidos.includes('CO')" :validador="validador" />

      <FrmDatosOrdenJudicial :datosAdicionales="datosAdicionales" :formError="formError"
        v-if="formulariosValidos.includes('A')" :isLA="formulariosValidos.includes('LA')" :validador="validador"
        :maxDate="maxDate" />
      <FrmDatosMercosur :datosAdicionales="datosAdicionales" :formError="formError"
        v-if="formulariosValidos.includes('ME')" :validador="validador" />
      <FrmDatosCertificar0Legalizar :datosAdicionales="datosAdicionales" :formError="formError"
        v-if="formulariosValidos.includes('CL')" :validador="validador" :params="params" />

      <FrmDatosFechaVisa :datosAdicionales="datosAdicionales" :formError="formError"
        v-if="formulariosValidos.includes('T')" :validador="validador" />

      <FrmDatosEmpresaTripulante v-if="tramiteData && tramiteData.clas4 == 'TRIP'" :datosAdicionales="datosAdicionales"
        :formError="formError" :validador="validador" :params="params" />

      <FrmDatosPasoAutorizadoFrontera v-if="tramiteData && tramiteData.clas1 == 'TVF'" :datosAdicionales="datosAdicionales"
        :formError="formError" :validador="validador" :params="params" />
    </div>

    <div class="row mt-2">
      <div class="col-12 col-md-12 text-end">
        <button type="button" class="btn btn-secondary btn-sm" 
        @click="Cancelar"><i class="fa fa-close"></i>
          CANCELAR</button>&nbsp;
        <button type="button" class="btn btn-primary btn-sm" 
        @click="Continuar" >
          <i class="fa fa-save"></i>
          CONTINUAR
        </button>
      </div>
    </div>


    <Loading v-show="isLoading"/>
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
import Swal from 'sweetalert2'

import FrmDatosRepresentanteTutor from "@/inicio/components/FormularioDatosAdicionales/FrmDatosRepresentanteTutor.vue";
import FrmDatosAdicionales from "@/inicio/components/FormularioDatosAdicionales/FrmDatosAdicionales.vue";
import FrmDatosReferencia from "@/inicio/components/FormularioDatosAdicionales/FrmDatosReferencia.vue";
import FrmDatosControlMigratorio from "@/inicio/components/FormularioDatosAdicionales/FrmDatosControlMigratorio.vue";
import FrmDatosDomicilioHospedaje from "@/inicio/components/FormularioDatosAdicionales/FrmDatosDomicilioHospedaje.vue";
import FrmDatosSolicitud from "@/inicio/components/FormularioDatosAdicionales/FrmDatosSolicitud.vue";
import FrmDatosColegioUniversidad from "@/inicio/components/FormularioDatosAdicionales/FrmDatosColegioUniversidad.vue";
import FrmDatosRefugiados from "@/inicio/components/FormularioDatosAdicionales/FrmDatosRefugiados.vue";
import FrmDatosOrdenJudicial from "@/inicio/components/FormularioDatosAdicionales/FrmDatosOrdenJudicial.vue";

import FrmDatosDocumento from "@/inicio/components/FormularioDatosAdicionales/FrmDatosDocumento.vue";
import FrmDatosMercosur from "@/inicio/components/FormularioDatosAdicionales/FrmDatosMercosur.vue";
import FrmDatosCertificar0Legalizar from "@/inicio/components/FormularioDatosAdicionales/FrmDatosCertificar0Legalizar.vue";
import FrmDatosFechaVisa from "@/inicio/components/FormularioDatosAdicionales/FrmDatosFechaVisa.vue";
import FrmDatosMotivo from "@/inicio/components/FormularioDatosAdicionales/FrmDatosMotivo.vue";
import { useHistorialProcesoStore } from '@/stores/useHistorialProcesoStore';
import FrmDatosEmpresaTripulante from "@/inicio/components/FormularioDatosAdicionales/FrmDatosEmpresaTripulante.vue";
import FrmDatosPasoAutorizadoFrontera from "@/inicio/components/FormularioDatosAdicionales/FrmDatosPasoAutorizadoFrontera.vue";
import FrmFotoInicio from "@/inicio/components/FormularioDatosAdicionales/FrmFotoInicio.vue";
import { Mensaje } from "@/tools/Mensaje";
import FrmEditableTable from "@/inicio/components/FormularioDatosAdicionales/FrmEditableTable.vue";
import { useWebServiceStore } from '@/stores/useWebServiceStore';
import TramiteDetalle from "@/inicio/components/TramiteDetalle.vue";
import { ws } from "@/services/webservices";
import Loading from "@/components/Loading.vue";
export default {
  components: {
    ProgressStep,
    DatosTramite,
    FrmDatosRepresentanteTutor,
    FrmDatosAdicionales,
    FrmDatosReferencia,
    FrmDatosControlMigratorio,
    FrmDatosDomicilioHospedaje,
    FrmDatosSolicitud,
    FrmDatosColegioUniversidad,
    FrmDatosRefugiados,
    FrmDatosOrdenJudicial,
    FrmDatosDocumento,
    FrmDatosMercosur,
    FrmDatosCertificar0Legalizar,
    FrmDatosFechaVisa,
    FrmDatosMotivo,
    FrmDatosEmpresaTripulante,
    FrmDatosPasoAutorizadoFrontera,
    FrmFotoInicio,
    FrmEditableTable,
    TramiteDetalle,
    Loading
  },
  setup() {
    let datosAdicionalesDConyugue = ref(null);
    let maxDate = moment().format('YYYY-MM-DD');
    let minDate = moment().format('YYYY-MM-DD');
    let router = useRouter();
    let sInicio = useInicioStore();

    let ciudad = ref();
    let provincia = ref();
    let nacionalidadList = ref([]);
    let tipoDocumentoList = ref([]);
    let tipoProfesionList = ref([]);
    let tipoPermanenciaList = ref([]);
    let picked = ref(true);
    let datosAdicionales = ref({
      nro_documento: '',
      estado_civil: '',
      grado_instruccion: '',
      profesion: '',
      tiempo_permanencia: '',
      nacionalidad_emision: '',
      relacion_tutor: '',
      nacionalidad_tutor: '',
      tipo_doc_tutor: '',
      tipo_referencia: '',
      punto_control: '',
      departamento: '',
      provincia: '',
      localidad: '',
      tipo_hospedaje: '',
      motivo_solicitud: '',
      tipo_ing_economico: '',
    });
    
    let formError = ref({});
    let estado = ref(true);
    let fecha_expiracion_modificada = ref();
    let modificadoFecha = ref();
    let idPersonaData = ref();
    let idTramiteData = ref();

    let tramiteData = ref(null);
    let formulariosValidos = ref([]);
    let validador = ref({});
    let persona = ref({});
    let tramite = ref({});
    
    
    idTramiteData.value = sInicio.getIDTramite;
    tramite.value = sInicio.getTramite;
    let id_proceso = sInicio.getIDProcesoInicio;

    let sWebServiceStore = useWebServiceStore();
    let usuario = sWebServiceStore.getUsuario;
    tramiteData.value=sInicio.getTramiteData;
    let isLoading = ref(false);
    let params = ref();

    let fotoInicio = ref(null);
    let fotoAnterior = ref(null);


    let definitivaStore = () => {
      // let datos = sInicio.getDatosAdicionales
      if ( sInicio.getDatosAdicionales.module) {
        fotoAnterior.value = sInicio.getFotoInicio;
        datosAdicionales.value = sInicio.getDatosAdicionales.data;
      }
    }

    let formatDate = (fecha) => {
      return moment(fecha).format("YYYY-MM-DD");
    };

    let fetchNacionalidad = () =>
      api.get("/getNacionalidad").then(response => {
        nacionalidadList.value = response.data.contenido;
      });

    let fetchTipoDocumento = () =>
      api.get("/getParametro/PAR_TIPO_DOCUMENTO").then(response => {
        tipoDocumentoList.value = response.data.contenido;
      });

    let fetchProfesionInst = () =>
      api.get("/getProfesion").then(response => {
        tipoProfesionList.value = response.data.contenido;
      });

    let fetchPermanenciaInst = () =>
      api.get("/getTiempoPermanencia").then(response => {
        tipoPermanenciaList.value = response.data.contenido;
      });


    let fetchTramiteData = ()=>{
      tramiteData.value=sInicio.getTramiteData;
      if (tramiteData.value != '' && tramiteData.value) {
          formulariosValidos.value = tramiteData.value.fdj.split(',');
        }
    }

    let Continuar = async () => {
      try {
        datosAdicionales.value.formularios = formulariosValidos.value.join(',');
        datosAdicionales.value.cert_tramite = datosAdicionales.value.id_tramite ? datosAdicionales.value.id_tramite : null;
        // elimina los espacios antes y despues del texto de cada campo
        formError.value = {};
        Object.keys(datosAdicionales.value).forEach(key => {
          if ((typeof datosAdicionales.value[key]) == 'string') {
            datosAdicionales.value[key] = datosAdicionales.value[key].trim();
          }
        })
        let schemaForm = Yup.object().shape(validador.value);
        await schemaForm.validate(datosAdicionales.value, { abortEarly: false });
        if (datosAdicionales.value.estado_civil &&
          datosAdicionales.value.estado_civil === 'CASADO(A)' &&
          sInicio.getDatosAdicionalesDConyugue.module == false
        ) {
          Mensaje.warning("¡Debe registrar los datos del conyugue!");
          return;
        }
        Mensaje.Confirmar('¡Confirmar registro de datos adicionales!<br/> Esta acción es irreversible.', Guardar)

      } catch (err) {
        console.log(err.message)
        formError.value = {};
        err.inner.forEach(error => {
          if (error.path && !formError[error.path]) {
            formError.value[error.path] = error.message;
            console.log(error.path, error.message)
          }
        });
      }
    };

    let Guardar = async () => {
      try {
        // let datos = {
        //   datosAdicionales: datosAdicionales.value,
        //   datosAdicionalesDConyugue : sInicio.getDatosAdicionalesDConyugue.module ? sInicio.getDatosAdicionalesDConyugue.data:null,
        //   idTramiteData: idTramiteData.value,
        //   id_proceso_inicio: id_proceso,
        // };
        // isLoading.value = true;
        // let result = await api.post("/proceso_inicio", datos);
        // if (result.status === 201 && result.data.codigo === 1) {
        //   id_proceso = Number(result.data.contenido.id_proceso_inicio);

        sInicio.addDatosAdicionales(datosAdicionales.value)
        await guardarRequisitos();
        if (datosAdicionales.value.tipo_ing_economico === "CON DEPENDENCIA") {
            router.push({ path: "/ConRelacion" });
          } else if (datosAdicionales.value.tipo_ing_economico === "SIN DEPENDENCIA") {
            router.push({ path: "/SinRelacion" });
          } else if (datosAdicionales.value.tipo_ing_economico === "OTRO INGRESO") {
            router.push({ path: "/OtroIngreso" });
          } else {
            router.push({ path: "/subirdocumentosP" });
          }
       


      } catch (error) {
        Mensaje.error("¡Ocurrio un error, Reporte el problema a Sistemas!");
      }
    }


    let guardarRequisitos = async () => {
      try {
         if (id_proceso != 0 && id_proceso ) {
          let data = {
            requisitos: sInicio.getRequisitos.data,
            id_proceso_inicio: sInicio.getIDProcesoInicio,
          }
          let result = await api.post('/proceso_inicio/requisitos', data);
        }
      } catch (err) {
        Mensaje.error("No se registro correctamente. Informar el problema a Sistemas! guardarRequisitos")
      }
    }


    let retornar = () => {
      router.push({ path: "/requisitos" });
    };
    let Cancelar = () => {
      Mensaje.Confirmar( "¿Confirma la cancelación del trámite?", () => {
        sInicio.reset();
        router.push({path: '/mistramites'});
      });
    }

    let siguiente = () => {
      if (sInicio.getDatosAdicionalesCR.module) {
        router.push({ path: "/ConRelacion" });
      } else if (sInicio.getDatosAdicionalesSR.module) {
        router.push({ path: "/SinRelacion" });
      } else if (sInicio.getDatosAdicionalesOtroIng.module) {
        router.push({ path: "/OtroIngreso" });
      } else {
        router.push({ path: "/documentos" });
      }
    }

    onMounted(async()=>{
      if(!tramiteData.value){
        router.push({path:'/tramites'})
      } else {
       params.value =  {
          grupo: usuario?.id_nacionalidad,
          cert: "%",
          Hmenor: (usuario?.edad <= 17 ? "S" : "N"),
          mLugarEmi: "",
          clas1: tramite.value.data.cod_tipo_tramite,
          clas2: tramite.value.data.cod_tiempo,
          clas3: tramite.value.data.cod_motivo,
        }
      }
    })

    onMounted(fetchProfesionInst);
    onMounted(fetchPermanenciaInst);
    onMounted(fetchNacionalidad);
    onMounted(fetchTipoDocumento);
    onMounted(fetchTramiteData);
    onMounted(definitivaStore);
   

    return {

      retornar,
      siguiente,
      Cancelar,
      datosAdicionales,
      tipoProfesionList,
      nacionalidadList,
      tipoDocumentoList,
      tipoPermanenciaList,
      Continuar,

      picked,
      formError,
      ciudad,
      provincia,
      idTramiteData,
      idPersonaData,
      fecha_expiracion_modificada,
      modificadoFecha,
      estado,
      datosAdicionalesDConyugue,
      maxDate,
      minDate,
      tramiteData,
      formulariosValidos,
      validador,
      persona,
      params,
      formatDate,
      fotoInicio,
      fotoAnterior,
      
      isLoading,
    };
  }
};
</script>